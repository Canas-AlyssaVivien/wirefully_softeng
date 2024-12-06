import React, { useState, useRef } from 'react';
import logo from '../CSS/1.png';
import '../CSS/Dashboard.css';
import DiagramEditor from './DiagramEditor';
import parse from 'html-react-parser';
import html2canvas from 'html2canvas';
import HistoryScreen from './HistoryScreen';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

import left from '../CSS/left.png';
import right from '../CSS/right.png';
import bleft from '../CSS/bleft.png';

import { gsap } from 'gsap';

function Dashboard() {
    const [errorMessage, setErrorMessage] = useState('');
    const [xmlResponse, setXmlResponse] = useState(null);
    const [htmlPreview, setHtmlPreview] = useState(null);
    const [isHistoryVisible, setIsHistoryVisible] = useState(false);
    const [isGuideVisible, setIsGuideVisible] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [history, setHistory] = useState([]);
    const htmlPreviewRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);

    const [showXML, setShowXML] = useState(false);
    const { token, logout} = useAuth();
    const navigate = useNavigate();

    const logoRef = useRef(null);
    const spanRef = useRef(null);
    const backRef = useRef(null);

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    const handleGenerate = async (diagramData) => {
        setIsLoading(true);
        try {
            const response = await fetch("http://localhost:8000/generate-content", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ diagram: diagramData }),
            });

            console.log(diagramData);
    
            if (response.ok) {
                const jsonResponse = await response.json();

                const diagramElement = document.getElementById('maonajudniboss'); 
                const diagramCanvas = diagramElement ? await html2canvas(diagramElement) : null;
                const diagramImage = diagramCanvas ? diagramCanvas.toDataURL('image/png') : null;

                const newHistoryItem = {
                    diagram: diagramImage,
                    xml: jsonResponse.xmlContent,
                    html: jsonResponse.htmlContent,
                    timestamp: new Date().toLocaleString(),  
                };
    
                await fetch("http://localhost:8000/save-history", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,  
                    },
                    body: JSON.stringify(newHistoryItem),
                });
    
                setXmlResponse(jsonResponse.xmlContent);
                setHtmlPreview(jsonResponse.htmlContent);  
            } else {
                setErrorMessage(`Error: ${response.status} ${response.statusText}`);
            }
        } catch (error) {
            setErrorMessage(`Error during API request: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };
    
    const fetchHistory = async () => {
        try {
            const response = await fetch("http://localhost:8000/get-history", {
                headers: {
                    "Authorization": `Bearer ${token}`,  
                },
            });
            if (response.ok) {
                const historyData = await response.json();
                console.log('Fetched History Data:', historyData); 
                setHistory(historyData);
            } else {
                setErrorMessage(`Error fetching history: ${response.status} ${response.statusText}`);
            }
        } catch (error) {
            setErrorMessage(`Error during API request: ${error.message}`);
        }
    };

    const handleBackClick = async () => {
        setIsHistoryVisible(!isHistoryVisible);
        gsap.to(logoRef.current, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' });
        gsap.to(spanRef.current, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' });
        gsap.to(backRef.current, { y: 50, opacity: 0, duration: 0.5, ease: 'power3.out' });
    };

    const toggleHistory = () => {
        setIsHistoryVisible(!isHistoryVisible);

        /*if (!isHistoryVisible) {
            fetchHistory(); 
        }*/

        if (!isHistoryVisible) {
            gsap.to(logoRef.current, { y: -50, opacity: 0, duration: 1, ease: 'power3.out' });
            gsap.to(spanRef.current, { y: -50, opacity: 0, duration: 1, ease: 'power3.out' });
            gsap.fromTo(
                backRef.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
            );
            fetchHistory();
        } else {
            gsap.to(logoRef.current, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' });
            gsap.to(spanRef.current, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' });
            gsap.to(backRef.current, { y: 50, opacity: 0, duration: 0.5, ease: 'power3.out' });
        }
    };

    const exportAsImage = async () => {
        const htmlPreviewCanvas = htmlPreviewRef.current 
            ? await html2canvas(htmlPreviewRef.current) 
            : null;
    
        const diagramElement = document.getElementById('maonajudniboss'); 
        const diagramCanvas = diagramElement 
            ? await html2canvas(diagramElement) 
            : null;
    
        if (htmlPreviewCanvas && diagramCanvas) {
            
            const maxHeight = Math.max(htmlPreviewCanvas.height, diagramCanvas.height);
            const combinedWidth = htmlPreviewCanvas.width + diagramCanvas.width + 20; // Add padding between the images
    
            
            const canvasSize = Math.max(maxHeight, combinedWidth); // Make it a big square
            const combinedCanvas = document.createElement('canvas');
            const context = combinedCanvas.getContext('2d');
    
            // Set the canvas size to the square size
            combinedCanvas.width = canvasSize;
            combinedCanvas.height = canvasSize;
    
            // Fill the background with a white color (optional)
            context.fillStyle = "#ffffff"; // White background
            context.fillRect(0, 0, combinedCanvas.width, combinedCanvas.height);
    
            // Draw the HTML preview (wireframe) on the left side
            const wireframeX = (canvasSize - combinedWidth) / 2; // Center horizontally
            const wireframeY = (canvasSize - htmlPreviewCanvas.height) / 2; // Center vertically
            context.drawImage(htmlPreviewCanvas, wireframeX, wireframeY, htmlPreviewCanvas.width, htmlPreviewCanvas.height);
    
            // Draw the diagram on the right side, with padding in between
            const diagramX = wireframeX + htmlPreviewCanvas.width + 50; // Add 20px padding between the images
            const diagramY = (canvasSize - diagramCanvas.height) / 2; // Center vertically
            context.drawImage(diagramCanvas, diagramX, diagramY, diagramCanvas.width, diagramCanvas.height);
    
            const combinedImage = combinedCanvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = combinedImage;
            link.download = 'UCDiagram&Wireframe.png';
            link.click();
        } else {
            console.error('Error capturing one or both images');
        }
    };

    const toggleView = () => {
        setShowXML(!showXML);
    };

    const steps = [
        {
            title: "Welcome to Wirefully!",
            content: "Follow these guidelines to transform your use case diagrams to phone wireframes!",
        },
        {
            title: "Design Your Use Case Diagram",
            content: "Enter the system name then add and modify use case notations in the editor. Be as specific as possible!",
        },
        {
            title: "Naming the Use Case Diagram Notations",
            content: "To name the use case diagram notations, double click.",
        },
        {
            title: "Selecting the Use Case Diagram Notations",
            content: "When the actor notation is selected, it turns red. On the other hand, the use case notation will be outlined.",
        },
        {
            title: "Connecting Use Case Diagram Notations",
            content: "Select two notations to connect using association and broken lines.",
        },
        {
            title: "Deleting Use Case Diagram Notations",
            content: "Select a use case diagram notation then click 'Delete'.",
        },
        {
            title: "Generate the Wireframe",
            content: "Click the 'Generate' button and watch your wireframe come to life.",
        },
        {
            title: "Toggle Views",
            content: "Use the 'XML' button to switch between wireframe and XML views.",
        },
        {
            title: "Export Your Work",
            content: "Save your wireframe with the use case diagram as an image by clicking the 'Export' button.",
        },
        {
            title: "You're All Set!",
            content: "Enjoy using the wireframe generator. If you need help, click 'Guide' anytime!",
        },
    ];

    const toggleGuide = () => {
        setIsGuideVisible(!isGuideVisible);
        setCurrentStep(0);
    };

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            toggleGuide();
        }
    };

    const previousStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };
    
    const closeGuide = () => {
        setIsGuideVisible(false);
    };


    return (
        <div className='Whole-Page'>
            <div className="User-NavBar">
                <div className="NavBar-left">
                    <button ref={backRef} className='Dashboard-Back-container'  onClick={handleBackClick}>
                        <img src={bleft} />
                        <button type="button" className="Dashboard-Back-button">
                            Back
                        </button>
                    </button>
                    <img ref={logoRef} src={logo} className="App-logo" alt="logo" />
                    <span ref={spanRef} className='Navbar-textt'>Hi, welcome back!</span>
                </div>
                <div className='Navbar-right'>
                    <button onClick={toggleHistory} className='Navbar-text'>History</button>
                    <button onClick={toggleGuide} className='Navbar-text'>Guide</button>
                    <button onClick={handleLogout} className='Navbar-text'>Log Out</button>
                </div>
            </div>

            {isGuideVisible && (
                <div className={`overlay show`}>
                    <div className="overlay-content">
                        <div className='close-button-container'>
                            <button onClick={closeGuide} className="close-button">✖</button>
                        </div>

                        <div className='instructions-container'>
                            <h2>{steps[currentStep].title}</h2>
                            <p>{steps[currentStep].content}</p>
                        </div>
                        
                        <div className="guide-buttons-container">
                            {currentStep > 0 && (
                                <button
                                    onClick={previousStep}
                                    className="previous-button"
                                >
                                    <img src={left} alt="Previous" />
                                </button>
                            )}
                            {currentStep < steps.length - 1 && (
                                <button
                                    onClick={nextStep}
                                    className="next-button"
                                    aria-label="Next"
                                >
                                    <img src={right} alt="Previous" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}  
            
            {isHistoryVisible ? (
                <HistoryScreen history={history} />
            ) : (
                
            <div className='Display-Main'>
                <div className='column1'>
                    <div className='query-input'>
                        <DiagramEditor onGenerate={handleGenerate} />
                        {errorMessage && <p className='error-message'>{errorMessage}</p>}
                    </div>
                </div>
                <div className='column2'>
                    <div className='inside-column2'>
                    <h3>Output:</h3>
                        <div className="output-box">
                        {isLoading ? (
                               <div className="horizontal-spinner-container">
                               <div className="loadd">
                                    <div id="first">
                                        <div id="second">
                                            <div id="third">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            ) : showXML ? (
                                <pre className="xml-content">
                                    {xmlResponse ? xmlResponse : 'No XML generated yet.'}
                                </pre>
                            ) : (
                                <div className="html-preview-content" ref={htmlPreviewRef}>
                                    {htmlPreview ? parse(htmlPreview) : 'Create your own use case diagram'}
                                </div>
                            )}
                        </div>

                        <div className='buttons'>
                            <button onClick={toggleView} className="xml-button">
                                {showXML ? 'Wireframe' : 'XML'}
                            </button>

                            {!showXML && (
                                <button onClick={exportAsImage} className="export-button">
                                    Export
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )}
        </div>
    );
}

export default Dashboard;



