// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import TextBoxes from './App';


function handleSubmit(text1, text2) {
  console.log('Text1:', text1);
  console.log('Text2:', text2);
}

ReactDOM.render(
  <TextBoxes onSubmit={handleSubmit} />,
  document.getElementById('root')
);