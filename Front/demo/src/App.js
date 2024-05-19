import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ResultsPage from './pages/result/ResultsPage'
import Login from './pages/login/login'
import Signup from './pages/signup/Signup'
import ClassesPage from './pages/classs/ClassesPage'
import ClassDetailPage from './pages/classs/ClassDetailPage'
import 'bootstrap/dist/js/bootstrap.bundle.min'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/classes" element={<ClassesPage />} />
        <Route path="/class" element={<ClassDetailPage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
