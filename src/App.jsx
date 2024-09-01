import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TelaPrincipal from "./pages/TelaPrincipal/TelaPrincipal";

function App() {
  return (
   <Router>
    <Routes>
      <Route path="/" element={<TelaPrincipal/>}/>
      <Route path="/TelaPrincipal" element={<TelaPrincipal/>}/>
    </Routes>
   </Router>
  );
}

export default App;