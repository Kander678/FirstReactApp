import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const StartPage = () => {
    return (
        <div>
            {/* Przykład linku do innej podstrony */}
            <Link to="/table">[1] Podstawowe dane z przynajmniej dwóch encji w formie tabel</Link>
            <br/>
            <Link to="/list">[2] Listę numerowaną zawierającą wszystkie elementy z tabeli nadrzędnej, a pod każdym z nich w zagnieżdżonej liście punktowanej odpowiadające elementy z tabeli podrzędnej</Link>
        </div>
    );
};

export default StartPage;
