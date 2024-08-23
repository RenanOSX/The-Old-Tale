import React from 'react';
import './MainContent.css';
import Terminal from '../Terminal/Terminal';
import Monster from '../Monster/Monster';

function MainContent() {
  return (
    <main className="main-content">
        <header className="main-header">
          <div className='header-title'>0%</div>
        </header>
        <div className='content'>
          <div className="main-section-content">
            <Monster />
            <Monster />
            <Monster />
          </div>
          <section className="logs-section">
            <h2 className="logs-header">LOGS DE BATALHA</h2>
            <div className="logs-content">
              <Terminal />
            </div>
          </section>
        </div>
    </main>
  );
}

export default MainContent;
