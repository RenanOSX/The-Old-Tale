import Header from "./components/Header";
import monster from "./assets/monster.png";
import icon from "./assets/magic_wand.png";

function App() {
  return (
    <div>
      <Header title="Praecantatio Idle" image={icon} description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos impedit placeat magni blanditiis maiores recusandae itaque molestias porro nemo, nobis fugiat officiis praesentium alias eius unde, earum reprehenderit nihil deserunt?"/>
      <main>
        <section id="box">
          <h1 class="center">Monster Name</h1>
          <img src={monster} class="center"></img>
        </section>
      </main>
    </div>
  );
}

export default App;
