import Header from "./components/Header";
import icon from "./assets/magic_wand.png";
import Monster from "./components/Monster";

function App() {
  return (
    <div>
      <Header title="Praecantatio Idle" image={icon} description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos impedit placeat magni blanditiis maiores recusandae itaque molestias porro nemo, nobis fugiat officiis praesentium alias eius unde, earum reprehenderit nihil deserunt?"/>
      <main>
        <section id="box">
          <Monster/>
        </section>
        <section>
          
        </section>
      </main>
    </div>
  );
}

export default App;
