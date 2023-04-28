import ReactDOM from "react-dom/client";
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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
