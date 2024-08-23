import React from 'react';
import Header from '../../components/Header/Header.jsx';
import Monster from '../../components/Monster/Monster.jsx';
import icon from '../../assets/magic_wand.png';
import './home.css';
import Terminal from '../../components/Terminal/Terminal';

function Home() {
  return (
    <div className="home-screen">
      <Header title="Praecantatio Idle" image={icon} description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos impedit placeat magni blanditiis maiores recusandae itaque molestias porro nemo, nobis fugiat officiis praesentium alias eius unde, earum reprehenderit nihil deserunt?" />
      <main>
        <div id="box">
          <Monster />
          <Monster />
          <Monster />
        </div>
        <section id="box">
          <Terminal />
        </section>
      </main>
    </div>
  );
}

export default Home;
