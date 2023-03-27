import React, { useState, useEffect} from "react";
import './style.css';
import Logo from './Logo.svg';

function App() {
  const [setSelected, setSetSelected] = useState("B1");
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [generatedNumbers, setGeneratedNumbers] = useState([]);

  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setCount((count) => (count + 1) % 100);
      }, 10);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const handleStartStop = () => {
    setIsRunning((isRunning) => !isRunning);
    if (!isRunning) generateNumbers();
  };
/*
  const sets = {
    "Set 1": {
      min: 542,
      max: 604,
    },
    "Set 2": {
      min: 482,
      max: 604,
    },
    "Set 3": {
      min: 302,
      max: 604,
    },
    "Set 4": {
      min: 3,
      max: 604,
    },
  }; */

  const sets = {
    "B1" : {
      ajza: "3 Ajza (Juz 1 to 3)",
      startPage: 3,
      endPage: 61
    },
    "B2" : {
      ajza: "3 Ajza (Juz 28 to 30)",
      startPage: 542,
      endPage: 604
    },
    "C1" : {
      ajza: "6 Ajza (Juz 1 to 6)",
      startPage: 3,
      endPage: 101
    },
    "C2" : {
      ajza: "6 Ajza (Juz 25 to 30)",
      startPage: 482,
      endPage: 604
    },
    "D1" : {
      ajza: "15 Ajza (Juz 1 to 15)",
      startPage: 3,
      endPage: 281
    },
    "D2" : {
      ajza: "15 Ajza (Juz 16 to 30)",
      startPage: 302,
      endPage: 604
    },
    "E" : {
      ajza: "Complete Quran",
      startPage: 3,
      endPage: 604
    }
  };


  const handleSetChange = (e) => {
    setSetSelected(e.target.value);
  };

  const generateNumbers = () => {
    const { startPage, endPage } = sets[setSelected];
    // const range = max - min + 1;
    const numbersArray = [];
    for (let i = parseInt(startPage); i <= parseInt(endPage); i++) {
      numbersArray.push(i);
    }
    const filteredNumbers = numbersArray.filter(
      (number) => !generatedNumbers.includes(number)
    );
    if (filteredNumbers.length < 2) {
      alert("Number not available.");
      return;
    }
    const randomIndex1 = Math.floor(Math.random() * filteredNumbers.length);
    let numOne = filteredNumbers[randomIndex1];
    let filteredNumbers2 = filteredNumbers.filter(
      (number) => number !== numOne
    );
    const randomIndex2 = Math.floor(Math.random() * filteredNumbers2.length);
    let numTwo = filteredNumbers2[randomIndex2];
    setNum1(numOne);
    setNum2(numTwo);
    const updatedGeneratedNumbers = [...generatedNumbers, numOne, numTwo];
    localStorage.setItem("generatedNumbers", JSON.stringify(updatedGeneratedNumbers));
    setGeneratedNumbers(updatedGeneratedNumbers);
  };

  const resetNumbers = () => {
    localStorage.removeItem("generatedNumbers");
    setGeneratedNumbers([]);
    setNum1("");
    setNum2("");
  };

  // check if generated numbers already exist in local storage on mount
  React.useEffect(() => {
    const storedGeneratedNumbers = localStorage.getItem("generatedNumbers");
    if (storedGeneratedNumbers) {
      setGeneratedNumbers(JSON.parse(storedGeneratedNumbers));
    }
  }, []);


  return (
    <>
    <div className="logo">
      <div className="div">
        <img width={200} alt="logo" src={Logo} />
      </div>
      <div className="dropdown">
        <label>
        <span>Select from:</span>
          <select className="minimal" value={setSelected} onChange={handleSetChange}>
            <option value="B1">B1: {sets.B1.ajza}</option>
            <option value="B2">B2: {sets.B2.ajza} </option>
            <option value="C1">C1: {sets.C1.ajza} </option>
            <option value="C2">C2: {sets.C2.ajza} </option>
            <option value="D1">D1: {sets.D1.ajza} </option>
            <option value="D2">D2: {sets.D2.ajza} </option>
            <option value="E">E: {sets.E.ajza} </option>
          </select>
        </label>
      </div>
    </div>
    <div className="App">

      <div className="numbers-wrapper">
        {
          isRunning ? (
            <>
            <div className={`counter-wrapper ${isRunning ? '' : 'hide'}`}>
              <p className="number-display">{count < 10 ? `0${count}` : count},</p>
              <p className="number-display">{count < 10 ? `0${count+2}` : count+2}</p>
            </div>
            </>
          ) : (
            <>
            <div className={`counter-wrapper ${isRunning ? 'hide' : ''}`}>
              <p className="number-display"> {num1 ? (<>{num1},</>) : (<>00,</>) } </p>
              <p className="number-display"> {num2 ? (<>{num2}</>) : (<>00</>) } </p>
            </div>
            </>
          )
        }
      </div>

      <div className="button-wrapper">
        <button
          onClick={handleStartStop}
          className="button-82-pushable">
          <span className="button-82-shadow"></span>
          <span className="button-82-edge"></span>
          <span className="button-82-front text">
            {isRunning ? 'Stop' : 'Start'}
          </span>
        </button>
        <br /><br />
        <button className="reset" onClick={resetNumbers}>Reset all</button>
      </div>
    </div>
    </>
    );
}
export default App;
