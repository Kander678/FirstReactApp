import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Start from './components/StartView';
import Table from './components/TableView';
import List from './components/ListView';
import CategoryDetails from './components/CategoryDetailsView';
import ElementDetails from './components/ElementDetailsView';
import CategoryEdit from './components/CategoryEditView';
import ElementEdit from './components/ElementEditView';
import CategoryAdd from './components/CategoryAddView';
import ElementAdd from './components/ElementAddView'


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> {/* Nowa składnia element */}
        <Route path="/start" element={<Start />} />
        <Route path="/table" element={<Table />} />
        <Route path="/list" element={<List />} />
        <Route path="/categoryDetail" element={<CategoryDetails />} />
        <Route path="/elementDetail" element={<ElementDetails />} />
        <Route path="/categoryEdit" element={<CategoryEdit />} />
        <Route path="/elementEdit" element={<ElementEdit />} />
        <Route path="/categoryAdd" element={<CategoryAdd/>}/>
        <Route path="/elementAdd" element={<ElementAdd/>}/>
      </Routes>
    </Router>
  );
};

export default App;
