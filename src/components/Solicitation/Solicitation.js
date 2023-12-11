import Modal from "../Modal/Modal"
import React, { useState, useEffect } from "react";
import style from "../../pages/Home/home.module.css";

export default function Solicitation() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [cursoSelecionado, setCursoSelecionado] = useState('');
    const [disciplinaSelecionada, setDisciplinaSelecionada] = useState('')
    
    const openModal = () => {
      setModalIsOpen(true);
     };
  
    const closeModal = () => {
      setModalIsOpen(false);
    };

    return (
        <>
        <div className={style.Info}>
            <div className={style.Box}>
            <p className={style.Sip}>SI</p>
            </div>
            <div className={style.info}>
            <h5 className={style.hinfo}>
                {cursoSelecionado} - {disciplinaSelecionada}
            </h5>
            <p className={style.pinfo}>23/10/2023</p>
            </div>
        </div>
      </>
    )
}