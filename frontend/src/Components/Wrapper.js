import React, { useEffect, useState } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import "../App.css";
import axios from 'axios';

export function Wrapper(){
    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");
    const [bgColor, setBgColor] = useState("#282c34");
    const colors = ["#ff5733", "#33ff57", "#3357ff", "#ff33a8", "#a833ff", "#ff8c33", "#33fff3"];
    const [fade, setFade] = useState(false);

    const fetchQuote = async () => {
        setFade(true);
        setTimeout(async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/quote");
            setQuote(response.data.body);
            setAuthor(response.data.author);

            const newColor = colors[Math.floor(Math.random() * colors.length)];
            setBgColor(newColor);
            document.body.style.backgroundColor = newColor;
        }
        catch(error){
            console.error("Error fetching quote:", error);
        }
        setFade(false);
    }, 500)
    }

    useEffect(() => {
        fetchQuote();
    }, []);
    
        return (
                <div 
                    id="quote-box" 
                    className={`wrapper ${fade ? "fade-out": "fade-in"}`}
                    style={{ backgroundColor: bgColor }} 
                >
                <h1 id="text" className='h1-1'>
                    <i className='fa fa-quote-left quote-icon' />
                    <span className="quote-text">{quote}</span>
                </h1>
                <p id="author">- {author}</p>
                <div className='buttons'>
                    <a
                        id="tweet-quote"
                        href={`https://twitter.com/intent/tweet?text=${quote} - ${author}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Tweet this quote"
                        style={{ backgroundColor: bgColor }}
                    >
                        <i className='fa-brands fa-twitter' />
                    </a>
                    <button
                        type="button"
                        id="new-quote"
                        onClick={fetchQuote}
                        aria-label="Get a new quote"
                        style={{ backgroundColor: bgColor }}
                    >
                        New Quote
                    </button>
                </div>
            </div>
            
        );
    }


export default Wrapper;
