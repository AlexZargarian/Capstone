import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ClassDetailPage() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [recognitionStarted, setRecognitionStarted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                videoRef.current.srcObject = stream;
            })
            .catch(err => {
                console.error('Error accessing webcam:', err);
            });
    }, []);

    const captureFrame = () => {
        const context = canvasRef.current.getContext('2d');
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        return canvasRef.current.toDataURL('image/jpeg');
    };

    const startRecognition = () => {
        const frame = captureFrame();
        axios.post('http://localhost:8081/recognize-frame', { image: frame })
            .then(response => {
                setRecognitionStarted(true);
            })
            .catch(error => {
                console.error('Error recognizing face:', error);
                alert('Error recognizing face');
            });
    };

    const stopRecognition = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            videoRef.current.srcObject.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null; 
        }
        setRecognitionStarted(false);
        navigate('/results'); 
    };

    return (
        <div className="container mt-5">
            <h1>Facial Recognition</h1>
            <video ref={videoRef} width="640" height="480" autoPlay></video>
            <canvas ref={canvasRef} width="640" height="480" style={{ display: 'none' }}></canvas>
            <button onClick={startRecognition} className="btn btn-primary" disabled={recognitionStarted}>Start Facial Recognition</button>
            <button onClick={stopRecognition} className="btn btn-secondary" disabled={!recognitionStarted}>Stop Facial Recognition</button>
        </div>
    );
}

export default ClassDetailPage;
