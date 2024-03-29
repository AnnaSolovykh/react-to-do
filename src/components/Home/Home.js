import { useState, useEffect } from "react";
import Clock from "../Clock/Clock";
import style from "./Home.module.css";

const Home = () => {
    const [quote, setQuote] = useState("");

    const getQuotes = async() => {
        let category = 'inspirational'
        const apiUrl = "https://api.api-ninjas.com/v1/quotes?category=" + category;
        const quotesApiKey = process.env.REACT_APP_QUOTES_API_KEY;

        const options = {
            method: "GET",
                headers: {
                "Content-Type": "application/json",
                'X-Api-Key': `${quotesApiKey}`,
                },
        };
        try {
            const response = await fetch(apiUrl, options);
            if (!response.ok) {
                const message = `Error: ${response.status}`;
                throw new Error(message);
            }
            const data = await response.json();
            let randomNum = Math.floor(Math.random()*data.length);
            let randomQuote = data[randomNum];
            setQuote(randomQuote);

        } catch (error) {
            console.log(error.message);
            }
    }

    useEffect(()=> {
        getQuotes();
    }, []);

    useEffect(()=> {
        const interval = setInterval(getQuotes, 7000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={style.wrapper}>       
            <div className={style.container}>
                <h1 className={style.heading}>Life is happening to you right now… </h1>
            </div>
            <div className={style.container}>
                <h2 className={style.subheading}>Don’t waste a second!</h2>
            </div>
            <Clock/>
            <div className={style.quoteWrapper}>
                <p className={style.text}>{quote.quote}</p>
                <p className={style.author}>{quote.author}</p>     
            </div>
        </div>
    )
};

export default Home;
