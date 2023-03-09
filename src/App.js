import React, { useState, useEffect } from "react";

function RandomQuote() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [authorQuotes, setAuthorQuotes] = useState([]);

  const fetchAuthorQuotes = async (authorSlug) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.quotable.io/quotes?author=${authorSlug}`
      );
      const data = await response.json();
      const authorQuotes = data.results.map((quote) => quote.content);
      setAuthorQuotes(authorQuotes);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRandomQuote = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api.quotable.io/random");
      const data = await response.json();
      setQuote({
        content: data.content,
        author: data.author,
        authorSlug: data.authorSlug,
        tags: data.tags,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const handleRandomQuoteClick = () => {
    fetchRandomQuote();
    window.location.reload();
  }
  useEffect(() => {
    fetchRandomQuote();
  }, []);
  
  const handleAuthorClick = async (authorSlug) => {
    await fetchAuthorQuotes(authorSlug);
  };

  return (
    <div className="center-container">
      <div className="quote-container">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <p className="quote-content">{quote?.content}</p>
            <p className="quote-author">
              By{" "}
              <a
                href="#"
                onClick={() => handleAuthorClick(quote?.authorSlug)}
              >
                {quote?.author}
              </a>
            </p>
            {quote?.tags && (
              <p className="tags">in {quote.tags.join(", ")}</p>
            )}
          </>
        )}
      </div>

      <div className="author-quotes">
        {authorQuotes.length > 0 && (
          <>
            <p>All quotes by {quote?.author}</p>
            <ul>
              {authorQuotes.map((quote, index) => (
                <li key={index}>{quote}</li>
              ))}
            </ul>
          </>
        )}
      </div>

      <button
        className="random-btn"
        onClick={handleRandomQuoteClick}
        disabled={loading}
      >
        {loading ? "Loading..." : "Random Quote"}
      </button>
    </div>
  );
}

export default RandomQuote;
