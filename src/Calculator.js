import React, { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [formula, setFormula] = useState('');
  const [isEvaluated, setIsEvaluated] = useState(false);

  const handleClear = () => {
    setDisplay('0');
    setFormula('');
    setIsEvaluated(false);
  };

  const handleNumber = (value) => {
    if (isEvaluated) {
      setDisplay(value);
      setFormula(value);
      setIsEvaluated(false);
    } else {
      if (display === '0' || /[+\-*/]$/.test(display)) {
        setDisplay(value);
      } else {
        setDisplay(display + value);
      }
      setFormula(formula + value);
    }
  };

  const handleOperator = (value) => {
    if (isEvaluated) {
      setFormula(display + value);
      setIsEvaluated(false);
    } else {
      if (/[+\-*/]$/.test(formula)) {
        if (value === '-') {
          setFormula(formula + value);
        } else {
          setFormula(formula.replace(/[+\-*/]+$/, '') + value);
        }
      } else {
        setFormula(formula + value);
      }
    }
    setDisplay(value);
  };

  const handleDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
      setFormula(formula + '.');
    }
  };

  const handleEvaluate = () => {
    try {
      let result = eval(formula.replace(/--/g, '+'));
      result = Number(result.toFixed(10)); // Ensure precision
      setDisplay(result.toString());
      setFormula(result.toString());
      setIsEvaluated(true);
    } catch (error) {
      setDisplay('Error');
      setFormula('');
    }
  };

  return (
    <div className="calculator">
      <div id="display" className="display">{display}</div>
      <button id="clear" onClick={handleClear}>AC</button>
      <button id="divide" onClick={() => handleOperator('/')}>/</button>
      <button id="multiply" onClick={() => handleOperator('*')}>*</button>
      <button id="subtract" onClick={() => handleOperator('-')}>-</button>
      <button id="equals" onClick={handleEvaluate}>=</button>
      
      <button id="seven" onClick={() => handleNumber('7')}>7</button>
      <button id="eight" onClick={() => handleNumber('8')}>8</button>
      <button id="nine" onClick={() => handleNumber('9')}>9</button>
      <button id="decimal" onClick={handleDecimal}>.</button>
    
      <button id="four" onClick={() => handleNumber('4')}>4</button>
      <button id="five" onClick={() => handleNumber('5')}>5</button>
      <button id="six" onClick={() => handleNumber('6')}>6</button>
      <button id="add" onClick={() => handleOperator('+')}>+</button>
      
      <button id="one" onClick={() => handleNumber('1')}>1</button>
      <button id="two" onClick={() => handleNumber('2')}>2</button>
      <button id="three" onClick={() => handleNumber('3')}>3</button>
      <button id="zero" onClick={() => handleNumber('0')}>0</button>
    </div>
  );
};

export default Calculator;
