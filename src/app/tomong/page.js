"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/Controls";
import styles from "./Tomong.module.css";
import markdownStyles from "./Result.module.css";
import { fetchWithAuth } from "@/utils/auth/tokenUtils";
import { useSelector } from "react-redux";
import Loading from "@/components/Loading";
import { DREAM_MOODS, DREAM_GENRES } from "@/utils/constants";
import { auth } from "@/lib/firebase";
import convertToHtml from "@/utils/markdownToHtml";

function TomongIntro({ setProcess }) {
  return (
    <>
      <h2 className={styles["title"]}>인공지능 토몽이 들려주는 꿈 해몽</h2>
      <p className={styles["tomong-body"]}>
        반가워요, 토몽이에요! <br />
        앨런 AI와 함께 여러분의 꿈을 해몽해보세요!
      </p>
      <div className={styles["btn-row"]}>
        <Button onClick={() => history.back()}>뒤로 가기</Button>
        <Button highlight={true} onClick={() => setProcess(1)}>
          시작하기
        </Button>
      </div>
    </>
  );
}

function TomongSelect({ setProcess, setSelectedDream }) {
  const [dreams, setDreams] = useState([]);
  const [selectedDream, setSelectedDreamState] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { userId } = useSelector((state) => state.auth.user);

  useEffect(() => {
    const getDreams = async () => {
      const res = await fetchWithAuth(`/api/post/read/${userId}`);

      let data = null;
      if (res.ok) {
        data = await res.json();
        setDreams(data.posts);
      }

      setIsLoading(false);
    };

    getDreams();
  }, []);

  const handleRadioChange = (dream) => {
    setSelectedDreamState(dream);
    setSelectedDream(dream);
  };

  return (
    <>
      <h2 className={styles["title"]}>꿈 해몽을 시작해볼까요?</h2>
      <div className={styles["tomong-body"]}>
        {isLoading ? (
          <Loading type="small" />
        ) : (
          <ul className={styles["dreams-list"]}>
            {dreams.map((dream) => (
              <li key={dream.id}>
                <label>
                  <input
                    type="radio"
                    name="dream"
                    value={dream.id}
                    checked={selectedDream?.id === dream.id}
                    onChange={() => handleRadioChange(dream)}
                    tabIndex={0}
                  />
                  <p>{dream.title}</p>
                  <p>{new Date(dream.createdAt).toLocaleString("ko-KR")}</p>
                  <p>{dream.content}</p>
                  {dream.dreamGenres.length > 0 && (
                    <ul className={styles["post-tag"]}>
                      {dream.dreamGenres.map((tag, index) => (
                        <li
                          key={index}
                          style={{
                            backgroundColor: `${DREAM_GENRES.find((genre) => genre.id === tag).color.hex}`,
                            color:
                              `${DREAM_GENRES.find((genre) => genre.id === tag).color.textColor}` &&
                              `${DREAM_GENRES.find((genre) => genre.id === tag).color.textColor}`,
                          }}
                        >
                          {`${DREAM_GENRES.find((genre) => genre.id === tag).text}`}
                        </li>
                      ))}
                    </ul>
                  )}
                  {dream.dreamMoods.length > 0 && (
                    <span className={styles["dream-felt"]}>
                      {`(${dream.dreamMoods.map((mood1) => `${DREAM_MOODS.find((mood) => mood.id === mood1).text}`).join(", ")})`}
                    </span>
                  )}
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className={styles["btn-row"]}>
        <Button onClick={() => setProcess(0)}>뒤로 가기</Button>
        <Button highlight={true} onClick={() => setProcess(2)}>
          다음
        </Button>
      </div>
    </>
  );
}

function TomongResult({ setProcess, selectedDream }) {
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState("");
  const eventSourceRef = useRef(null);
  const retryCountRef = useRef(0);
  const isComponentMounted = useRef(true);

  useEffect(() => {
    // 컴포넌트 마운트 상태 추적
    isComponentMounted.current = true;

    const setupEventSource = async () => {
      // 이미 연결이 있다면 무시
      if (eventSourceRef.current) {
        return;
      }

      try {
        const idToken = auth.currentUser
          ? await auth.currentUser.getIdToken(true)
          : null;
        if (!idToken || !isComponentMounted.current) {
          return;
        }

        const tokenResponse = await fetch("/api/tomong/streaming-token", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });

        if (!tokenResponse.ok || !isComponentMounted.current) {
          return;
        }

        const { streamToken } = await tokenResponse.json();

        const params = new URLSearchParams({
          streamToken,
          title: selectedDream.title || "",
          content: selectedDream.content || "",
          genre: selectedDream.dreamGenres || "",
          mood: selectedDream.dreamMoods || "",
          rating: selectedDream.dreamRating || "",
        });

        // 새로운 EventSource 생성 전에 이전 연결 정리
        if (eventSourceRef.current) {
          eventSourceRef.current.close();
          eventSourceRef.current = null;
        }

        if (!isComponentMounted.current) return;

        eventSourceRef.current = new EventSource(
          `/api/tomong?${params.toString()}`
        );

        eventSourceRef.current.onmessage = (event) => {
          if (!isComponentMounted.current) return;

          try {
            const data = event.data;

            // 'complete' 메시지인 경우
            const completeMatch = data.match(
              /'type':\s*'complete'.*?'content':\s*'(.*?)'\}\}/s
            );
            if (completeMatch) {
              setResult(completeMatch[1]);
              // complete 메시지를 받았으면 연결을 깔끔하게 종료
              eventSourceRef.current?.close();
              return;
            }

            // 'continue' 메시지인 경우
            const continueMatch = data.match(
              /'type':\s*'continue'.*?'content':\s*'(.*?)'\}\}/s
            );
            if (continueMatch) {
              setResult((prev) => prev + continueMatch[1]);
            }
          } catch (error) {
            console.error("Error processing message:", error);
          }
        };

        eventSourceRef.current.onerror = (error) => {
          // complete 후의 정상적인 연결 종료는 무시
          if (eventSourceRef.current?.readyState === 2) {
            return;
          }

          // 실제 에러인 경우만 처리
          console.error("EventSource error:", error);
          eventSourceRef.current?.close();
          setIsLoading(false);
        };

        eventSourceRef.current.onopen = () => {
          if (!isComponentMounted.current) return;
          setIsLoading(false);
          retryCountRef.current = 0;
        };
      } catch (error) {
        console.error("Error setting up EventSource:", error);
        if (isComponentMounted.current) {
          setIsLoading(false);
        }
      }
    };

    setupEventSource();

    // cleanup 함수
    return () => {
      isComponentMounted.current = false;
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
    };
  }, [selectedDream]);

  console.log(convertToHtml("###Test"));

  return (
    <>
      <h2 className={styles["title"]}>꿈을 해몽해드릴게요!</h2>
      {isLoading ? (
        <Loading type="small" />
      ) : (
        <div
          className={markdownStyles["markdown"]}
          dangerouslySetInnerHTML={{ __html: convertToHtml(result) }}
        />
      )}
      <div className={styles["btn-row"]}>
        <Button onClick={() => setProcess(1)}>뒤로 가기</Button>
        <Button highlight={true}>공유하기</Button>
        <Button highlight={true} onClick={() => setProcess(3)}>
          다음
        </Button>
      </div>
    </>
  );
}

export default function Tomong() {
  const [process, setProcess] = useState(0);
  const [selectedDream, setSelectedDream] = useState(null);

  return (
    <div className={styles["container"]}>
      <main className={styles["main"]}>
        {process === 0 && <TomongIntro setProcess={setProcess} />}
        {process === 1 && (
          <TomongSelect
            setProcess={setProcess}
            setSelectedDream={setSelectedDream}
          />
        )}
        {process === 2 && (
          <TomongResult setProcess={setProcess} selectedDream={selectedDream} />
        )}
      </main>
    </div>
  );
}
