import React, { useState, useEffect, useRef } from "react";
import { useSpeechSynthesis, useSpeechRecognition } from 'react-speech-kit';
import { FaMicrophone, FaStop, FaVolumeUp, FaVolumeMute, FaPlay } from 'react-icons/fa';
import Footer  from "../components/Footer";
function TextToSpeech() {
    const authUser = JSON.parse(localStorage.getItem("chat-user"));

    const [text, setText] = useState("");
    const [language, setLanguage] = useState("en-US");
    const [supportedVoices, setSupportedVoices] = useState([]);
    const { speak, cancel } = useSpeechSynthesis();
    const { listen, stop } = useSpeechRecognition({
        onResult: (result) => {
            setText(result);
        },
    });

    const mediaRecorder = useRef(null);
    const recordedChunks = useRef([]);

    useEffect(() => {
        let voices = [];

        const timer = setInterval(() => {
            voices = window.speechSynthesis.getVoices();

            if (voices.length) {
                // Filter out Bengali voices
                voices = voices.filter(voice => !voice.lang.includes("bn"));

                setSupportedVoices(voices);
                clearInterval(timer);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    function handleInputChange(event) {
        setText(event.target.value);
    }

    function handleLanguageChange(event) {
        setLanguage(event.target.value);
    }

    function splitTextForSpeechSynthesis(text) {
        const segmentSize = 100;
        const segments = [];
        for (let i = 0; i < text.length; i += segmentSize) {
            segments.push(text.substring(i, i + segmentSize));
        }
        return segments;
    }

    function handleSpeak() {
        const voice = supportedVoices.find((voice) => voice.lang === language);
        const segments = splitTextForSpeechSynthesis(text);
        segments.forEach((segment) => {
            speak({ text: segment, voice });
        });
    }

    function handleStopSpeech() {
        cancel();
    }

    function handleListen() {
        listen();
    }

    function handleStopListening() {
        stop();
    }

    function handleStartRecording() {
        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
            mediaRecorder.current = new MediaRecorder(stream);
            mediaRecorder.current.ondataavailable = (event) => {
                recordedChunks.current.push(event.data);
            };
            mediaRecorder.current.onstop = () => {
                const blob = new Blob(recordedChunks.current, { type: 'audio/wav' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = 'recorded_voice.wav';
                document.body.appendChild(a);
                a.click();
                URL.revokeObjectURL(url);
            };
            mediaRecorder.current.start();
        });
    }

    function handleStopRecording() {
        if (mediaRecorder.current) {
            mediaRecorder.current.stop();
        }
    }
    const [formData, setFormData] = useState({
        body: '',
        email: '',
        text: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const templateParams = {
            email: formData.email,
            body: formData.body,
            text: formData.text
        };


        // Send email using EmailJS
        (emailjs.sendForm('service_p8cvxoc', 'template_1ndm55o', e.target, 'zhtZB-hASpip3O568')
            .then((result) => {
                console.log(result.text);
                // You can handle success message or redirect here
            }, (error) => {
                console.log(error);
                // You can handle error message here
            }));


        // Reset form data after submission
        setFormData({
            body: '',
            email: '',
            text: ''
        });
    };
    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-300 to-green-900">
            <textarea
                value={text}
                onChange={handleInputChange}
                placeholder="Type something..."
                className="w-full md:w-1/2 h-32 p-2 mb-4 rounded border"
            />
            <select
                onChange={handleLanguageChange}
                value={language}
                className="w-full md:w-64 h-10 p-2 mb-4 rounded border"
            >
                {supportedVoices.map((voice) => (
                    <option key={voice.lang} value={voice.lang}>{voice.name} ({voice.lang})</option>
                ))}
            </select>
            <div className="flex flex-wrap items-center justify-center w-full md:w-auto">
                <button
                    className="w-full md:w-24 h-10 mr-2 mb-2 md:mb-0 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center justify-center"
                    onClick={handleSpeak}
                >
                    <FaVolumeUp className="mr-2" /> Speak
                </button>
                <button
                    className="w-full md:w-32 h-10 mr-2 mb-2 md:mb-0 bg-red-500 text-white rounded hover:bg-red-600 flex items-center justify-center"
                    onClick={handleStopSpeech}
                >
                    <FaVolumeMute className="mr-2 w-10 h-6 mx-2" /> Stop
                </button>
                <button
                    className="w-full md:w-32 h-10 mr-2 mb-2 md:mb-0 bg-green-600 text-white rounded hover:bg-green-600 flex items-center justify-center"
                    onClick={handleListen}
                >
                    <FaMicrophone className="mr- w-10 h-6" /> Start
                </button>
                <button
                    className="w-full md:w-32 h-10 mr-2 mb-2 md:mb-0 bg-yellow-800 text-white rounded hover:bg-yellow-600 flex items-center justify-center"
                    onClick={handleStartRecording}
                >
                    <FaPlay className="mr-2 w-10 mx-2 text-xl" /> Start Recording
                </button>
                <button
                    className="w-full md:w-32 h-10 bg-yellow-800 text-white rounded hover:bg-yellow-600 flex items-center justify-center"
                    onClick={handleStopRecording}
                >
                    <FaStop className="mr-2" /> Stop Recording
                </button>
            </div>
            <p><strong>Name:</strong> {authUser ? authUser.username : "Unknown User"}</p>
        </div>

       
            <Footer />
        </>
    );
}

export default TextToSpeech;
