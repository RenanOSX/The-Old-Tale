import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import MainContent from '../../components/MainContent/MainContent';
import StatsPanel from '../../components/StatsPanel/StatsPanel';
import './first_screen.css'; 

function FirstScreen() {
  return (
    <div className="first-screen">
      <div className="layout-container">
        <Sidebar />
        <MainContent />
        <StatsPanel />
      </div>
    </div>
  );
}

export default FirstScreen;
