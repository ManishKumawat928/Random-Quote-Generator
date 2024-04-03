import React, { useState, useEffect } from "react";
import "./RandomQuote.css";
import reload_icon from "../Assets/reload.png"; // Corrected typo in image import
import twitter_icon from "../Assets/twitter.png"; // Corrected typo in image import

const RandomQuote = () => {
  const [quotes, setQuotes] = useState([]);
  const [quote, setQuote] = useState({
    text: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
  });

  useEffect(() => {
    async function loadQuotes() {
      const response = await fetch("https://type.fit/api/quotes");
      const data = await response.json();
      setQuotes(data);
    }
    loadQuotes();
  }, []); // Added empty dependency array to ensure useEffect only runs once

  const getRandomQuote = () => {
    const selectedQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(selectedQuote);
  };

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        `${quote.text} - ${quote.author.split(",")[0]}`
      )}`
    );
  };

  return (
    <div className="container">
      <div className="quote">{quote.text}</div>
      <div className="line">
        <div className="bottom">
          <div className="author"> - {quote.author.split(",")[0]}</div>
          <div className="icons">
            <img
              src={reload_icon}
              onClick={getRandomQuote}
              alt="Reload"
            />
            <img
              src={twitter_icon}
              onClick={shareOnTwitter}
              alt="Twitter"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandomQuote;
