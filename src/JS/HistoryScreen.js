import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import '../CSS/HistoryScreen.css';

function HistoryScreen({ history }) {
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 4000);
        return () => clearTimeout(timer);
    }, [history]);

    const toggleDetails = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <div className="history-container">
            <h2>Generation History</h2>
            {isLoading ? (
                <div className="spinner-container">
                    <div className="bubbles-spinner">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            ) : Array.isArray(history) && history.length === 0 ? (
                <p className='nw'>NO HISTORY AVAILABLE</p>
            ) : (
                <ul className="history-list">
                    {history.map((item, index) => (
                        <li key={index} className="history-item">
                            <button
                                onClick={() => toggleDetails(index)}
                                className="query-button"
                            >
                                Use Case Diagram & Wireframe {index + 1}
                            </button>
                            {expandedIndex === index && (
                                <div className="history-details">
                                    <div className="use-case-diagram-container diagram-container">
                                        <strong>USE CASE DIAGRAM</strong>
                                        {item.diagram ? ( <img src={item.diagram}/>
                                            ) : (
                                                <p>No diagram available.</p>
                                            )}
                                    </div>
                                    <div className="bord xml-container">
                                        <strong>XML CODE</strong>
                                        <pre>{item.xml}</pre>
                                    </div>
                                    <div className="bord html-container">
                                        <strong>HTML PREVIEW</strong>
                                        <div className="html-preview">
                                            {item.html ? parse(item.html) : <p>No HTML content available.</p>}
                                        </div>
                                    </div>
                                    <div className="timestamp">
                                        <em>Generated on: {item.timestamp}</em>
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

HistoryScreen.propTypes = {
    history: PropTypes.arrayOf(
        PropTypes.shape({
            diagram: PropTypes.string.isRequired,
            xml: PropTypes.string.isRequired,
            html: PropTypes.string,
            timestamp: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default HistoryScreen;