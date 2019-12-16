import React from "react";

const Modal = ({ closeModal, children }) => {
  return (
    <>
      <div id="myModal" class="modal">
        <div class="modal-content">
          <span class="close" role="button" onClick={closeModal}>
            &times;
          </span>
          <p>{children}</p>
        </div>
      </div>
    </>
  );
};

export default Modal;
