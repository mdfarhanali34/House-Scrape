import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TextBoxes from './Pages/TextBoxes';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TextBoxes />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);