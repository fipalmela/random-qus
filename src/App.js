import React, { useState, useEffect } from "react";
import "./style.css";
import Logo from "./logo_tarteel.png";


// Set for Tartee
const sets = {
  "A1": {
    ajza: "1 Juz (1)",
    startPage: 3,
    endPage: 21
  },
  "A2": {
    ajza: "1 Juz (30)",
    startPage: 582,
    endPage: 604
  },
  "B0": {
    ajza: "2.5 Ajza",
    startPage: 3,
    endPage: 53
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
    ajza: "5 Ajza (1 - 5)",
    startPage: 3,
    endPage: 101
  },
  "C2": {
    ajza: "5 Ajza (26 - 30)",
    startPage: 502,
    endPage: 589
  },
  "D1": {
    ajza: "10 Ajza (1 - 10)",
    startPage: 3,
    endPage: 200
  },
  "D2": {
    ajza: "10 Ajza (20 - 30)",
    startPage: 382,
    endPage: 589
  },
  "E1": {
    ajza: "15 Ajza (1 - 15)",
    startPage: 3,
    endPage: 281
  },
  "E2": {
    ajza: "15 Ajza (16 - 30)",
    startPage: 302,
    endPage: 589
  },
  "F": {
    ajza: "Whole Quran",
    startPage: 3,
    endPage: 589
  }
};

