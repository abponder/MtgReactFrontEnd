import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./Home.js"
import Schedule from "./Schedule.js"
import About from "./About.js"


function AppRouter() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about/">About</Link>
            </li>
            <li>
              <Link to="/schedule/">Schedule</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" exact component={Home} />
        <Route path="/about/" component={About} />
        <Route path="/schedule/" component={Schedule} />
      </div>
    </Router>
  );
}

export default AppRouter;