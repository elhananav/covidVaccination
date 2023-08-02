import React, { useState } from 'react';
import RegistrationPage from "./Components/RegistraionPage";
import SummaryPage from './Components/SummaryPage';

const App = () => {
  const [showSummary, setShowSummary] = useState(false);

  const handleShowSummary = () => {
    setShowSummary(true);
  };

  const handleShowRegistrationForm = () => {
    setShowSummary(false);
  };

  return (
    <div>
      {showSummary ? (
        <div>
          <h1>Summary Page</h1>
          <button onClick={handleShowRegistrationForm}>Back to Registration</button>
          <SummaryPage />
        </div>
      ) : (
        <div>
          <h1>Registration Page</h1>
          <button onClick={handleShowSummary}>Go to Summary</button>
          <RegistrationPage />
        </div>
      )}
    </div>
  );
};

export default App;