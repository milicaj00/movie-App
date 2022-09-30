import "./App.css";
import "../src/styles/style.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Movies from "./components/Movies";
import { Navigate } from "react-router-dom";

const App = () => {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />

                    <Route path="/movies" element={<Movies />} />

                    <Route path="*" element={<div>Not found</div>} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
