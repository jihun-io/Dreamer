"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./WideHeader.module.css";
import Link from "next/link";
import { HeaderBaseModal } from "./HeaderModal";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { closeModal } from "@/store/modalSlice";
import { outsideClickModalClose } from "@/utils/outsideClickModalClose";
import { calculateModalPosition } from "@/utils/calculateModalPosition";
import useTheme from "@/hooks/styling/useTheme";

export default function WideHeader({
  onMoreBtnClick,
  buttonRef,
  isActive,
  handleActiveBtn,
}) {
  const { isOpen } = useSelector((state) => state.modal);
  const { user } = useSelector((state) => state.auth);
  const { userId, userName, profileImageUrl } = user;
  const [modalStyle, setModalStyle] = useState({});
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  const { theme, changeTheme } = useTheme();

  const navItems = [
    { label: "홈", className: "home-btn", href: "/" },
    { label: "검색", className: "search-btn", href: "/search" },
    { label: "알람", className: "alarm-btn", href: "/alarm" },
  ];

  useEffect(() => {
    if (modalRef.current && buttonRef.current) {
      const updatePosition = () => {
        const position = calculateModalPosition(buttonRef, -80, -600);
        if (position) {
          setModalStyle(position);
        }
      };

      updatePosition(); // Initial position update
      window.addEventListener("resize", updatePosition);

      const cleanup = outsideClickModalClose(modalRef, buttonRef, () => {
        dispatch(closeModal());
      });
      return () => {
        window.removeEventListener("resize", updatePosition);
        cleanup();
      };
    }
  }, [dispatch, modalRef, buttonRef, isOpen]);

  const handleModeToggle = () => {
    const modeToggleBtn = document.querySelector(
      `.${styles["mode-toggle-btn"]}`
    );

    if (modeToggleBtn.classList.contains(styles["light-mode"])) {
      modeToggleBtn.classList.remove(styles["light-mode"]);
      modeToggleBtn.classList.add(styles["dark-mode"]);
    } else if (modeToggleBtn.classList.contains(styles["dark-mode"])) {
      modeToggleBtn.classList.remove(styles["dark-mode"]);
      modeToggleBtn.classList.add(styles["light-mode"]);
    }
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>
        <Link href="/">
          <Image
            src="/images/logo-full.svg"
            alt="DREAMER"
            width={252}
            height={105}
          />
        </Link>
      </h1>
      <button
        className={`${styles["mode-toggle-btn"]} ${styles["light-mode"]} ${theme === "device" ? styles["hidden-btn"] : ""}`}
        onClick={handleModeToggle}
      >
        <div className={`${styles["toggle-switch"]}`}></div>
      </button>
      <div className={styles["header-btn-container"]}>
        <nav>
          <ul className={styles.nav}>
            {navItems.map((item) => (
              <li key={item.label} className={styles["nav-items"]}>
                <Link
                  href={item.href}
                  className={`${styles["nav-item"]} ${styles[`${item.className}`]} ${
                    isActive === item.label ? styles.active : ""
                  }`}
                  onClick={() => handleActiveBtn(item.label)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className={styles["nav-items"]}>
              <button
                className={`${styles["nav-item"]} ${styles["writing-btn"]} ${
                  isActive === "글쓰기" ? styles.active : ""
                }`}
                onClick={() => handleActiveBtn("글쓰기")}
              >
                글쓰기
              </button>
            </li>
          </ul>
        </nav>
        <Link
          href={`/${userId}`}
          className={`${styles["nav-item"]} ${styles["profile-btn"]} ${isActive === "프로필" ? styles.active : ""}`}
          onClick={() => handleActiveBtn("프로필")}
        >
          <img
            src={profileImageUrl ? profileImageUrl : "/images/rabbit.svg"}
            alt="프로필사진"
            loading="lazy"
            width={40}
            height={40}
          />
          <p>{userName}</p>
        </Link>
        <button
          className={`${styles["nav-item"]} ${styles["more-btn"]} ${isOpen ? styles.active : ""}`}
          ref={buttonRef}
          onClick={onMoreBtnClick}
        >
          더보기
        </button>
        {isOpen && <HeaderBaseModal ref={modalRef} style={modalStyle} />}
      </div>
    </header>
  );
}
