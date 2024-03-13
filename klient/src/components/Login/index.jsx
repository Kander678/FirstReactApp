import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ login: "", password: "" });
  const Navigate = useNavigate();

  const handleChange = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Walidacja pól
    if (!credentials.login.trim() || !credentials.password.trim()) {
      alert("Pola nie mogą być puste");
      return;
    }

    if (credentials.login.includes("<script>") || credentials.password.includes("<script>")) {
      alert("Pola nie mogą zawierać znaczników JavaScript");
      return;
    }

    const specialCharsRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (specialCharsRegex.test(credentials.login) || specialCharsRegex.test(credentials.password)) {
      alert("Pola nie mogą zawierać znaków specjalnych");
      return;
    }

    axios
      .post("http://localhost:5000/login", credentials)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("jwt", response.data.token);
        alert("Udało się zalogować");
        Navigate("/start");
      })
      .catch((error) => {
        alert("Niepoprawne dane logowania");
        console.error(`There was an error logging in: ${error}`);
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <table>
          <tr>
            <td>
              <label htmlFor="login">Login:</label>
            </td>
            <td>
              <input
                type="text"
                id="login"
                name="login"
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="password">Password:</label>
            </td>
            <td>
              <input
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <button type="submit">Log In</button>
            </td>
          </tr>
        </table>
      </form>
    </div>
  );
};

export default LoginPage;
