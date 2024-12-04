import React, { useState } from 'react';
import Signup from './Signup';
import Login from './Login';
import '../CSS/Landing.css';
import logo from '../CSS/1.png';


const Landing = () => {
    const [isLogin, setIsLogin] = useState(false);

    document.addEventListener("DOMContentLoaded", function () {
        const sections = document.querySelectorAll('section'); // All sections you want to track
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const rect = entry.target.getBoundingClientRect();
                    const windowHeight = window.innerHeight;
    
                    // Calculate the percentage of the section that's visible
                    const visiblePercentage = Math.min(1, Math.max(0, (rect.top / windowHeight) + 1));
    
                    // Update the opacity based on the visible percentage
                    entry.target.style.opacity = visiblePercentage;
    
                    // Add the 'visible' class once the section is fully in view (opacity = 1)
                    if (visiblePercentage === 1) {
                        entry.target.classList.add('visible');
                    } else {
                        entry.target.classList.remove('visible');
                    }
                }
            });
        }, {
            threshold: [0, 0.1, 0.5, 1] // Adjust threshold for when sections should trigger opacity changes
        });
    
        // Observe each section
        sections.forEach(section => observer.observe(section));
    });
    

    return (
        <div className='landing'>
            <div className="NavBar">
                <div className="NavBar-left">
                    <img src={logo} className="App-logo" alt="logo" />
                </div>
                <div className='Navbar-right'>
                    <button className='type-one'>About</button>
                    <button className='type-one'>How It Works</button>
                    <button className='type-one'>About Us</button>
                    <button className='type-two'>Log In</button>
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
                        <button className='start-button'>Start Now</button>
                    </div>
                </section>

                <section className='about-section'>
                    <h2>Your Wireframe Journey Starts Here</h2>
                    <p>
                    From concept to creation, WireFully helps you streamline your app design process with ease.
                    Whether you're building your first app or refining an existing one, we transform your use case
                    diagrams into professional-grade wireframes and XML code, fast. Our web application focuses on
                    phone applications, enabling developers and designers to work smarter and faster—so you can focus on what truly matters: building the perfect user experience.
                    </p>
                </section>

                <section className='how-it-works-section'>
                    <h2>How It Works</h2>
                    <div className='cards'>
                        <div className='card'>
                            <h3>Design Your Use Case Diagram</h3>
                            <p>Create your use case diagram with our simple, intuitive tool—no complexity, just creativity!</p>
                        </div>
                        <div className='card'>
                            <h3>Transform It into a Wireframe</h3>
                            <p>Instantly turn your diagram into a sleek wireframe for your phone application.</p>
                        </div>
                        <div className='card'>
                            <h3>Export and Go</h3>
                            <p>Export your use case diagram and wireframe, and copy the XML code to integrate into your project—quick and easy!</p>
                        </div>
                    </div>
                </section>

                <section className='about-us-section'>
                    <h2>About Us</h2>
                    <p>
                        We are a team of passionate computer science developers dedicated to simplifying the app 
                        design process. With WireFully, we aim to bridge the gap between designers and developers, 
                        making app creation efficient and accessible for everyone.
                    </p>
                    <div className='team'>
                        <div className='developer-card'>
                            <img src='developer1.jpg' alt='Developer 1' className='developer-img'/>
                            <h3>Developer 1</h3>
                            <p>Passionate about code and design, Developer 1 is the mind behind the wireframing magic.</p>
                        </div>
                        <div className='developer-card'>
                            <img src='developer2.jpg' alt='Developer 2' className='developer-img'/>
                            <h3>Developer 2</h3>
                            <p>Focused on making complex concepts simple, Developer 2 ensures seamless app functionality.</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Landing;
