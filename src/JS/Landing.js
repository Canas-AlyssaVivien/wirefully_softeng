import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Landing.css';
import logo from '../CSS/1bla.png';
import wait from '../CSS/wait.gif';
import create from '../CSS/create.gif';
import done from '../CSS/done.gif';
import land from '../CSS/land.png';

import { gsap } from 'gsap';
import SplitType from 'split-type';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Landing = () => {
    const navigate = useNavigate();

    const handleStartNowClick = () => {
        navigate('/signup');
    };

    const handleLogInClick = () => {
        navigate('/login');
    };

    useEffect(() => {
        const splitText = new SplitType('#heading', { types: 'words, chars' });

        gsap.set('.hero-paragraph', { opacity: 0, y: 50 });
        gsap.set('.start-button', { opacity: 0, y: 50});
        gsap.set('.how-h2', { opacity: 0, y: 50 });

        const timeline = gsap.timeline();

        timeline.from(splitText.chars, {
            opacity: 0,
            y: 50,
            stagger: 0.1,
            duration: 1.5,
            ease: 'power3.out',
        });

        timeline.to('.hero-paragraph', {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: 'power3.out',
        });

        timeline.to('.start-button', {
            scale: 1,     
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power3.out',
        }, "-=1.5");

        gsap.set('.cards .card', { opacity: 0, y: 50 });
        
        gsap.to('.cards .card', {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.how-it-works-section',
                start: 'top 80%',
                end: 'bottom 20%',
                scrub: true,
                toggleActions: 'play none none reverse',
            },
        });

        gsap.to('.how-h2', {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.how-it-works-section',
                start: 'top 70%',                
                end: 'bottom 30%',           
                scrub: true,
                toggleActions: 'play none none reverse',
            },
        });

        ScrollTrigger.create({
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            onUpdate: (self) => {
                const progress = self.progress;
                const navbar = document.querySelector('.NavBar');
                if (navbar) {
                    navbar.style.backgroundColor = `rgba(255, 255, 255, ${progress})`;
                    navbar.style.boxShadow = progress > 0 ? '0 2px 5px rgba(0, 0, 0, 0.1)' : 'none';
                }
            },
        });        

        const handleScroll = () => {
            const contentBox = document.querySelector('.content-box');
            const sectionTop = contentBox.getBoundingClientRect().top;
            const sectionBottom = contentBox.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;

            if (sectionTop < windowHeight * 0.8 && sectionBottom > windowHeight * 0.2) {
                contentBox.classList.add('visible');
            } else {
                contentBox.classList.remove('visible');
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            splitText.revert();
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

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

                <section className='hero-section'>
                    <div className='left-column'>
                        <h1 id='heading'>
                            <span className='wire'>Wire</span>
                            <span className='fully'>Fully</span>
                        </h1>

                        <p className='hero-paragraph'>
                            From Use Case to Wireframe in Minutes – Simplify Your App Design Journey with WireFully!
                        </p>
                        <button className='start-button' onClick={handleStartNowClick}>Start Now</button>
                    </div>
                </section>

                <section className="about-section">
                    <div className="content-box">
                        <h2>Your <span className="highlight">Wireframe</span> Journey Starts Here!</h2>
                        <p>
                            Ready to turn your big ideas into sleek, professional app designs? With WireFully, creating your app’s blueprint is as easy as a few clicks.  
                            Whether you're a first-time creator or a seasoned pro, our magical tools transform your use case diagrams into wireframes and XML code—quickly and effortlessly!  
                        </p>
                        <div className="emoticon-container">
                            <img src={land} alt="Cute Animated Emoticon" className='aboutpic' />
                        </div>
                    </div>
                </section>

                <section className='how-it-works-section'>
                    <h2 className='how-h2'><span className='white-hightlight'>It's simple!</span> Follow these 3 fun steps and let’s get your app rolling!</h2>
                    <div className='cards'>
                        <div className='card'>
                            <h3>Design Your Use Case Diagram</h3>
                            <p>Create your use case diagram with our simple, intuitive tool—no complexity, just creativity!</p>
                            <div className="emoticon-container">
                                <img src={create} alt="Cute Animated Emoticon" className="emoticon" />
                            </div>
                        </div>
                        <div className='card'>
                            <h3>Transform It into a Wireframe</h3>
                            <p>Instantly turn your diagram into a sleek wireframe for your phone application.</p>
                            <div className="emoticon-container">
                                <img src={wait} alt="Cute Animated Emoticon" className="emoticonn" />
                            </div>
                        </div>
                        <div className='card'>
                            <h3>Export and Go</h3>
                            <p>Export your use case diagram and wireframe, and copy the XML code to integrate into your project—quick and easy!</p>
                            <div className="emoticon-container">
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