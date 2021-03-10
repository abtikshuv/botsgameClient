import React, { useState } from 'react';
import './App.css';
import BotsDisplay from './Components/BotsDisplay'
import Header from './Components/Header'
import Introduction from './Components/Introcudtion'
import Leaderboard from './Components/Leaderboard'
import DisplayGame from './Components/DisplayGame'
import AuthCheck from './Components/AuthCheck';
import DisplayCustomGame from './Components/DisplayCustomGame';

function App() {

  const [currentView, setCurrentView] = useState(null);

  const renderPage = (view) => {
    switch (view) {
      case "Introduction":
        return <Introduction />
      case "Entries":
        return <BotsDisplay />
      case "Leaderboard":
        return <Leaderboard />
      case "DisplayGame":
        return <DisplayGame />
      case "DisplayCustomGame":
        return <DisplayCustomGame />
      default:
        return <Introduction />
    }
  }

  return (
    <div className="App">
      {
        sessionStorage.getItem('loggedIn') === "true" ?
          <>
            <Header setCurrentView={setCurrentView} />
            {renderPage(currentView)}
          </>
          :
          <AuthCheck setCurrentView={setCurrentView} />
      }
    </div>
  );
}

export default App;
