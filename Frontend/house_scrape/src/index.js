// index.js
import React from 'react';
//import ReactDOM from 'react-dom';
import TextBoxes from './App';
import { createRoot } from 'react-dom/client';

function handleSubmit(text1, text2) {
  console.log('Here Text1:', text1);
  console.log('Text2:', text2);
}

const root = document.getElementById('root');

createRoot(root).render(
  <TextBoxes onSubmit={handleSubmit} />
);