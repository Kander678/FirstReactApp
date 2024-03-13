import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Navigate, useNavigate } from 'react-router-dom';
import './App.css'; // Dodanie importu pliku CSS

const ViewsPage = () => {
  const [elements, setElements] = useState([]);
  const [categories, setCategories] = useState([]);
  const jwt = localStorage.getItem('jwt');

  useEffect(() => {
    axios.get('http://localhost:5000/elements', {
      headers: {
        authorization: `${jwt}`
      }
    })
      .then(response => {
        setElements(response.data);
      })
      .catch(error => {
        console.error(`There was an error retrieving the elements: ${error}`);
      });



    axios.get('http://localhost:5000/categories',
    {
      headers: {
        authorization: `${jwt}`
      }
    })
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error(`There was an error retrieving the categories: ${error}`);
      });
  }, []);

  const deleteElement = (_id) => {
    axios.delete(`http://localhost:5000/elements/${_id}`,{
      headers: {
        authorization: `${jwt}`
      }
    })
      .then(response => {
        setElements(elements.filter(element => element._id !== _id));
        alert("Element usunięty pomyślnie");
      })
      .catch(error => {
        console.error(`There was an error deleting the element: ${error}`);
        alert("Błąd usuwania");
      });
  };

  const deleteCategory = (_id) => {
    axios.delete(`http://localhost:5000/categories/${_id}`,{
      headers: {
        authorization: `${jwt}`
      }
    })
      .then(response => {
        setCategories(categories.filter(category => category._id !== _id));
        alert("Kategoria usunięta pomyślnie");
      })
      .catch(error => {
        console.error(`There was an error deleting the category: ${error}`);
        alert("Błąd usuwania");
      });
  };

  return (
    <div>
      <h2>Elements</h2>
      <Link to={`/elementAdd`}><button>Dodaj element</button></Link>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {elements.map((element, index) => (
            <tr key={index}>
              <td>{element.name}</td>
              <td>{element.description}</td>
              <td>
                <Link to={`/elementDetail?id=${element._id}`}><button>Szczegóły</button></Link>
                <Link to={`/elementEdit?id=${element._id}`}><button>Edycja</button></Link>
                <button onClick={() => deleteElement(element._id)}>Usuń</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to={`/elementAdd`}><button>Dodaj element</button></Link>
      

      <h2>Categories</h2>
      <Link to={`/categoryAdd`}><button>Dodaj kategorię</button></Link>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={index}>
              <td>{category.name}</td>
              <td>{category.description}</td>
              <td>
                <Link to={`/categoryDetail?id=${category._id}`}><button>Szczegóły</button></Link>
                <Link to={`/categoryEdit?id=${category._id}`}><button>Edycja</button></Link>
                <button onClick={() => deleteCategory(category._id)}>Usuń</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to={`/categoryAdd`}><button>Dodaj kategorię</button></Link>
    </div>
  );
};

export default ViewsPage;
