// TextBoxes.js
import React, { useState } from 'react';

function TextBoxes({ onSubmit }) {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');

  const handleText1Change = (event) => {
    setText1(event.target.value);
  }

  const handleText2Change = (event) => {
    setText2(event.target.value);
  }

  const handleSubmit = (event) => {
    //event.preventDefault();
    onSubmit(text1, text2);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={text1} onChange={handleText1Change} />
      <input type="text" value={text2} onChange={handleText2Change} />
      <button type="submit">Submit</button>
    </form>
  );
}

export default TextBoxes;