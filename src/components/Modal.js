import ReactDOM from "react-dom";
import "../styles/Modal.css";

const modalRoot = document.getElementById("modal");

const Modal = props => {
    return ReactDOM.createPortal(
        <div className="poz">
            <div className="modal">
                <div className="modal-body">{props.children}</div>
            </div>
                
        </div>,

        modalRoot
    );
};

export default Modal;
