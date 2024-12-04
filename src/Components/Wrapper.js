import React from "react";
import axios from "axios";
import '@fortawesome/fontawesome-free/css/all.min.css';
import "../App.css";

class Wrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quote: { text: "", author: "" },
            bodyColor: "aqua",
            textColor: "black",
            isTransitioning: false,
        };
    }

    componentDidMount() {
        this.fetchQuote();
    }

    fetchQuote = async () => {
        try {
            this.setState({ isTransitioning: true });
            setTimeout(async () => {
                try {
                    const response = await axios.get("https://api.quotable.io/random");
                    const { content, author } = response.data;

                    const colors = [
                        '#003366',  // Dark Blue
                        '#8B0000',  // Dark Red
                        '#006400',  // Dark Green
                        '#008B8B',  // Dark Cyan
                        '#FF8C00',  // Dark Orange
                        '#4B0082',  // Dark Purple
                        '#2F4F4F',  // Dark Grey
                        '#191970',  // Midnight Blue
                        '#483D8B',  // Dark Slate Blue
                        '#333333'   // Charcoal
                    ];

                    const randomColor = colors[Math.floor(Math.random() * colors.length)];
                    this.setState({
                        quote: { text: content, author: `-${author}` },
                        bodyColor: randomColor,
                        textColor: randomColor,
                        isTransitioning: false
                    });

                    document.body.style.backgroundColor = randomColor;
                } catch (error) {
                    console.error("Error fetching quote:", error);
                    this.setState({ isTransitioning: false });
                }
            }, 1200); // Match the duration of your fade-out and transform transitions
        } catch (error) {
            console.error("Error fetching quote:", error);
            this.setState({ isTransitioning: false });
        }
    }

    render() {
        const { quote, textColor, bodyColor, isTransitioning } = this.state;
        const { text, author } = quote;

        return (
            <div id="quote-box" className={`wrapper ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
                <h1 id="text" className='h1-1' style={{ color: textColor }}>
                    <i className='fa fa-quote-left quote-icon' />
                    {text}
                </h1>
                <p id="author" style={{ color: textColor }}>{author}</p>
                <div className='buttons'>
                    <a
                        id="tweet-quote"
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(text + " " + author)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ backgroundColor: bodyColor }}
                        aria-label="Tweet this quote"
                    >
                        <i className='fa-brands fa-twitter' />
                    </a>
                    <button
                        type="button"
                        id="new-quote"
                        onClick={this.fetchQuote}
                        style={{ backgroundColor: bodyColor }}
                        aria-label="Get a new quote"
                    >
                        New Quote
                    </button>
                </div>
            </div>
        );
    }
}

export default Wrapper;
