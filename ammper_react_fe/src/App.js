import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EmailForm from "./components/email-form";
import EmailStats from "./components/email-stats";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<EmailForm />} />
          <Route path="/stats" element={<EmailStats />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
