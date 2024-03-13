import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation  } from 'react-router-dom';
import '../../components/App.css'; // Dodanie importu pliku CSS

const ElementDetailsView = () => {
  const [element, setElement] = useState({ name: '', description: '' });
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');
  const [category, setCategory] = useState({ name: '', description: '' });
  const jwt = localStorage.getItem('jwt');
  axios.defaults.headers.common['authorization'] = `${jwt}`;



  useEffect(() => {
    axios.get(`http://localhost:5000/element/${id}`)
      .then(response => {
        setElement(response.data);
      })
      .catch(error => {
        console.error(`There was an error retrieving the category: ${error}`);
      });
  }, [id]);

  
  useEffect(() => {
    axios.get(`http://localhost:5000/categoryByElementId/${id}`)
      .then(response => {
        setCategory(response.data);
      })
      .catch(error => {
        console.error(`There was an error retrieving the category: ${error}`);
      });
  }, [id]);


  
  return (
    <div className="detail-view">
        <h2>Category:
        <br/>
        {category.name}
        <br/>
        {category.description}</h2>
      <h3>Element Details</h3>
      <p>Name: {element.name}</p>
      <p>Description: {element.description}</p>

    </div>
  );
};

export default ElementDetailsView;
