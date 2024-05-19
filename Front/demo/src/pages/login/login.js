import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import validation from "./LoginValidation";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './login.css';
import Slider from "../../components/slider/Slider";
import Input from "../../components/inputField/Input";

const images = [
  {
    imgPath:
      '/images/004-Copy.jpg',
  },
  {
    imgPath:
      '/images/AUA-Campus.jpg',
  },
  {
    imgPath:
      '/images/EPIC.jpg',
  },
]

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInput = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = validation(values);
    setErrors(newErrors);

    if (!newErrors.email && !newErrors.password) {
      axios.post('http://localhost:8081/login', values)
        .then(res => {
          if (res.status === 200) {
            navigate('/classes', { state: { email: values.email } });
          } else {
            alert("Login failed: " + res.statusText);
          }
        })
        .catch(error => {
          alert("Login error: " + (error.response ? error.response.data.message : "Unknown error"));
        });
    } else {
      console.log("Validation errors:", newErrors);
    }
  };


  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <div className='container'>
        <Slider images={images} />
        <div className='container bg-white p-3 rounded'>
          <h2>Log in</h2>
          <form onSubmit={handleSubmit} noValidate>

            <div className='mb-3'>
              <Input type='email' name='email' onChange={handleInput} />
              {errors.email && <span className='text-danger'>{errors.email}</span>}
            </div>

            <div className='mb-3'>
              <Input type='password' name='password' onChange={handleInput} />
              {errors.password && <span className='text-danger'>{errors.password}</span>}
            </div>

            <button type='submit' className='btn btn-custom w-100'>Log in</button>

            <p className='link-btn'>Terms and conditions</p>

            <Link to='/signup' className='btn btn-light w-100 link-btn'>Create Account</Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
