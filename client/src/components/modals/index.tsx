import { FC, useEffect } from "react";
import ReactDOM from "react-dom";
import { closeModal } from "../../utils/utils";
import XIcon from "../icons/XIcon";
import "./stlyes.scss";

interface Props {
  id: string;
  title: string;
}

const element: Element | null = document.querySelector("#modal-mount");
const Modal: FC<Props> = ({ id, title, children }) => {
  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeModal(id);
      }
    });
  }, [id]);

  return ReactDOM.createPortal(
    <div id={id} className="modal_container">
      <div id={`style-${id}`} className="modal_style">
        <header className="modal_header">
          <h1> {title} </h1>
          <button onClick={() => closeModal(id)} className="close_modal">
            <XIcon />
          </button>
        </header>
        {children}
      </div>
    </div>,
    element!
  );
};

export default Modal;
