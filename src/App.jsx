import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FirstScreen from "./pages/firstScreen/first_screen";

function App() {
  return (
   <Router>
    <Routes>
      <Route path="/" element={<FirstScreen/>}/>
      <Route path="/firstScreen" element={<FirstScreen/>}/>
    </Routes>
   </Router>
  );
}

export default App;