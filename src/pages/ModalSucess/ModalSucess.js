import React from "react";
import style from "./modal.module.css";
import sucess from "../../images/sucess.png";
import { useNavigate } from "react-router-dom";

const ModalSuccess = ({ onClose }) => {
  const navigate = useNavigate();

  const handleVerSolicitacoes = () => {
    window.location.reload();
  };

  return (
    <div className="modal-overlay">
      <div className={style.Container}>
        <h1 className={style.h1}>Sua solicitação foi confirmada!</h1>
        <img src={sucess} className={style.sucess} alt="Success"></img>
        <button className={style.btn} onClick={handleVerSolicitacoes}>
          Ver solicitações
        </button>
      </div>
    </div>
  );
};

export default ModalSuccess;
