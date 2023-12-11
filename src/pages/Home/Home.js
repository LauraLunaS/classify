import React, { useState, useEffect } from "react";
import style from "./home.module.css";
import emailhome from "../../images/emailhome.png";
import search from "../../images/search.png";
import Modal from "../Modal/Modal";

export default function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [turmas, setTurmas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cursos, setCursos] = useState([]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {

    const fetchCursos = async () => {
      try {
        const sessionToken = localStorage.getItem("session_token");

        const responseCursos = await fetch(
          "https://tcc-demanda-de-turmas.onrender.com/api/curso",
          {
            headers: {
              Authorization: `Bearer ${sessionToken}`,
            },
          }
        );

        if (responseCursos.ok) {
          const dataCursos = await responseCursos.json();
          setCursos(dataCursos);
          console.log(dataCursos)
        } else {
          console.error("Falha ao obter dados dos cursos:", responseCursos.status);
        }
      } catch (error) {
        console.error("Erro ao obter dados dos cursos:", error);
      }
    };

    fetchCursos();
  }, []); 

  const handleCursoClick = () => {
    window.location.href = "/solicitation";
  };

  return (
    <div className={style.background}>
      <header className={style.header}>
        <div className={style.contentBox}>
          <div className={style.person}></div>
          <div className={style.ConatainerColumn}>
            <h2>Helena dos Santos</h2>
            <div className={style.ContainerEmail}>
              <img src={emailhome}></img>
              <p>helena@email.com</p>
            </div>
          </div>
        </div>
      </header>
      <div className={style.Btn}>
        <button className={style.BtnGen}>Gerenciar salas</button>
        <button className={style.BtnDoc}>Documentos</button>
        <button className={style.BtnPre}>Preferências</button>
        <button className={style.BtnOut}>Outros</button>
      </div>


      <div className={style.content}>
        <h4>Cursos</h4>
          <div className={style.ContainerCurso}>
              {cursos.map((curso) => (
                <>
                  <li key={curso.id} className={style.curso} onClick={handleCursoClick}>{curso.name}</li>
                </>
              ))}
          </div>
        </div>
    </div>
  );
}

