import React, { useState, useEffect, useRef } from "react";
import { useSpeechSynthesis, useSpeechRecognition } from 'react-speech-kit';
import { FaMicrophone, FaStop, FaVolumeUp, FaVolumeMute, FaPlay } from 'react-icons/fa';

function TextToSpeech() {
    const authUser = JSON.parse(localStorage.getItem("chat-user"));

    const [text, setText] = useState("");
    const [language, setLanguage] = useState("en-US"); // Default language is English
    const [supportedVoices, setSupportedVoices] = useState([]); // Initialize with an empty array
    const { speak, cancel } = useSpeechSynthesis(); // Initialize speech synthesis hook
    const { listen, stop } = useSpeechRecognition({
        onResult: (result) => {
            setText(result);
        },
    }); // Initialize speech recognition hook

    const mediaRecorder = useRef(null);
    const recordedChunks = useRef([]);

    // Fetch supported voices
    useEffect(() => {
        let voices = [];

        const timer = setInterval(() => {
            voices = window.speechSynthesis.getVoices();

            if (voices.length) {
                setSupportedVoices(voices);
                clearInterval(timer);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Function to handle text input change
    function handleInputChange(event) {
        setText(event.target.value);
    }

    // Function to handle language change
    function handleLanguageChange(event) {
        setLanguage(event.target.value);
    }

    // Function to split text into smaller segments for speech synthesis
    function splitTextForSpeechSynthesis(text) {
        const segmentSize = 100; // Adjust segment size as needed
        const segments = [];
        for (let i = 0; i < text.length; i += segmentSize) {
            segments.push(text.substring(i, i + segmentSize));
        }
        return segments;
    }

    // Function to speak the input text
    function handleSpeak() {
        const voice = supportedVoices.find((voice) => voice.lang === language);
        const segments = splitTextForSpeechSynthesis(text);
        segments.forEach((segment) => {
            speak({ text: segment, voice });
        });
    }

    // Function to stop speech
    function handleStopSpeech() {
        cancel();
    }

    // Function to start listening for speech
    function handleListen() {
        listen();
    }

    // Function to stop listening for speech
    function handleStopListening() {
        stop();
    }

    // Function to start recording voice
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

    // Function to stop recording voice
    function handleStopRecording() {
        if (mediaRecorder.current) {
            mediaRecorder.current.stop();
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-green-400">
            <textarea
                value={text}
                onChange={handleInputChange}
                placeholder="Type something..."
                className="w-1/2 h-32 p-2 mb-4 rounded border"
            />
            <select
                onChange={handleLanguageChange}
                value={language}
                className="w-64 h-10 p-2 mb-4 rounded border"
            >
                {supportedVoices.map((voice) => (
                    <option key={voice.lang} value={voice.lang}>{voice.name} ({voice.lang})</option>
                ))}
            </select>
            <div className="flex items-center">
                <button
                    className="w-24 h-10 mr-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center justify-center"
                    onClick={handleSpeak}
                >
                    <FaVolumeUp className="mr-2" /> Speak
                </button>
                <button
                    className="w-32 h-10 mr-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center justify-center"
                    onClick={handleStopSpeech}
                >
                    <FaVolumeMute className="mr-2 w-10 h-6  mx-2" /> Stop
                </button>

                <button
                    className="w-32 h-10 mr-2 bg-green-600 text-white rounded hover:bg-green-600 flex items-center justify-center"
                    onClick={handleListen}
                >
                    <FaMicrophone className="mr- w-10 h-6" /> Start
                </button>
                <button
                    className="w-32 h-10 mr-2 bg-yellow-800 text-white rounded hover:bg-yellow-600 flex items-center justify-center"
                    onClick={handleStartRecording}
                >
                    <FaPlay className="mr-2 w-10 mx-2 text-xl" /> Start Recording
                </button>
                <button
                    className="w-32 h-10 bg-yellow-800 text-white rounded hover:bg-yellow-600 flex items-center justify-center"
                    onClick={handleStopRecording}
                >
                    <FaStop className="mr-2" /> Stop Recording
                </button>
            </div>
            <p><strong>Name:</strong> {authUser.username}</p>
        </div>
    );
}

export default TextToSpeech;
