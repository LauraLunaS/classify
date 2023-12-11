import React, { useState, useEffect } from "react";
import style from "./solicitation.module.css";
import emailhome from "../../images/emailhome.png";
import search from "../../images/search.png";
import Modal from "../Modal/Modal";

export default function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [turmas, setTurmas] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [disciplinas, setDisciplinas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const openModal = () => {
    setModalIsOpen(true);
   };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    const fetchTurmas = async () => {
      try {
        const sessionToken = localStorage.getItem("session_token");

        if (!sessionToken) {
          setError("Token de sessão não encontrado.");
          setLoading(false);
          return;
        }

        const responseTurmas = await fetch(
          "https://tcc-demanda-de-turmas.onrender.com/api/turma",
          {
            headers: {
              Authorization: `Bearer ${sessionToken}`,
            },
          }
        );

        if (responseTurmas.ok) {
          const dataTurmas = await responseTurmas.json();
          setTurmas(dataTurmas);
          console.log(dataTurmas);
        } else {
          console.error("Falha ao obter dados das turmas:", responseTurmas.status);
          setError("Falha ao obter dados das turmas. Por favor, tente novamente.");
        }
      } catch (error) {
        console.error("Erro ao obter dados das turmas:", error);
        setError("Falha ao obter dados das turmas. Por favor, tente novamente.");
      }
    };

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

    const fetchDisciplinas = async () => {
      try {
        const sessionToken = localStorage.getItem("session_token");

        const responseDisciplinas = await fetch(
          "https://tcc-demanda-de-turmas.onrender.com/api/disciplina",
          {
            headers: {
              Authorization: `Bearer ${sessionToken}`,
            },
          }
        );

        if (responseDisciplinas.ok) {
          const dataDisciplinas = await responseDisciplinas.json();
          setDisciplinas(dataDisciplinas);
          console.log(dataDisciplinas)
        } else {
          console.error("Falha ao obter dados das disciplinas:", responseDisciplinas.status);
        }
      } catch (error) {
        console.error("Erro ao obter dados das disciplinas:", error);
      }
    };

    fetchTurmas();
    fetchCursos();
    fetchDisciplinas();
  }, []); 
  

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

      <section className={style.session}>
        <h2 className={style.h2}>Solicitações</h2>
        <div>
          <input type="text" className={style.Input}></input>
          <button className={style.BtnAdd} onClick={openModal}>Adicionar</button>
        </div>
          {modalIsOpen && (
            <div>
              <Modal onRequestClose={closeModal} />
            </div>
          )}
      </section>

      {turmas.map((turma, index) => {
        const curso = cursos.find((c) => c.id === turma.courseId);
        const disciplina = disciplinas.find((d) => d.id === turma.disciplineId);

        return (
          <div key={index} className={style.Info}>
            <div className={style.Box}>
              <p className={style.Sip}>SI</p>
            </div>
            <div className={style.info}>
              <h5 className={style.hinfo}>
                {curso ? curso.name : "Nome do Curso Desconhecido"} -{" "}
                {disciplina ? disciplina.name : "Nome da Disciplina Desconhecido"}
              </h5>
              <div>
                <button className={style.btn}>Excluir</button>
                <button>Editar</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}