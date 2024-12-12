"use client";

import { useState, useEffect, useRef, useCallback, createRef } from "react";
import styles from "./Controls.module.css";

export function Button({
  highlight,
  children,
  type,
  onClick,
  float,
  className,
  disabled,
}) {
  let buttonClass;

  buttonClass = highlight
    ? `${styles["button-highlight"]} ${styles["button"]}`
    : styles["button"];

  if (float === "left-bottom") {
    buttonClass = `${buttonClass} ${styles["button-left-bottom"]}`;
  }

  buttonClass = className ? `${buttonClass} ${className}` : buttonClass;

  return (
    <button
      type={type}
      disabled={disabled}
      className={buttonClass}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function ButtonLabel({ highlight, children, htmlFor }) {
  const buttonClass = highlight
    ? `${styles["button-highlight"]} ${styles["button"]}`
    : styles["button"];

  return (
    <label htmlFor={htmlFor} className={buttonClass}>
      {children}
    </label>
  );
}

export function ButtonLink({ highlight, children, href }) {
  const buttonClass = highlight
    ? `${styles["button-highlight"]} ${styles["button"]}`
    : styles["button"];

  return (
    <a href={href} className={buttonClass}>
      {children}
    </a>
  );
}

export function Input({ type, value, onChange, background, disabled }) {
  let inputClass = styles["input"];
  if (type === "text" || type === "password" || type === "email") {
    inputClass = styles["input-text"];
  }

  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      className={inputClass}
      disabled={disabled}
      style={background === "white" ? { backgroundColor: "white" } : {}}
    />
  );
}

export function Textarea({ value, maxLength, onChange, background }) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      maxLength={maxLength}
      className={styles["textarea"]}
      style={background === "white" ? { backgroundColor: "white" } : {}}
    />
  );
}

