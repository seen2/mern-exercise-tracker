import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ExerciseList from "./components/ExerciseList";
import EditExercise from "./components/EditExercise";
import CreateExercise from "./components/CreateExercise";
import CreateUser from "./components/CreateUser";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path={"/"} exact component={ExerciseList} />
        <Route path={"/edit/:id"} component={EditExercise} />
        <Route path={"/create"} component={CreateExercise} />
        <Route path={"/user"} component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;

/**
 * 
 * //POST request
 const response=await fetch("http://localhost:5000/users/add",{method:"post",headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },body:JSON.stringify({userName:"sintu"})});
undefined
const data = await response.json()
 */
