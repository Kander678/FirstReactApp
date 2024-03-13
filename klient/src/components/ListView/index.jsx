import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './App.css'; // Dodanie importu pliku CSS

function ListView() {
    const [categories, setCategories] = useState([]);
    const [elements, setElements] = useState([]);
    const jwt = localStorage.getItem('jwt');
    axios.defaults.headers.common['authorization'] = `${jwt}`;
  
  
    useEffect(() => {
        const getElements = async () => {
            const response = await axios.get('http://localhost:5000/elements');
            setElements(response.data);
        };

        const getCategories = async () => {
            const response = await axios.get('http://localhost:5000/categories');
            setCategories(response.data);
        };

        getElements();
        getCategories();
    }, []);

    const findElementById = (id) => {
        return elements.find(element => element._id === id);
    };

    return (
        <div>
            <ol>
            {categories.map((category, index) => (
                <div key={category._id}>
                   <li>
                   <Link to= {`/categoryDetail?id=${category._id}`}><h3>{category.name}</h3></Link>
                   </li>
                    <ul>
                        {category.elements.map(elementId => {
                            const element = findElementById(elementId);
                            return element ? (
                                <li key={element._id}>
                                    {/* <a href={`#${element._id}`}>{element.name}</a> */}
                                    <Link to={`/elementDetail?id=${element._id}`}><p>{element.name}</p></Link>
                                </li>
                            ) : null;
                        })}
                    </ul>
                </div>
            ))}
            </ol>
        </div>
    );
}

export default ListView;
