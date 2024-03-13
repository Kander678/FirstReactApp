import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import '../../components/App.css'; // Dodanie importu pliku CSS

const CategoryAddView = () => {
  const Navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
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

    const url = `http://localhost:5000/categories`;
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
        alert("Kategoria dodana pomyślnie");
        Navigate('/table');
      })
      .catch((error) => {
        alert("Bład w dodawaniu kategorii");
        console.error(error);
      });
  };

  return (
    <div className="detail-view">
      <h2>Category Add</h2>
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

export default CategoryAddView;
