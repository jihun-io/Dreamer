import React, { forwardRef, useEffect, useLayoutEffect, useRef } from "react";
import styles from "./MoodModal.module.css";
import { DREAM_MOODS } from "@/utils/constants";

const MoodModal = forwardRef(
  (
    {
      isModalOpen,
      closeModal,
      onConfirm,
      selectedMoods,
      setSelectedMoods,
      style,
    },
    moodModalRef
  ) => {
    const dialogRef = useRef(null);
    useLayoutEffect(() => {
      if (isModalOpen && dialogRef.current) {
        dialogRef.current.showModal();
      } else if (dialogRef.current) {
        dialogRef.current.close();
      }
    }, [isModalOpen]);

    const handleBackgroundClick = (e) => {
      if (e.target === e.currentTarget) {
        onConfirm(selectedMoods);
        closeModal();
      }
    };

    const maxSelect = 5;

    const handleCheckboxChange = (item) => {
      const isSelected = selectedMoods.some((mood) => mood.id === item.id);

      if (isSelected) {
        setSelectedMoods((prev) => prev.filter((mood) => mood.id !== item.id));
      } else {
        if (selectedMoods.length < maxSelect) {
          setSelectedMoods((prev) => [...prev, item]);
        }
      }
    };

    const handleConfirm = () => {
      onConfirm(selectedMoods);
      closeModal();
    };

    return (
      <dialog
        style={style}
        ref={(node) => {
          dialogRef.current = node;
          if (moodModalRef) {
            moodModalRef.current = node;
          }
        }}
        onClick={handleBackgroundClick}
        className={styles["modal-on-writepost"]}
      >
        <div
          className={styles["modal-contents"]}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setSelectedMoods([])}
            className={styles["btn-reset-select"]}
          >
            다시 선택하기
          </button>
          <form className={styles["hashtag-picker-container"]}>
            <ul>
              {DREAM_MOODS.map((item) => (
                <li key={item.id}>
                  <input
                    type="checkbox"
                    checked={selectedMoods.some((mood) => mood.id === item.id)}
                    onChange={() => handleCheckboxChange(item)}
                    className={styles["hashtag-picker"]}
                    id={item.id}
                  />
                  <label htmlFor={item.id}>{item.text}</label>
                </li>
              ))}
            </ul>
          </form>
          <p className={styles["sub-text-container"]}>
            <span className={styles["sub-text"]}>(최대 5개 선택 가능)</span>
            <button onClick={handleConfirm}>확인</button>
          </p>
        </div>
      </dialog>
    );
  }
);

MoodModal.displayName = "MoodModal";

export default MoodModal;
