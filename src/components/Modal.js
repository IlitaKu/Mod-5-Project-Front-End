import React from "react";

const Modal = ({ closeModal, children, smallSize }) => {
  return (
    <>
      <div id="myModal" class="modal">
        <div class="modal-content" id={smallSize ? "small_size" : "full_size"}>
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
