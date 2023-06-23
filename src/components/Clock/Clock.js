import { useEffect, useState } from "react";
import style from "./Clock.module.css";

const Clock = () => {
  const [time, setTime] = useState({
    minutes: new Date().getMinutes(),
    hours: new Date().getHours(),
    seconds: new Date().getSeconds()
  })

    const indicateTime = () => {
      const date = new Date();
        setTime({
          minutes: date.getMinutes(),
          hours: date.getHours(),
          seconds: date.getSeconds()
        })
    }

    useEffect(()=> {
        const timer = setInterval(indicateTime, 1000);
        return function cleanup() {
            clearInterval(timer);
        };
    },[])

    const convertToTwoDigit = (number) => {
      return number.toLocaleString('en-US', {
        minimumIntegerDigits: 2
      })
    }
  
    return (
      <div className={style.container}>
        <span className={style.clock}>{convertToTwoDigit(time.hours)}</span>
        <span className={style.span}>:</span>
        <span className={style.clock}>{convertToTwoDigit(time.minutes)}</span>
        <span className={style.span}>:</span>
        <span className={style.clock}>{convertToTwoDigit(time.seconds)}</span>
      </div>
    );
  
}

export default Clock;