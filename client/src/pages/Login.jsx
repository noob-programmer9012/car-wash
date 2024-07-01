import { useEffect, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const errorBlock = document.querySelector(".error-block");
    const error = document.querySelector(".error");
    if (show) {
      errorBlock.classList.add("show");
      error.classList.add("show");
    } else {
      errorBlock.classList.remove("show");
      error.classList.remove("show");
    }

    const labels = document.getElementById("label");
    labels.addEventListener("click", () => {
      labels.parentNode.childNodes[0].focus();
    });
  }, [show]);

  function handleClose() {
    setShow((prev) => !prev);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (email === undefined || password === undefined) {
      setError("please enter email and password");
      setShow(true);
    } else {
      try {
        const data = await axios.post("http://localhost:5000/auth/login", {
          email: email,
          password: password,
        });
        localStorage.removeItem("token");
        localStorage.removeItem("isAdmin");
        localStorage.removeItem("isUser");
        localStorage.setItem("token", data.data.token);
        if (data.data.isAdmin) {
          localStorage.setItem("isAdmin", true);
          return navigate("/admin");
        } else if (data.data.isUser) {
          localStorage.setItem("isUser", true);
          return navigate("/");
        }
      } catch (error) {
        setError(error.response.data.message);
        setShow(true);
      }
    }
  }

  function handleChange(e) {
    const _label = e.target.parentNode.childNodes["1"];
    setShow(false);

    if (
      _label.htmlFor === "email" &&
      (e.target.value !== "" || e.target.value !== undefined)
    ) {
      _label.style.top = "-20px";
      _label.style.left = "10px";
      _label.style.fontSize = "0.8rem";
      _label.style.color = "#ffffffde";
    }
    if (_label.htmlFor === "email" && e.target.value.trim() == "") {
      _label.style.top = "17px";
      _label.style.left = "20px";
      _label.style.color = "#884925";
      _label.style.fontSize = "1rem";
    }

    if (
      _label.htmlFor === "password" &&
      (e.target.value !== "" || e.target.value !== undefined)
    ) {
      _label.style.top = "-20px";
      _label.style.left = "10px";
      _label.style.fontSize = "0.8rem";
      _label.style.color = "#ffffffde";
    }
    if (_label.htmlFor === "password" && e.target.value.trim() == "") {
      _label.style.top = "17px";
      _label.style.left = "20px";
      _label.style.color = "#884925";
      _label.style.fontSize = "1rem";
    }

    if (e.target.id === "email")
      if (e.target.value === "") setEmail(undefined);
      else setEmail(e.target.value);
    else if (e.target.id === "password")
      if (e.target.value === "") setPassword(undefined);
      else setPassword(e.target.value);
  }

  return (
    <>
      <div className="login-wrapper">
        <div className="card">
          <Form noValidate className="loginform" onSubmit={handleSubmit}>
            <h1>LOGIN</h1>
            {
              <div className="error-block">
                <span className="material-symbols-outlined error-icon">
                  error
                </span>
                <p className="error">{error}</p>
                <span
                  className="material-symbols-outlined close"
                  onClick={handleClose}
                >
                  close
                </span>
              </div>
            }
            <div className="field">
              <input
                type="text"
                className="input email"
                id="email"
                onChange={handleChange}
              ></input>
              <label htmlFor="email" className="label" id="label">
                Email *
              </label>
            </div>
            <div className="field">
              <input
                type="password"
                className="input password"
                id="password"
                onChange={handleChange}
              ></input>
              <label htmlFor="password" className="label" id="label">
                Password *
              </label>
            </div>
            <button type="submit" className="btn">
              Login
            </button>
          </Form>
        </div>
      </div>
    </>
  );
}