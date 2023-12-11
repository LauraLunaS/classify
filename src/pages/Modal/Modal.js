import React, { useState, useEffect } from "react";
import style from "./modal.module.css";
import ModalConfirm from "../ModalConfirm/ModalConfirm";

const Modal = ({ isOpen, onRequestClose }) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [cursos, setCursos] = useState([]);
  const [disciplinas, setDisciplinas] = useState([]);
  const [professores, setProfessores] = useState([]);
  const [salas, setSalas] = useState([]);
  const [cursoSelecionado, setCursoSelecionado] = useState("");
  const [disciplinaSelecionada, setDisciplinaSelecionada] = useState("");
  const [professorSelecionado, setProfessorSelecionado] = useState("");
  const [salaSelecionada, setSalaSelecionada] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantidadeAlunos, setQuantidadeAlunos] = useState("");
  const [salasDisponiveis, setSalasDisponiveis] = useState([]);
  const [periodos, setPeriodos] = useState([]);
  const [periodoSelecionado, setPeriodoSelecionado] = useState("");

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const sessionToken = localStorage.getItem("session_token");

        if (!sessionToken) {
          setError("Token de sessão não encontrado.");
          setLoading(false);
          return;
        }

        const responseCursos = await fetch(
          "https://tcc-demanda-de-turmas.onrender.com/api/curso",
          {
            headers: {
              Authorization: `Bearer ${sessionToken}`,
            },
          }
        );

        if (!responseCursos.ok) {
          throw new Error(`Failed to fetch cursos: ${responseCursos.status}`);
        }

        const dataCursos = await responseCursos.json();

        console.log("Data Cursos:", dataCursos);

        if (dataCursos) {
          const cursos = dataCursos.map((curso) => ({
            id: curso.id,
            name: curso.name,
          }));

          setCursos(cursos);
        } else {
          console.error(
            "Results not found or not in the expected format in API response:",
            dataCursos
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchDisciplinas = async () => {
      try {
        const sessionToken = localStorage.getItem("session_token");

        if (!sessionToken) {
          setError("Token de sessão não encontrado.");
          setLoading(false);
          return;
        }

        const responseDisciplinas = await fetch(
          "https://tcc-demanda-de-turmas.onrender.com/api/disciplina",
          {
            headers: {
              Authorization: `Bearer ${sessionToken}`,
            },
          }
        );

        if (!responseDisciplinas.ok) {
          throw new Error(
            `Failed to fetch disciplinas: ${responseDisciplinas.status}`
          );
        }

        const dataDisciplinas = await responseDisciplinas.json();

        console.log("Data Disciplinas:", dataDisciplinas);

        if (dataDisciplinas) {
          const disciplinas = dataDisciplinas.map((disciplina) => ({
            id: disciplina.id,
            name: disciplina.name,
          }));

          setDisciplinas(disciplinas);
          console.log(dataDisciplinas);
        } else {
          console.error(
            "Results not found or not in the expected format in API response:",
            dataDisciplinas
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchProfessores = async () => {
      try {
        const sessionToken = localStorage.getItem("session_token");

        if (!sessionToken) {
          setError("Token de sessão não encontrado.");
          setLoading(false);
          return;
        }

        const responseProfessores = await fetch(
          "https://tcc-demanda-de-turmas.onrender.com/api/professor",
          {
            headers: {
              Authorization: `Bearer ${sessionToken}`,
            },
          }
        );

        if (!responseProfessores.ok) {
          throw new Error(
            `Failed to fetch professores: ${responseProfessores.status}`
          );
        }

        const dataProfessores = await responseProfessores.json();

        console.log("Data Professores:", dataProfessores);

        if (dataProfessores) {
          const professores = dataProfessores.map((professor) => ({
            id: professor.id,
            name: professor.name,
          }));

          setProfessores(professores);
        } else {
          console.error(
            "Results not found or not in the expected format in API response:",
            dataProfessores
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchSalas = async () => {
      try {
        const sessionToken = localStorage.getItem("session_token");

        if (!sessionToken) {
          setError("Token de sessão não encontrado.");
          setLoading(false);
          return;
        }

        const responseSalas = await fetch(
          "https://tcc-demanda-de-turmas.onrender.com/api/sala",
          {
            headers: {
              Authorization: `Bearer ${sessionToken}`,
            },
          }
        );

        if (!responseSalas.ok) {
          throw new Error(`Failed to fetch salas: ${responseSalas.status}`);
        }

        const dataSalas = await responseSalas.json();

        console.log("Data Salas:", dataSalas);

        if (dataSalas) {
          const salas = dataSalas.map((sala) => ({
            id: sala.id,
            name: sala.name,
            capacity: sala.capacity, // Se 'capacity' também for necessário
          }));

          setSalas(salas);
        } else {
          console.error(
            "Results not found or not in the expected format in API response:",
            dataSalas
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchPeriodos = async () => {
      try {
        const sessionToken = localStorage.getItem("session_token");

        if (!sessionToken) {
          setError("Token de sessão não encontrado.");
          setLoading(false);
          return;
        }

        const responsePeriodos = await fetch(
          "https://tcc-demanda-de-turmas.onrender.com/api/periodo",
          {
            headers: {
              Authorization: `Bearer ${sessionToken}`,
            },
          }
        );

        if (!responsePeriodos.ok) {
          throw new Error(
            `Failed to fetch periodos: ${responsePeriodos.status}`
          );
        }

        const dataPeriodos = await responsePeriodos.json();

        console.log("Data Periodos:", dataPeriodos);

        if (dataPeriodos) {
          const periodos = dataPeriodos.map((periodo) => ({
            id: periodo.id,
            name: periodo.name,
          }));

          setPeriodos(periodos);
        } else {
          console.error(
            "Results not found or not in the expected format in API response:",
            dataPeriodos
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCursos();
    fetchDisciplinas();
    fetchProfessores();
    fetchSalas();
    fetchPeriodos();
  }, []);

  const openConfirmationModal = () => {
    setShowConfirmationModal(true);
  };

  const closeConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  const handleAdd = () => {
    closeConfirmationModal();
  };

  const shouldShowModal = true;

  const buscarSalasDisponiveis = () => {
    console.log("Salas:", salas);
    const quantidadeAlunosInt = parseInt(quantidadeAlunos, 10);
    const salasDisponiveis = salas.filter(
      (sala) => sala.capacity >= quantidadeAlunosInt
    );
    console.log("Salas Disponíveis:", salasDisponiveis);
    setSalasDisponiveis(salasDisponiveis);
  };

  if (showConfirmationModal) {
    return (
      <div className="modal-overlay">
        <ModalConfirm
          onConfirm={handleAdd}
          onCancel={closeConfirmationModal}
          curso={cursoSelecionado}
          disciplina={disciplinaSelecionada}
          professor={professorSelecionado}
          sala={salaSelecionada}
          periodo={periodoSelecionado}
        />
      </div>
    );
  }

  if (!shouldShowModal) {
    return null;
  }

  return (
    <div className={style.Container}>
      <h1 className={style.h1}>Adicionar nova turma</h1>

      <div className={style.Content}>
        <p className={style.p}>Curso</p>
        <select
          className={style.inputMaior}
          onChange={(e) => setCursoSelecionado(e.target.value)}
        >
          <option value="">Selecione um curso</option>
          {cursos.map((curso, index) => (
            <option key={index} value={curso.id}>
              {curso.name}
            </option>
          ))}
        </select>

        <p className={style.p}>Disciplina</p>
        <select
          className={style.inputMaior}
          onChange={(e) => setDisciplinaSelecionada(e.target.value)}
        >
          <option value="">Selecione uma disciplina</option>
          {disciplinas.map((disciplina, index) => (
            <option key={index} value={disciplina.id}>
              {disciplina.name}
            </option>
          ))}
        </select>

        <p className={style.p}>Professor</p>
        <select
          className={style.inputMenor}
          onChange={(e) => setProfessorSelecionado(e.target.value)}
        >
          <option value="">Selecione um professor</option>
          {professores.map((professor, index) => (
            <option key={index} value={professor.id}>
              {professor.name}
            </option>
          ))}
        </select>

        <div className={style.qtdAlunos}>
          <p className={style.p}>Quantidade de alunos</p>
          <div>
            <input
              type="number"
              placeholder="Ex: 55"
              className={style.inputNumber}
              value={quantidadeAlunos}
              onChange={(e) => setQuantidadeAlunos(e.target.value)}
            />
            <button className={style.button} onClick={buscarSalasDisponiveis}>
              Buscar
            </button>
          </div>
        </div>

        <p className={style.p}>Sala</p>
        <select
          className={style.inputMenor}
          onChange={(e) => setSalaSelecionada(e.target.value)}
        >
          <option value="">Selecione uma sala</option>
          {salasDisponiveis.map((sala, index) => (
            <option key={index} value={sala.id}>
              {sala.name} - Capacidade: {sala.capacity}
            </option>
          ))}
        </select>

        <p className={style.p}>Período</p>
        <select
          className={style.inputMenor}
          onChange={(e) => setPeriodoSelecionado(e.target.value)}
        >
          <option value="">Selecione um período</option>
          {periodos.map((periodo, index) => (
            <option key={index} value={periodo.id}>
              {periodo.name}
            </option>
          ))}
        </select>

        <div className={style.btn}>
          <button className={style.btnCan} onClick={onRequestClose}>
            Cancelar
          </button>
          <button className={style.btnAdd} onClick={openConfirmationModal}>
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
