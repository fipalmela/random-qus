import React, { useState, useEffect} from "react";
import './style.css';
import Logo from './Logo.svg';

function App() {
  const [setSelected, setSetSelected] = useState("A");
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [generatedNumbers, setGeneratedNumbers] = useState([]);

  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showGenerated, setShowGenerated] = useState(false);
  const generateRandomThreeDigitNumber = () => {
    var min = 100; // Minimum value (inclusive)
    var max = 999; // Maximum value (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setCount(generateRandomThreeDigitNumber());
        setCount2(generateRandomThreeDigitNumber());
      }, 10);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const handleStartStop = () => {
    if (setSelected) {
      setShowGenerated(false);
      setIsRunning((isRunning) => !isRunning);
      if (!isRunning) generateNumbers();
    } else {
      alert('No Category Selected')
    }
  };

  const sets = {
    "A": {
      ajza: "1 Juz (28)",
      startPage: 542,
      endPage: 561
    },
    "B1": {
      ajza: "3 Ajza (1 - 3)",
      startPage: 3,
      endPage: 61
    },
    "B2": {
      ajza: "3 Ajza (28 - 30)",
      startPage: 542,
      endPage: 604
    },
    "B2-X": {
      ajza: "3 Ajza (28 - 30)",
      startPage: 542,
      endPage: 581
    },
    "C1": {
      ajza: "6 Ajza (1 - 6)",
      startPage: 3,
      endPage: 101
    },
    "C2": {
      ajza: "6 Ajza (25 - 30)",
      startPage: 482,
      endPage: 604
    },
    "D1": {
      ajza: "15 Ajza (1 - 15)",
      startPage: 3,
      endPage: 281
    },
    "D2": {
      ajza: "15 Ajza (16 - 30)",
      startPage: 302,
      endPage: 604
    },
    "D2-X": {
      ajza: "15 Ajza (16 - 30)",
      startPage: 402,
      endPage: 604
    },
    "E": {
      ajza: "Whole Quran",
      startPage: 3,
      endPage: 604
    }
  };


  const handleSetChange = (e) => {
    setSetSelected(e.target.value);
  };

  const generateNumbers = () => {
      const { startPage, endPage } = sets[setSelected];
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

  const pairs = [];

  for (let i = 0; i < generatedNumbers.length; i += 2) {
    pairs.push([generatedNumbers[i], generatedNumbers[i + 1]]);
  }

  return (
    <>
    <div className="logo">
      <div className="div">
        <img width={200} alt="logo" src={Logo} />
      </div>
      <div className="dropdown">
        <label>
        <span>Select From:</span>
          <select className="minimal" value={setSelected} onChange={handleSetChange}>
          <option value="">-- Select Category --</option>
          <option value="A">A: 1 Juz (28)</option>
          <option value="B1">B1: 3 Ajza (1 - 3)</option>
          <option value="B2">B2: 3 Ajza (28 - 30)</option>
          <option value="B2-X">B2-X: 3 Ajza (28 - 30)</option>
          <option value="C1">C1: 6 Ajza (1 - 6)</option>
          <option value="C2">C2: 6 Ajza (25 - 30)</option>
          <option value="D1">D1: 15 Ajza (1 - 15)</option>
          <option value="D2">D2: 15 Ajza (16 - 30)</option>
          <option value="D2-X">D2-X: 15 Ajza (16 - 30)</option>
          <option value="E">E: Whole Quran</option>
          </select>
        </label>
      </div>
    </div>
    <div className="App">

      <div className="numbers-wrapper">
      <div className="number-title">Page number</div>
        {
          isRunning ? (
            <>

            <div className={`counter-wrapper ${isRunning ? '' : 'hide'}`}>
              <p className="number-display">
                {count}, {count2}
              </p>
             {/*  <p className="number-display">{count < 10 ? `0${count+2}` : count+2}</p> */}
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

      </div>
      <div className="gen-numbers-wrapper">
        <div className="gen-numbers-item">
          {
            showGenerated && (
              <>
                {
                  pairs.length !== 0 ? (
                  <>
                    {
                      pairs.map((pair, index) => (
                        <React.Fragment key={index}>
                          <span className="gen-numbers-set">{pair.join(', ')}</span>
                          {/* {index !== pairs.length - 1 ? <span> | </span> : null} */}
                        </React.Fragment>
                    ))}
                  </>
                ) : (
                  <>
                  <span className="gen-numbers-set"> No number generated yet </span>
                  </>
                )
                }
              </>
            )
          }

        </div>
        <div className="gen-numbers-btns">
          <button
            disabled={isRunning}
            className="reset"
            onClick={()=> {
            if (!isRunning) {
              setShowGenerated(!showGenerated)
            }
          }}>
            {
              showGenerated ? (
                <>
                  Hide
                </>
              ) : (
                <>
                  List
                </>
              )
            }

          </button>
          <button className="reset" onClick={resetNumbers}>Reset all</button>
        </div>
      </div>
    </div>
    </>
    );
}
export default App;