export function Select({
  id,
  name,
  onChange,
  value,
  required,
  background = "default",
  label,
  options = [],
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(value);
  const selectRef = useRef(null);
  const listboxRef = useRef(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const optionRefs = useRef([]);

  // 옵션 요소들의 ref 배열 초기화
  useEffect(() => {
    optionRefs.current = Array(options.length)
      .fill()
      .map((_, i) => optionRefs.current[i] || createRef());
  }, [options.length]);

  // focusedIndex가 변경될 때마다 해당 요소에 포커스
  useEffect(() => {
    if (
      isOpen &&
      focusedIndex >= 0 &&
      optionRefs.current[focusedIndex]?.current
    ) {
      optionRefs.current[focusedIndex].current.focus();
    }
  }, [focusedIndex, isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
        // 외부 클릭 시 select 버튼으로 포커스 이동
        selectRef.current.querySelector("button").focus();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e) => {
    switch (e.key) {
      case "Escape":
        setIsOpen(false);
        selectRef.current.querySelector("button").focus();
        break;
      case "ArrowDown":
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(0);
        } else {
          setFocusedIndex((prev) =>
            prev < options.length - 1 ? prev + 1 : prev
          );
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        setFocusedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (isOpen && focusedIndex !== -1) {
          handleSelect(options[focusedIndex]);
          selectRef.current.querySelector("button").focus();
        } else {
          setIsOpen((prev) => !prev);
          if (!isOpen) {
            setFocusedIndex(0);
          }
        }
        break;
      case "Tab":
        if (isOpen) {
          setIsOpen(false);
        }
        break;
      default:
        break;
    }
  };

  const handleSelect = (option) => {
    setSelectedOption(option.value);
    onChange?.({ target: { name, value: option.value } });
    setIsOpen(false);
  };

  const handleOptionClick = (option, e) => {
    e.preventDefault();
    e.stopPropagation();
    handleSelect(option);
    setIsOpen(false);
    selectRef.current.querySelector("button").focus();
  };

  const toggleSelect = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen((prev) => !prev);
    if (!isOpen) {
      // 드롭다운이 열릴 때 첫 번째 옵션에 포커스
      setFocusedIndex(0);
    }
  };

  const selectedLabel =
    options.find((opt) => opt.value === selectedOption)?.label ||
    "Select option";

  return (
    <div
      className={styles.selectContainer}
      ref={selectRef}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        className={styles.selectButton}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby={label ? `${id}-label` : undefined}
        id={id}
        onClick={toggleSelect}
        onKeyDown={handleKeyDown}
        style={background === "white" ? { backgroundColor: "white" } : {}}
      >
        {selectedLabel}
      </button>

      {label && (
        <label id={`${id}-label`} className={styles.label}>
          {label}
        </label>
      )}

      {isOpen && (
        <ul
          ref={listboxRef}
          role="listbox"
          aria-labelledby={`${id}-label`}
          className={styles.optionsList}
          tabIndex={-1}
          style={background === "white" ? { backgroundColor: "white" } : {}}
        >
          {options.map((option, index) => (
            <li
              key={option.value}
              ref={optionRefs.current[index]}
              role="option"
              aria-selected={selectedOption === option.value}
              className={`${styles.option} ${focusedIndex === index ? styles.focused : ""}`}
              onClick={(e) => handleOptionClick(option, e)}
              onMouseEnter={() => setFocusedIndex(index)}
              tabIndex={0}
              onKeyDown={handleKeyDown}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}

      <select
        name={name}
        value={selectedOption}
        required={required}
        style={{ display: "none" }}
        onChange={() => {}}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function Checkbox({ type, background, value, onChange, children }) {
  if (type === "col") {
    return (
      <label className={styles["checkbox-col"]}>
        <input
          type="checkbox"
          value={value}
          onChange={onChange}
          className={styles["checkbox"]}
          style={background === "white" ? { backgroundColor: "white" } : {}}
        />
        {children}
      </label>
    );
  } else {
    return (
      <input
        type="checkbox"
        value={value}
        onChange={onChange}
        className={styles["checkbox"]}
        style={bg === "white" ? { backgroundColor: "white" } : {}}
      />
    );
  }
}

export function LoginForm({ onSubmit, className, children }) {
  let formClass = styles["login-form"];
  if (className) {
    formClass = `${formClass} ${className}`;
  }
  return (
    <form onSubmit={onSubmit} className={formClass}>
      {children}
    </form>
  );
}

export const CustomScrollbar = () => {
  const thumbRef = useRef(null);
  const [thumbHeight, setThumbHeight] = useState(0);
  const [thumbTop, setThumbTop] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startScrollTop, setStartScrollTop] = useState(0);
  const [container, setContainer] = useState(null);

  const calculateThumbSize = useCallback(() => {
    if (!container) return;

    // 전체 문서의 높이와 viewport 높이를 사용
    const documentHeight = container.offsetHeight; // 컨테이너의 전체 높이
    const viewportHeight = window.innerHeight; // viewport 높이

    const heightPercentage = (viewportHeight / documentHeight) * 100;
    const minHeight = 20;
    const calculatedHeight = Math.max(
      minHeight,
      (viewportHeight * heightPercentage) / 100
    );

    setThumbHeight(calculatedHeight);
  }, [container]);

  const handleScroll = useCallback(() => {
    if (!container || isDragging) return;

    const documentHeight = container.offsetHeight;
    const viewportHeight = window.innerHeight;
    const scrollTop = window.scrollY;
    const trackHeight = viewportHeight - thumbHeight;

    // scrollDistance 추가
    const scrollDistance = documentHeight - viewportHeight;

    // percentage 계산 수정
    const percentage = scrollDistance > 0 ? scrollTop / scrollDistance : 0;

    // thumbTop 계산 수정
    const newThumbTop = Math.min(
      Math.max(0, percentage * trackHeight),
      trackHeight
    );

    setThumbTop(newThumbTop);
  }, [container, isDragging, thumbHeight]);

  useEffect(() => {
    const htmlElement = document.querySelector("div#container");
    if (!htmlElement) return;

    setContainer(htmlElement);
    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(() => {
        calculateThumbSize();
        handleScroll();
      });
    });

    resizeObserver.observe(htmlElement);

    const handleResize = () => {
      requestAnimationFrame(() => {
        calculateThumbSize();
        handleScroll();
      });
    };

    window.addEventListener("resize", handleResize);

    // 초기 계산
    calculateThumbSize();
    handleScroll();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, [calculateThumbSize, handleScroll]);

  useEffect(() => {
    if (!container) return;

    // 스크롤 이벤트 핸들러를 별도 함수로 분리
    const scrollHandler = () => {
      requestAnimationFrame(() => {
        handleScroll();
      });
    };

    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [container, handleScroll]);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setStartY(e.clientY);
    setStartScrollTop(window.scrollY); // container.scrollTop 대신 window.scrollY 사용
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e) => {
      const deltaY = e.clientY - startY;
      const documentHeight = container.offsetHeight;
      const viewportHeight = window.innerHeight;
      const trackHeight = viewportHeight - thumbHeight;

      // 스크롤바 위치 계산
      const percentage = deltaY / trackHeight;
      const scrollDistance = documentHeight - viewportHeight;
      const newScrollTop = Math.min(
        Math.max(0, startScrollTop + percentage * scrollDistance),
        scrollDistance
      ); // 스크롤 위치를 0과 최대값 사이로 제한

      window.scrollTo(0, newScrollTop);

      // 스크롤바 thumb의 위치도 제한하여 업데이트
      const thumbPercentage = newScrollTop / scrollDistance;
      const newThumbTop = Math.min(
        Math.max(0, thumbPercentage * trackHeight),
        trackHeight
      ); // thumb 위치를 0과 track 높이 사이로 제한

      setThumbTop(newThumbTop);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, startY, startScrollTop, thumbHeight, container]);

  // 스크롤이 필요 없는 경우 스크롤바를 숨김
  if (container && container.offsetHeight <= window.innerHeight) {
    return null;
  }

  return (
    <div className={styles["scrollbar-track"]}>
      <div
        ref={thumbRef}
        className={styles["scrollbar-thumb"]}
        style={{
          height: `${thumbHeight}px`,
          top: `${thumbTop}px`,
        }}
        onMouseDown={handleMouseDown}
        role="presentation"
        aria-hidden="true"
      />
    </div>
  );
};

export function Divider({ className }) {
  const dividerClass = className
    ? `${styles["dashed-line"]} ${className}`
    : styles["dashed-line"];

  return <div className={dividerClass}></div>;
}
