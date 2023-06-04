import React, { useState, useEffect } from "react";
import "./style.css";
import Logo from "./logo.svg";

const randomThreeDigitNumber = () => {
  const min = 100; // Minimum value (inclusive)
  const max = 999; // Maximum value (inclusive)
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Available sets/categories with their corresponding start and end page numbers
const sets = {
  "A28": {
    ajza: "1 Juz (28)",
    startPage: 542,
    endPage: 561
  },
  "A29": {
    ajza: "1 Juz (29)",
    startPage: 562,
    endPage: 581
  },
  "A30": {
    ajza: "1 Juz (30)",
    startPage: 582,
    endPage: 604
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
  "E": {
    ajza: "Whole Quran",
    startPage: 3,
    endPage: 604
  }
};
const App = () => {
  const [setSelected, setSetSelected] = useState("A28");
  const [pageNum1, setPageNum1] = useState("");
  const [pageNum2, setPageNum2] = useState("");
  const [animatedCounter1, setAnimatedCounter1] = useState(0);
  const [animatedCounter2, setAnimatedCounter2] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [generatedPageNumbers, setgeneratedPageNumbers] = useState([]);
  const [showGenerated, setShowGenerated] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setAnimatedCounter1(randomThreeDigitNumber());
        setAnimatedCounter2(randomThreeDigitNumber());
      }, 10);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const handleStartStop = () => {
    if (!setSelected) {
      alert("No Category Selected");
      return;
    }
    setShowGenerated(false);
    setIsRunning(!isRunning);
    if (!isRunning) {
      generatePageNumbers();
    }
  };

  const handleSetChange = (e) => {
    setSetSelected(e.target.value);
  };

  const generatePageNumbers = () => {
    const { startPage, endPage } = sets[setSelected];
    const numbersArray = Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );

    const filteredPageNumbers = numbersArray.filter(
      (number) => !generatedPageNumbers.includes(number)
    );

    const middleIndex = Math.floor(filteredPageNumbers.length / 2);

    if (middleIndex < 1) {
      alert("Number not available.");
      return;
    }

    const [firstHalf, secondHalf] = [
      filteredPageNumbers.slice(0, middleIndex),
      filteredPageNumbers.slice(middleIndex),
    ];

    const pageNumOne =
      firstHalf[Math.floor(Math.random() * firstHalf.length)];
    const pageNumTwo =
      secondHalf[Math.floor(Math.random() * secondHalf.length)];

    setPageNum1(pageNumOne);
    setPageNum2(pageNumTwo);

    const updatedgeneratedPageNumbers = [
      ...generatedPageNumbers,
      pageNumOne,
      pageNumTwo,
    ];
    localStorage.setItem(
      "generatedPageNumbers",
      JSON.stringify(updatedgeneratedPageNumbers)
    );
    setgeneratedPageNumbers(updatedgeneratedPageNumbers);
  };

  const resetPageNumbers = () => {
    localStorage.removeItem("generatedPageNumbers");
    setgeneratedPageNumbers([]);
    setPageNum1("");
    setPageNum2("");
  };

  useEffect(() => {
    const storedgeneratedPageNumbers = localStorage.getItem(
      "generatedPageNumbers"
    );
    if (storedgeneratedPageNumbers) {
      setgeneratedPageNumbers(
        JSON.parse(storedgeneratedPageNumbers)
      );
    }
  }, []);

  const pairs = [];
  for (let i = 0; i < generatedPageNumbers.length; i += 2) {
    pairs.push([generatedPageNumbers[i], generatedPageNumbers[i + 1]]);
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
            <select
              className="minimal"
              value={setSelected}
              onChange={handleSetChange}
            >
              <option value="">-- Select Category --</option>
              {Object.entries(sets).map(([key, value]) => (
                <option key={key} value={key}>
                  {`${key}: ${value.ajza}`}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
      <div className="App">
        <div className="numbers-wrapper">
          <div className="number-title">Page number</div>
          {isRunning ? (
            <div className={`counter-wrapper ${isRunning ? "" : "hide"}`}>
              <p className="number-display">
                {animatedCounter1}, {animatedCounter2}
              </p>
            </div>
          ) : (
            <div className={`counter-wrapper ${isRunning ? "hide" : ""}`}>
              <p className="number-display">{pageNum1 ? <>{pageNum1},</> : <>00,</>}</p>
              <p className="number-display">{pageNum2 ? <>{pageNum2}</> : <>00</>}</p>
            </div>
          )}
        </div>
        <div className="button-wrapper">
          <button
            onClick={handleStartStop}
            className="button-82-pushable"
          >
            <span className="button-82-shadow"></span>
            <span className="button-82-edge"></span>
            <span className="button-82-front text">
              {isRunning ? "Stop" : "Start"}
            </span>
          </button>
          <br />
          <br />
        </div>
        <div className="gen-numbers-wrapper">
          <div className="gen-numbers-item">
            {showGenerated && (
              <>
                {pairs.length !== 0 ? (
                  <>
                    {pairs.map((pair, index) => (
                      <React.Fragment key={index}>
                        <span className="gen-numbers-set">
                          {pair.join(", ")}
                        </span>
                      </React.Fragment>
                    ))}
                  </>
                ) : (
                  <span className="gen-numbers-set">
                    No page number generated yet
                  </span>
                )}
              </>
            )}
          </div>
          <div className="gen-numbers-btns">
            <button
              disabled={isRunning}
              className="reset"
              onClick={() => {
                if (!isRunning) {
                  setShowGenerated(!showGenerated);
                }
              }}
            >
              {showGenerated ? <>Hide</> : <>List</>}
            </button>
            <button className="reset" onClick={resetPageNumbers}>
              Reset all
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
