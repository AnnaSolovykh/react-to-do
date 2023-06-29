import { useState, useEffect, useRef, useCallback } from "react";
import Clock from "../Clock/Clock";
import style from "./Home.module.css";

const Home = () => {
    const [quote, setQuote] = useState("");

    const getQuotes =  useCallback(async() => {
        const apiUrl = "https://type.fit/api/quotes";
        try {
            const response = await fetch(apiUrl);
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
    }, []);

    const isFirstRender = useRef(true);

    useEffect(()=> {
        if (isFirstRender.current) {
            getQuotes();
            isFirstRender.current = false;
        } else if (!isFirstRender.current) {
            const interval = setInterval(getQuotes, 7000);
            return () => clearInterval(interval);
        }
    }, [getQuotes]);

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
                <p className={style.text}>{quote.text}</p>
                <p className={style.author}>{quote.author}</p>     
            </div>
        </div>
    )
};

export default Home;