const App = () => {
  const [setSelected, setSetSelected] = useState("A1");
  const [resultPageNumber, setResultPageNumber] = useState("");
  const [outOfPageNumbers, setOutOfPageNumbers] = useState(false);
  const [animatedCounter, setAnimatedCounter] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [generatedPageNumbers, setgeneratedPageNumbers] = useState([]);
  const [showGenerated, setShowGenerated] = useState(false);

  const [selectedCount, setSelectedCount] = useState(1);

  const handleDropdownChange = (event) => {
    setShowGenerated(false);
    const { value } = event.target;
    setSelectedCount(parseInt(value));
  };

  const generatePairs = (array, elementsPerPair) => {
    const pairs = [];

    for (let i = 0; i < array.length; i += elementsPerPair) {
      const pair = array.slice(i, i + elementsPerPair);
      pairs.push(pair);
    }

    return pairs;
  };

  const generateSets = (count) => {
    if (count < 1) {
      return "";
    }

    const setsArray = Array(count).fill("000");
    const setsString = setsArray.join(", ");

    return setsString;
  };

  const generateRandomNumbers = (count) => {
    const min = 100; // Minimum value (inclusive)
    const max = 999; // Maximum value (inclusive)
    const numbers = [];
    for (let i = 0; i < count; i++) {
      numbers.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return numbers;
  };

  useEffect(() => {
    if (!outOfPageNumbers) {
      let timer;
      if (isRunning) {
        timer = setInterval(() => {
          setAnimatedCounter(generateRandomNumbers(selectedCount)); // Set an array of three random numbers
        }, 10);
      }
      return () => clearInterval(timer);
    }
  }, [isRunning, outOfPageNumbers, selectedCount]);


  const handleStartStop = () => {
    if (!setSelected) {
      alert("No Category Selected");
    } else {
      setShowGenerated(false);
      if (!outOfPageNumbers) setIsRunning(!isRunning);
      if (!isRunning && !outOfPageNumbers) generatePageNumbers();
    }
  };

  const handleSetChange = (e) => {
    setSetSelected(e.target.value);
    setShowGenerated(false);
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

    const dropdownElement = document.getElementById('dropdown');
    const dropdownValue = dropdownElement.value;
    // const middleIndex = Math.floor(filteredPageNumbers.length / 2);
    const halfIndex = Math.floor(filteredPageNumbers.length / dropdownValue);

    setOutOfPageNumbers(halfIndex < 1);
    if (halfIndex < 1) {
      return alert("Out of page Numbers");
    }

    const allHalves = [];
    for (let i = 0; i < dropdownValue; i++) {
      const start = i * halfIndex;
      const end = i === dropdownValue - 1 ? filteredPageNumbers.length : (i + 1) * halfIndex;
      const half = filteredPageNumbers.slice(start, end);
      allHalves.push(half);
    }


    const randomIndexes = allHalves.map(half => Math.floor(Math.random() * half.length));
    const pageNumbers = randomIndexes.map((index, i) => allHalves[i][index]);

    setResultPageNumber(generatePairs(pageNumbers,dropdownValue));

    const updatedgeneratedPageNumbers = [
      ...generatedPageNumbers,
      ...pageNumbers
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
    setOutOfPageNumbers(false);
    setIsRunning(false);
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

  const pairs = generatedPageNumbers;

  // if (resultPageNumber) console.log(typeof resultPageNumber.join(', '));

  const addSpaceAfterComma = (str) => {
    return str.replace(/,/g, ', ');
  }
const fontsizedisplay = () => {
  let size;
  switch (selectedCount) {
    case 1:
      // Code block to be executed when selectedCount is 1
      size = '175px'
      break;
    case 2:
      // Code block to be executed when selectedCount is 2
      size = '155px'
      break;
    case 3:
      // Code block to be executed when selectedCount is 3
      size = '145px'
      break;
    default:
      // Code block to be executed when selectedCount doesn't match any case
      size = '145px'
      break;
  }
  return size;
}
  return (
    <>
      <div className="logo">
        <div className="div">
          <img width={200} alt="logo" src={Logo} />
        </div>
        <div className="dropdown left-auto">
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
        <div className="dropdown">
          <span>Number of pages:</span>
          <select className="minimal" id="dropdown" value={selectedCount} onChange={handleDropdownChange}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
      </div>
      <div className="App">
        <div className="numbers-wrapper">
          <div className="number-title">Page number</div>
          {isRunning ? (
            <div className={`counter-wrapper ${isRunning ? "" : "hide"}`}>
              <p className="number-display">
              {animatedCounter.join(', ')}
              </p>
            </div>
          ) : (
            <div className={`counter-wrapper ${isRunning ? "hide" : ""}`}>
              <p className="number-display" style={{fontSize: `${fontsizedisplay()}`}}>
                {
                  resultPageNumber ? (
                    <>
                      {addSpaceAfterComma(resultPageNumber.join(', '))}
                    </>
                  ) :
                  (
                    <>
                    {generateSets(selectedCount)}
                    </>
                  )
                }
              </p>
            </div>
          )}
        </div>
        <div className="button-wrapper">
          <button
            onClick={handleStartStop}
            className={`button-82-pushable ${outOfPageNumbers ? 'disalbed' : ''}`}
          >
            {/* <span className="button-82-shadow"></span>
            <span className="button-82-edge"></span> */}
            <span className="button-82-front text" style={{backgroundColor: isRunning ? '#978E8E' : '#717171'}}>
              {
                outOfPageNumbers ? (
                  <>
                   Start
                  </>
                ) : (
                  <>
                    {isRunning ? "Stop" : "Start"}
                  </>
                )
              }
            </span>
          </button>
          <br />
          <br />
        </div>
          {
            outOfPageNumbers  && (
              <p> Please reset to regenerate new page numbers. </p>
            )
          }
        <div className="gen-numbers-wrapper">
          <div className="gen-numbers-item">

            {showGenerated && (
              <>
                {pairs.length !== 0 ? (
                  <>
                    {pairs.map((pair, index) => (
                      <React.Fragment key={index}>
                        <span className="gen-numbers-set">
                          {pair}
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
            {
              outOfPageNumbers ? (
                <>
                  <button
                  className="reset"
                    onClick={() => {
                        setShowGenerated(!showGenerated);
                    }}
                  >
                    {showGenerated ? <>Hide</> : <>List</>}
                  </button>
                </>
              ) : (
                <>
                  <button
                  className="reset"
                    disabled={isRunning}
                    onClick={() => {
                      if (!isRunning) {
                        setShowGenerated(!showGenerated);
                      }
                    }}
                  >
                    {showGenerated ? <>Hide</> : <>List</>}
                  </button>
                </>
              )
            }

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
