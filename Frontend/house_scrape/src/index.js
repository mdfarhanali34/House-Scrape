// index.js
import React from 'react';
//import ReactDOM from 'react-dom';
import TextBoxes from './App';
import { createRoot } from 'react-dom/client';

function handleSubmit(province, city) {
  console.log('province', province);
  console.log('city:', city);
}

const root = document.getElementById('root');

createRoot(root).render(
  <TextBoxes onSubmit={handleSubmit} />
);