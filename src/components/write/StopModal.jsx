import React from "react";

export default function StopModal(props) {
  function closeModal() {
    props.closeModal();
  }

  return (
    <>
      <dialog>
        <p>작성 중인 글이 있습니다. 창을 닫으시겠습니까?</p>
        <button onClick={closeModal}>네</button>
        <button>아니오</button>
        <button>
          <span className="sr-only">닫기</span>
        </button>
      </dialog>
    </>
  );
}