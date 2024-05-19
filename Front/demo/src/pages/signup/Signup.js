import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import validation from "./SignupValidation";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './Signup.css';
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


function Signup() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: ""
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationCheck = validation(values)
    setErrors(validationCheck)
    if (!validationCheck.name && !validationCheck.email && !validationCheck.password) {
      axios.post('http://localhost:8081/signup', values)
        .then(res => {
          navigate('/');
        })
        .catch(err => { console.log(err) });
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <div className='container'>

        <Slider images={images} />

        <h2>Sign Up</h2>

        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <Input type='text' name='name' onChange={handleInput} />
            {errors.name && <span className='text-danger'>{errors.name}</span>}
          </div>

          <div className='mb-3'>
            <Input type='email' name='email' onChange={handleInput} />
            {errors.email && <span className='text-danger'>{errors.email}</span>}
          </div>

          <div className='mb-3'>
            <Input type='password' name='password' onChange={handleInput} />
            {errors.password && <span className='text-danger'>{errors.password}</span>}
          </div>

          <button type='submit' className='btn btn-custom w-100'>Sign Up</button>
          <p className='link-btn'>Terms and conditions</p>
          <Link to='/' className='btn btn-light w-100 link-btn'>Log In</Link>
        </form>
      </div>
    </div>
  );
}

export default Signup;
