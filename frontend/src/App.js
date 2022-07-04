import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './components/HomePage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div className="container container-fluid">
          <Routes>
            <Route path="/" element={<HomePage />} exact />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter >
    </div>
  );
}

export default App;
