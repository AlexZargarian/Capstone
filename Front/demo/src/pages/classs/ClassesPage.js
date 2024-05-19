import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ClassDetails.css';
import ClassCard from '../../components/classCard/classCard';

const imgPaths = ['/images/moodle1.jpg', '/images/moodle2.jpg', '/images/moodle3.jpg']

function ClassesPage() {
  const [classes, setClasses] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  useEffect(() => {
    if (email) {
      axios.get(`http://localhost:8081/getClasses?email=${encodeURIComponent(email)}`)
        .then(res => {
          let data = res.data
          data = data.map((item, i) => {
            return {
              ...item,
              img: imgPaths[i]
            }
          })

          console.log('data', data)
          setClasses(data);
        })
        .catch(err => {
          console.error("Failed to fetch classes:", err);
        });
    }
  }, [email]);

  const handleClassClick = (classTitle) => {
    navigate('/class', { state: { title: classTitle } });
  };

  if (!email) {
    return <div className="bg-primary text-white vh-100 d-flex justify-content-center align-items-center"><p>Please log in to view classes.</p></div>;
  }

  if (!classes.length) {
    return <div className="bg-primary text-white vh-100 d-flex justify-content-center align-items-center"><p>No classes available or still loading...</p></div>;
  }

  return (
    <div className="container py-5">
      <h2 className="text-dark mb-4">My Classes</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4 d-flex justify-content-between">
        {classes.map(cls => (
          <ClassCard key={cls.class_id} title={cls.title} onClick={() => handleClassClick(cls.title)} img={cls.img} />
        ))}
      </div>
    </div>
  );
}

export default ClassesPage;
