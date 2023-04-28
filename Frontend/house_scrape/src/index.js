//import ReactDOM from "react-dom/client";
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TextBoxes from './Pages/TextBoxes';
import SearchResultView from './Pages/searchResultView';

export default function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TextBoxes />}>
        </Route>
        <Route path="/onSubmit/:city/:province/:subCity" element={<SearchResultView />} />
        <Route path="/onSubmit/:city/:province" element={<SearchResultView />} />
      </Routes>
    </BrowserRouter>
  );
}

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
