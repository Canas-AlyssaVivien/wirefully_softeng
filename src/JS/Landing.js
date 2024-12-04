import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Landing.css';
import logo from '../CSS/1.png';
import wait from '../CSS/wait.gif';
import create from '../CSS/create.gif';
import done from '../CSS/done.gif';


const Landing = () => {
    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate();

    const handleStartNowClick = () => {
        navigate('/signup');
    };

    const handleLogInClick = () => {
        navigate('/login');
    };

    document.addEventListener("scroll", function () {
        const contentBox = document.querySelector('.content-box');
        const sectionTop = contentBox.getBoundingClientRect().top;
        const sectionBottom = contentBox.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;
    
        if (sectionTop < windowHeight * 0.8 && sectionBottom > windowHeight * 0.2) {
            contentBox.classList.add('visible');
        } else {
            contentBox.classList.remove('visible');
        }
    });    

    return (
        <div className='landing'>
            <div className="NavBar">
                <div className="NavBar-left">
                    <img src={logo} className="App-logo" alt="logo" />
                </div>
                <div className='Navbar-right'>
                    <button className='type-two' onClick={handleLogInClick}>Log In</button>
                </div>
            </div>
            <div className='rectangle'>

                {/*<div className='right-column'>
                    <p className='tag' >
                        {isLogin ? 'Log in to your account' : 'Create your account'}
                    </p>
                    {isLogin ? (
                        <Login toggleForm={() => setIsLogin(false)} />
                    ) : (
                        <Signup toggleForm={() => setIsLogin(true)} />
                    )}
                    <p className='tag-bottom' >
                        {isLogin ? 'Don’t have an account? ' : 'Already have an account? '}
                        <a href="#" onClick={() => setIsLogin(!isLogin)}>
                            {isLogin ? 'Sign up' : 'Log in'}
                        </a>
                    </p>
                </div>*/}

                <section className='hero-section'>
                    <div className='left-column'>
                        <h1>
                            <span className='wire'>Wire</span>
                            <span className='fully'>Fully</span>
                        </h1>
                        <p>
                            From Use Case to Wireframe in Minutes – Simplify Your App Design Journey with WireFully!
                        </p>
                        <button className='start-button' onClick={handleStartNowClick}>Start Now</button>
                    </div>
                </section>

                <section className="about-section">
                    <div className="content-box">
                    <h2>Your <span class="highlight">Wireframe</span> Journey Starts Here!</h2>
                    <p>
                        Ready to turn your big ideas into sleek, professional app designs? With WireFully, creating your app’s blueprint is as easy as a few clicks.  
                        Whether you're a first-time creator or a seasoned pro, our magical tools transform your use case diagrams into wireframes and XML code—quickly and effortlessly!  
                    </p>
                    </div>
                </section>

                <section className='how-it-works-section'>
                    <h2>How It Works</h2>
                    <div className='cards'>
                        <div className='card'>
                            <h3>Design Your Use Case Diagram</h3>
                            <p>Create your use case diagram with our simple, intuitive tool—no complexity, just creativity!</p>
                            <div class="emoticon-container">
                                <img src={create} alt="Cute Animated Emoticon" className="emoticon" />
                            </div>
                        </div>
                        <div className='card'>
                            <h3>Transform It into a Wireframe</h3>
                            <p>Instantly turn your diagram into a sleek wireframe for your phone application.</p>
                            <div class="emoticon-container">
                                <img src={wait} alt="Cute Animated Emoticon" className="emoticonn" />
                            </div>
                        </div>
                        <div className='card'>
                            <h3>Export and Go</h3>
                            <p>Export your use case diagram and wireframe, and copy the XML code to integrate into your project—quick and easy!</p>
                            <div class="emoticon-container">
                                <img src={done} alt="Cute Animated Emoticon" className="emoticon" />
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
};

export default Landing;
