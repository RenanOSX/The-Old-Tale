import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/homeScreen/home";
import FirstScreen from "./pages/firstScreen/first_screen";

function App() {
  return (
   <Router>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/firstScreen" element={<FirstScreen/>}/>
    </Routes>
   </Router>
  );
}

export default App;
