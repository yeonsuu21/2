import React, { useState } from 'react';
import './App.css';

function App() {
  const [n, setN] = useState(0);
  const [pattern, setPattern] = useState('');

  const handleClick = () => {
    const K = n + 1;
    setN(K);
    drawingPattern(K);
  };

  const drawingPattern = (K) => {
    let result = '';
    // 상, 하로 나누어서 for문 작성
    for (let i = 1; i <= K; i++) {
      // 'r' 이 기준으로 처음부터 
      for (let j = 0; j < i; j++) {
        result += ' ';
      }
      for (let j = K - i; j >= 0; j--) {
        result += 'r';
      }
      for (let j = K - i; j > 0; j--) {
        result += ' ';
      }
      for (let j = i-1; j >= 0; j--) {
        result += 'r';
      }
      result += '\n';
    }

    for (let i = 1; i <= K; i++) {
      for (let j = K-i; j >= 0; j--) {
        result += 'r';
      }
      for (let j = i; j > 0; j--) {
        result += ' ';
      }
      for (let j = i; j > 0; j--) {
        result += 'r';
      }
      for (let j = K - i; j > 0; j--) {
        result += ' ';
      }
      result += '\n';
    }

    setPattern(result);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>풍차</h1>
        <div>
          <button onClick={handleClick}>{n}+</button>
        </div>
        <pre>{pattern}</pre>
      </header>
    </div>
  );
}

export default App;