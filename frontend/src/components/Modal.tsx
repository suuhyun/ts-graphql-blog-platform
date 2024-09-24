import React from "react";

type Props = {
  content: string;
  button: string;
  onClose: () => void;
};

const Modal = (props: Props) => {
  const { content, button, onClose } = props;
  return (
    <div className="z-10 flex flex-col justify-center rounded shadow-md p-5 absolute top-1/2 left-1/2">
      <div>{content}</div>
      <button onClick={onClose} className="p-2 bg-slate-300 rounded-lg">
        {button}
      </button>
    </div>
  );
};

export default Modal;
