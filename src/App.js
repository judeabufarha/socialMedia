import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Sidebar } from "./components/sidebar";
import { LoginPage } from "./components/pages/LoginPage";
import { ProfilePage } from "./components/pages/ProfilePage";
import { Homepage } from "./components/pages/HomePage";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Sidebar />
            <Homepage/>
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/profile">
            <Sidebar />
            <ProfilePage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
