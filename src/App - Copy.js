// import logo from './logo.svg';
import "./App.css";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Route exact={true} path="/" component={Home} />
      <Route path="/about" component={About} />
    </Router>
  );
}

export default App;
