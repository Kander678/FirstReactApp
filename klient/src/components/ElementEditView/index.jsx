import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import '../../components/App.css'; // Dodanie importu pliku CSS

const ElementEditView = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const jwt = localStorage.getItem('jwt');
  axios.defaults.headers.common['authorization'] = `${jwt}`;

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

  //pobranie właściwości danego elementu
  useEffect(() => {
    axios
      .get(`http://localhost:5000/element/${id}`,{
        headers: {
          authorization: `${jwt}`
        }
      })
      .then((response) => {
        setFormData({
          name: response.data.name,
          description: response.data.description,
        });
      })
      .catch((error) => {
        console.error(`There was an error retrieving the element: ${error}`);
      });
  }, [id]);

  //pobranie wszystkich kategorii do pola typu select
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/categories", {
          headers: {
            'authorization': `${jwt}`
          },
        });
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchData();
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  //aktualizacja pól elementu (wpisanie do bazy)
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

    const url = `http://localhost:5000/elements/${id}`;
    const data = {
      name: formData.name,
      description: formData.description,
    };

    axios
      .put(url, data,{
        headers: {
          authorization: `${jwt}`
        }
      })
      .then((response) => {
        console.log(response.data);
        alert("Zaktualizowano pole element");
        handleElementToCategoryBinding();
      })
      .catch((error) => {
        alert("Błąd w dodawaniu elementu");
        console.error(error);
      });
  };

  //przekazanie (w .then) zapisu elementu do danej kategorii (wpisanie do bazy)
  const handleElementToCategoryBinding = () => {
    console.log("JWT token:", jwt);
    console.log("Kategoria_id:" + selectedCategory);
    console.log("Element_id:" + id);
    const url = `http://localhost:5000/element_id/to/category_id/${id}/${selectedCategory}`;
    axios
      .put(url,{
        headers: {
          authorization: `${jwt}`
        }
      })
      .then((response) => {
        console.log(response.data);
        alert("Dodano element");
      })
      .catch((error) => {
        alert("Błąd w dodawaniu elementu");
        console.error(error);
      });
  };

  return (
    <div className="detail-view">
      <h2>Element Edit</h2>
      <form onSubmit={handleSubmit}>
        <label>Kategoria:</label>
        <select
          id="categorySelect"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">Select ...</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {`${category.name} - ${category.description}`}
            </option>
          ))}
        </select>

        <br />
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

export default ElementEditView;
