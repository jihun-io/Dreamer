import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { fetchWithAuth } from "@/utils/auth/tokenUtils";

export default function Post({ styles, post: initialPosts }) {
  const [post, setPost] = useState(initialPosts);

  const changeSpark = () => {
    setPost((prevPost) => ({
      ...prevPost,
      hasUserSparked: !prevPost.hasUserSparked,
      sparkCount: prevPost.hasUserSparked
        ? prevPost.sparkCount - 1
        : prevPost.sparkCount + 1,
    }));
  };

  const sparkHandle = async (postId) => {
    changeSpark(postId); // 반짝 토글 시 UI 변경

    try {
      const res = await fetchWithAuth(`/api/post/spark/${postId}`);
      if (!res.ok || res.status !== 200) {
        throw new Error("반짝 실패");
      }
    } catch (error) {
      console.error("Error sparking post:", error);
      changeSpark(postId); // 반짝 실패 시 원래 상태로 복구
    }
  };

  return (
    <article className={styles["main-post-wrap"]}>
      <section className={styles["post-user-info"]}>
        <Link href={`/${post.authorId}`}>
          <img
            src={post.profileImageUrl}
            alt={`${post.authorName}님의 프로필 사진`}
            width={49}
            height={49}
          />
          <span className={styles["user-name"]}>{post.authorName}</span>
          <span className={styles["user-id"]}>@{post.authorId}</span>
        </Link>
        <time className={styles["posting-time"]}>2시간 전</time>
        <button>
          <Image
            src="/images/more.svg"
            alt="더보기"
            width={40}
            height={40}
            className={styles["more-btn"]}
          />
        </button>
      </section>
      <section className={styles["post-content"]}>
        <p className={styles["post-text"]}>{post.content}</p>
        {post.imageUrls && (
          <div className={styles["post-img-wrap"]}>
            {post.imageUrls.map((url, index) => (
              <img
                key={index}
                className={styles["post-img"]}
                src={url}
                alt={`게시글 이미지 ${index}`}
              />
            ))}
          </div>
        )}
      </section>
      <section className={styles["post-btn-content"]}>
        <button onClick={() => sparkHandle(post.objectID)}>
          {post.hasUserSparked ? (
            <>
              {" "}
              <span className="sr-only">반짝 해제하기</span>
              <Image
                src="/images/star-fill.svg"
                alt=""
                width={40}
                height={40}
              />
              <span className={styles["btn-label"]}>
                {post.sparkCount} 반짝
              </span>
            </>
          ) : (
            <>
              <span className="sr-only">반짝 누르기</span>
              <Image src="/images/star.svg" alt="" width={40} height={40} />
              <span className={styles["btn-label"]}>
                {post.sparkCount} 반짝
              </span>
            </>
          )}
        </button>
        <button>
          <span className="sr-only">댓글 작성하기</span>
          <Image
            className={styles["icon-padding"]}
            src="/images/message.svg"
            alt=""
            width={40}
            height={40}
          />
          <span className={styles["btn-label"]}>{post.commentsCount} 댓글</span>
        </button>
        <button>
          <Image
            className={styles["icon-padding"]}
            src="/images/share.svg"
            alt="공유하기"
            width={40}
            height={40}
          />
        </button>
        <button className={styles["mark-btn"]}>
          <Image
            className={styles["icon-padding"]}
            src="/images/mark.svg"
            alt="스크랩"
            width={40}
            height={40}
          />
        </button>
      </section>
    </article>
  );
}