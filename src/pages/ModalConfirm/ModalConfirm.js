import React, { useState, useEffect } from "react";
import style from "./modal.module.css";
import ModalSuccess from "../ModalSucess/ModalSucess";

const ModalConfirm = ({
  onConfirm,
  onCancel,
  curso,
  disciplina,
  professor,
  sala,
  periodo,
}) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [cursoName, setCursoName] = useState("");
  const [disciplinaName, setDisciplinaName] = useState("");
  const [professorName, setProfessorName] = useState("");
  const [salaName, setSalaName] = useState("");
  const [periodoName, setPeriodoName] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const sessionToken = localStorage.getItem("session_token");

        if (!sessionToken) {
          throw new Error("Token de sessão não encontrado.");
        }

        // Adapte as URLs conforme necessário
        const cursoResponse = await fetch(
          `https://tcc-demanda-de-turmas.onrender.com/api/curso/${curso}`,
          {
            headers: {
              Authorization: `Bearer ${sessionToken}`,
            },
          }
        );

        const disciplinaResponse = await fetch(
          `https://tcc-demanda-de-turmas.onrender.com/api/disciplina/${disciplina}`,
          {
            headers: {
              Authorization: `Bearer ${sessionToken}`,
            },
          }
        );

        const professorResponse = await fetch(
          `https://tcc-demanda-de-turmas.onrender.com/api/professor/${professor}`,
          {
            headers: {
              Authorization: `Bearer ${sessionToken}`,
            },
          }
        );

        const salaResponse = await fetch(
          `https://tcc-demanda-de-turmas.onrender.com/api/sala/${sala}`,
          {
            headers: {
              Authorization: `Bearer ${sessionToken}`,
            },
          }
        );

        const periodoResponse = await fetch(
          `https://tcc-demanda-de-turmas.onrender.com/api/periodo/${periodo}`,
          {
            headers: {
              Authorization: `Bearer ${sessionToken}`,
            },
          }
        );

        if (
          !cursoResponse.ok ||
          !disciplinaResponse.ok ||
          !professorResponse.ok ||
          !salaResponse.ok ||
          !periodoResponse.ok
        ) {
          throw new Error("Falha ao obter detalhes");
        }

        const cursoData = await cursoResponse.json();
        const disciplinaData = await disciplinaResponse.json();
        const professorData = await professorResponse.json();
        const salaData = await salaResponse.json();
        const periodoData = await periodoResponse.json();

        setCursoName(cursoData.name);
        setDisciplinaName(disciplinaData.name);
        setProfessorName(professorData.name);
        setSalaName(salaData.name);
        setPeriodoName(periodoData.name);
      } catch (error) {
        console.error("Erro ao obter detalhes:", error);
      }
    };

    fetchDetails();
  }, [curso, disciplina, professor, sala, periodo]);

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
  };

  const openSuccessModal = () => {
    setShowSuccessModal(true);
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const handleAdd = async () => {
    try {
      const sessionToken = localStorage.getItem("session_token");

      if (!sessionToken) {
        throw new Error("Token de sessão não encontrado.");
      }

      console.log("Enviando dados:", {
        courseId: curso,
        disciplineId: disciplina,
        teacherId: professor,
        classroomId: sala,
        termId: periodo,
      });

      const response = await fetch(
        "https://tcc-demanda-de-turmas.onrender.com/api/turma",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionToken}`,
          },
          body: JSON.stringify({
            courseId: curso,
            disciplineId: disciplina,
            teacherId: professor,
            classroomId: sala,
            termId: periodo,
          }),
        }
      );

      console.log("Resposta do servidor:", response);

      if (!response.ok) {
        throw new Error(`Falha ao adicionar turma: ${response.status}`);
      }

      openSuccessModal();
    } catch (error) {
      console.error("Erro ao enviar requisição:", error);
    }
  };

  if (showSuccessModal) {
    return (
      <div className="modal-overlay">
        <ModalSuccess onConfirm={handleAdd} onClose={handleSuccessClose} />
      </div>
    );
  }

  return (
    <div className={style.container}>
      <button onClick={onCancel} className={style.btnCan}>
        X
      </button>
      <h2 className={style.title}>Confirmação</h2>
      <p className={style.subtitle}>Deseja realmente adicionar?</p>
      <p className={style.p}>Curso: {cursoName}</p>
      <p className={style.p}>Disciplina: {disciplinaName}</p>
      <p className={style.p}>Professor: {professorName}</p>
      <p className={style.p}>Sala: {salaName}</p>
      <p className={style.p}>Período: {periodoName}</p>
      <button onClick={handleAdd} className={style.btnAdd}>
        Sim
      </button>
    </div>
  );
};

export default ModalConfirm;
