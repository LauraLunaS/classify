import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import style from "./login.module.css";
import google from "../../images/google.png";
import email from "../../images/email.png";
import apple from "../../images/apple.png";
import banner from "../../images/banner.png";
import logo from "../../images/logo.png";

export default function Login() {
  const [inputEmail, setinputEmail] = useState("");
  const [inputSenha, setinputSenha] = useState("");
  const navigate = useNavigate();

  const appId = "n7Du9WmGouDZ7gYjkn5MiXas8nfGjT4qFwrk45zX";
  const apiKey = "JuRfAoomwwFNZwdlB1Ndx4NRj9pX7gMly2aqqYb1";

  const data = {
    email: inputEmail,
    password: inputSenha,
  };

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch(
        "https://tcc-demanda-de-turmas.onrender.com/api/cadastro",
        {
          method: "POST",
          headers: {
            "X-Parse-Application-Id": appId,
            "X-Parse-REST-API-Key": apiKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      console.log("Dados enviados com sucesso:", result);

      localStorage.setItem("userEmail", inputEmail);

      navigate("/home");
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
    }
  }

  async function handleLogin(event) {
    event.preventDefault();
  
    try {
      const response = await fetch(
        "https://tcc-demanda-de-turmas.onrender.com/api/login",
        {
          method: "POST",
          headers: {
            "X-Parse-Application-Id": appId,
            "X-Parse-REST-API-Key": apiKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
  
      if (!response.ok) {
        console.error("Erro ao fazer login:", response.statusText);
        return;
      }
  
      const result = await response.json();
      console.log("Login bem-sucedido:", result);
  
      const token = result.token;
      if (!token) {
        console.error("Token não encontrado na resposta.");
        return;
      }
  
      localStorage.setItem('session_token', token);
  
      navigate("/home");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  }

  return (
    <>
    <div className={style.ContainerBox}>
      <img src={logo} className={style.logo} alt="Logo"></img>
        <form className={style.form} onSubmit={handleSubmit}>
          <h2>
            Faça login ou cadastre-se
          </h2>
          <input
            type="text"
            placeholder="Enter your email"
            className={style.InputSignIn}
            value={inputEmail}
            onChange={(event) => setinputEmail(event.target.value)}
          ></input>

          <input
            type="password"
            placeholder="Enter your password"
            className={style.InputSignIn}
            value={inputSenha}
            onChange={(event) => setinputSenha(event.target.value)}
          ></input>

          <a className={style.a}>Esqueceu sua senha?</a>

          <button type="submit" className={style.btnCadastrar} >
            Cadastre-se
          </button>
          <button type="button" className={style.btnCadastrar} onClick={handleLogin}>
            Login
          </button>

        <div className={style.btn}>
          <button className={style.options}>
            <img src={google} width="20px" height="20px" alt="Google"></img>
          </button>
          <button className={style.options}>
            <img src={email} width="22px" height="20px" alt="Email"></img>
          </button>
          <button className={style.options}>
            <img src={apple} width="20px" height="22px" alt="Apple"></img>
          </button>
        </div>
        </form>
      <img src={banner} className={style.imgBanner} alt="Banner"></img>
      <div className={style.line}></div>
      </div>
    </>
  );
}
