import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../../components/App.css'; // Dodanie importu pliku CSS

const ElementAddView = () => {
  const Navigate = useNavigate();
  const jwt = localStorage.getItem('jwt');

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Walidacja pól
    if (formData.name.trim() === "" || formData.description.trim() === "") {
      alert("Pola nie mogą być puste");
      return;
    }

    if (
      formData.name.includes("<script>") ||
      formData.description.includes("<script>")
    ) {
      alert("Pola nie mogą zawierać znaczników JavaScript");
      return;
    }

    const specialCharsRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (
      specialCharsRegex.test(formData.name) ||
      specialCharsRegex.test(formData.description)
    ) {
      alert("Pola nie mogą zawierać znaków specjalnych");
      return;
    }

    const url = `http://localhost:5000/elements`;
    const data = {
      name: formData.name,
      description: formData.description,
    };

    axios
      .post(url, data, {
        headers: {
          authorization: `${jwt}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        alert("Element dodany pomyślnie");
        Navigate('/table');
      })
      .catch((error) => {
        alert("Błąd w dodawaniu elementu");
        console.error(error);
      });
  };

  return (
    <div className="detail-view">
      <h2>Element Add</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="name1"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          id="description1"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ElementAddView;
