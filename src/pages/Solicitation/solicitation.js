import React, { useState, useEffect } from "react";
import style from "./solicitation.module.css";
import emailhome from "../../images/emailhome.png";
import search from "../../images/search.png";
import Modal from "../Modal/Modal";

export default function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [turmas, setTurmas] = useState([]);
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
      const fetchCurso = async (courseId) => {
        try {
          const sessionToken = localStorage.getItem("session_token");

          const responseCurso = await fetch(
            `https://tcc-demanda-de-turmas.onrender.com/api/curso/${courseId}`,
            {
              headers: {
                Authorization: `Bearer ${sessionToken}`,
              },
            }
          );

          if (responseCurso.ok) {
            return await responseCurso.json();
          } else {
            console.error(
              "Falha ao obter dados dos cursos:",
              responseCurso.status
            );

            return {
              name: "Nome do Curso Desconhecido",
            };
          }
        } catch (error) {
          console.error("Erro ao obter dados dos cursos:", error);
          return {
            name: "Nome do Curso Desconhecido",
          };
        }
      };

      const fetchDisciplina = async (disciplineId) => {
        try {
          const sessionToken = localStorage.getItem("session_token");

          const responseDisciplina = await fetch(
            `https://tcc-demanda-de-turmas.onrender.com/api/disciplina/${disciplineId}`,
            {
              headers: {
                Authorization: `Bearer ${sessionToken}`,
              },
            }
          );

          if (responseDisciplina.ok) {
            return await responseDisciplina.json();
          } else {
            console.error(
              "Falha ao obter dados das disciplinas:",
              responseDisciplina.status
            );

            return {
              name: "Nome da Disciplina Desconhecido",
            };
          }
        } catch (error) {
          console.error("Erro ao obter dados das disciplinas:", error);
          return {
            name: "Nome da Disciplina Desconhecido",
          };
        }
      };

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

          const dataTurmaPromise = dataTurmas.map(async (turma) => {
            const [curso, disciplina] = await Promise.all([
              fetchCurso(turma.courseId),
              fetchDisciplina(turma.disciplineId),
            ]);

            return {
              turma,
              curso,
              disciplina,
            };
          });

          const dataTurma = await Promise.all(dataTurmaPromise);

          setTurmas(dataTurma);
          console.log(dataTurma);
        } else {
          console.error(
            "Falha ao obter dados das turmas:",
            responseTurmas.status
          );
          setError(
            "Falha ao obter dados das turmas. Por favor, tente novamente."
          );
        }
      } catch (error) {
        console.error("Erro ao obter dados das turmas:", error);
        setError(
          "Falha ao obter dados das turmas. Por favor, tente novamente."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTurmas();
  }, []);

  const handleExcluir = async (classId) => {
    try {
      const sessionToken = localStorage.getItem("session_token");

      if (!sessionToken) {
        setError("Token de sessão não encontrado.");
        setLoading(false);
        return;
      }

      const response = await fetch(
        `https://tcc-demanda-de-turmas.onrender.com/api/turma/${classId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${sessionToken}`,
          },
        }
      );

      if (response.ok) {
        setTurmas((prevTurmas) =>
          prevTurmas.filter((turma) => turma.turma.id !== classId)
        );
      } else {
        console.error("Falha ao excluir a turma:", response.status);
        setError("Falha ao excluir a turma. Por favor, tente novamente.");
      }
    } catch (error) {
      console.error("Erro excluir a turma:", error);
      setError("Falha excluir a turma. Por favor, tente novamente.");
    }
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

      <section className={style.session}>
        <h2 className={style.h2}>Solicitações</h2>
        <div>
          <input type="text" className={style.Input}></input>
          <button className={style.BtnAdd} onClick={openModal}>
            Adicionar
          </button>
        </div>
        {modalIsOpen && (
          <div>
            <Modal onRequestClose={closeModal} />
          </div>
        )}
      </section>

      {turmas.map(({ turma, curso, disciplina }) => (
        <div key={turma.id} className={style.Info}>
          <div className={style.Box}>
            <p className={style.Sip}>SI</p>
          </div>
          <div className={style.info}>
            <h5 className={style.hinfo}>
              {curso.name} - {disciplina.name}
            </h5>
            <div>
              <button
                onClick={() => handleExcluir(turma.id)}
                className={style.btn}
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
