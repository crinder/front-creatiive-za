import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import "./assets/style/responsive.css";
import { AuthClient } from "./components/context/AuthClient";
import { AuthContext } from "./components/context/AuthContext";
import "./output.css";
import Routing from "./routing/Routing";

function App() {
  return (
    <>
      <AuthContext>
        <AuthClient>
          <Router>
            <Routing />
          </Router>
        </AuthClient>
      </AuthContext>
    </>
  );
}

export default App;
