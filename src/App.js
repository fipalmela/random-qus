import React, { useState } from "react";
import './style.css'

function App() {
  // const [batch, setBatch] = useState("2");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [generatedNumbers, setGeneratedNumbers] = useState([]);

  const handleMinChange = (e) => {
    setMin(e.target.value);
  };
 /*  const handleBatchChange = (e) => {
    setBatch(e.target.value);
  }; */

  const handleMaxChange = (e) => {
    setMax(e.target.value);
  };

  const generateNumbers = () => {
    // const range = max - min + 1;
    const numbersArray = [];
    for (let i = parseInt(min); i <= parseInt(max); i++) {
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
    /* if (batch === '2')  */setNum2(numTwo);
    const updatedGeneratedNumbers = [...generatedNumbers, numOne, numTwo];
    localStorage.setItem("generatedNumbers", JSON.stringify(updatedGeneratedNumbers));
    setGeneratedNumbers(updatedGeneratedNumbers);
  };

  const resetNumbers = () => {
    localStorage.removeItem("generatedNumbers");
    setGeneratedNumbers([]);
    setNum1("");
    setNum2("");
    setMin("");
    setMax("");
  };

  const counter = (id, start, end, duration) => {
    let obj = document.getElementById(id),
    current = start,
    range = end - start,
    increment = end > start ? 1 : -1,
    step = Math.abs(Math.floor(duration / range)),
    timer = setInterval(() => {
      current += increment;
      obj.textContent = current;
      // eslint-disable-next-line eqeqeq
      if (current == end) {
      clearInterval(timer);
      }
    }, step);
 }

 React.useEffect(() => {
   if (num1) counter("count1", 0, num1, 1000);
   if (num2) counter("count2", 0, num2, 1000);
 }, [num1, num2]);

  // check if generated numbers already exist in local storage on mount
  React.useEffect(() => {
    const storedGeneratedNumbers = localStorage.getItem("generatedNumbers");
    if (storedGeneratedNumbers) {
      setGeneratedNumbers(JSON.parse(storedGeneratedNumbers));
    }
  }, []);

  return (
    <div className="App">
      <div className="counter-wrapper">
        <p className="number-display" id="count1">00</p>
        <p className={`number-display`} id="count2">00</p>

      </div>
      <br />
      <br />
      <div className="input-wrapper">
        <input
          placeholder="Ayah Start:"
          type="number"
          value={min}
          onChange={handleMinChange}
        />
        <input
          placeholder="Ayah Ends:"
          type="number"
          value={max}
          onChange={handleMaxChange}
        />

       {/*  <input
          placeholder="Batch No."
          type="number"
          value={batch}
          onChange={handleBatchChange}
        /> */}
      </div>
      <br /><br />
      <div className="button-wrapper">
      <button onClick={generateNumbers}>Generate mushaf number</button>
      <br />
      <br />
      <button onClick={resetNumbers}>Reset</button>
      </div>

    </div>
  );
}

export default App;
