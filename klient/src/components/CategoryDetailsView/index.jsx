import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation  } from 'react-router-dom';
import '../../components/App.css'; // Dodanie importu pliku CSS

const CategoryDetailsView = () => {
  const [category, setCategory] = useState({ name: '', description: '' });
//   const { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');
  const jwt = localStorage.getItem('jwt');
  axios.defaults.headers.common['authorization'] = `${jwt}`;


  useEffect(() => {
    axios.get(`http://localhost:5000/category/${id}`)
      .then(response => {
        console.log("Tekst"+response.data);
        setCategory(response.data);
      })
      .catch(error => {
        console.error(`There was an error retrieving the category: ${error}`);
      });
  }, [id]);

  console.log("Tekst"+category.name);
  
  return (
    <div className="detail-view">
      <h2>Category Details</h2>
      <p>Name: {category.name}</p>
      <p>Description: {category.description}</p>
    </div>
  );
};

export default CategoryDetailsView;
