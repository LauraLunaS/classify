import React, { useState } from 'react';
import style from './modal.module.css';
import ModalSuccess from '../ModalSucess/ModalSucess';

const ModalConfirm = ({ onConfirm, onCancel, curso, disciplina, professor, sala, periodo }) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);

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
  
      console.log('Enviando dados:', { courseId: curso, disciplineId: disciplina, teacherId: professor, classroomId: sala, termId: periodo });
  
      const response = await fetch("https://tcc-demanda-de-turmas.onrender.com/api/turma", {
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
          termId: periodo
        }),
      });
  
      console.log('Resposta do servidor:', response);
  
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
      <p className={style.p}>Curso: {curso}</p>
      <p className={style.p}>Disciplina: {disciplina}</p>
      <p className={style.p}>Professor: {professor}</p>
      <p className={style.p}>Sala: {sala}</p>
      <p className={style.p}>Período: {periodo}</p>
      <button onClick={handleAdd} className={style.btnAdd}>
        Sim
      </button>
    </div>
  );
};

export default ModalConfirm;
