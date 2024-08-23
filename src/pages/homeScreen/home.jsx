import React from 'react';
import Header from "../../components/Header";
import icon from "../../assets/magic_wand.png";
import Monster from "../../components/Monster";
import './home.css';
import Terminal from '../../components/Terminal/Terminal';

function Home() {
  return (
    <div className="home-screen">
      <Header title="Praecantatio Idle" image={icon} description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos impedit placeat magni blanditiis maiores recusandae itaque molestias porro nemo, nobis fugiat officiis praesentium alias eius unde, earum reprehenderit nihil deserunt?" />
      <main>
        <section id="box">
          <Terminal />
        </section>
        <section>
          {/* Adicione mais conteúdo aqui */}
        </section>
      </main>
    </div>
  );
}

export default Home;
