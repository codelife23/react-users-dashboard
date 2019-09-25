import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import axios from "axios";
import Header from "./components/Header";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";

// Pages
import Users from "./pages/Users";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

function App() {
  return (
    <div className="container">
      <Provider store={store}>
        <Router>
        <Header />
          <Switch>
            <Route exact path="/" component={Users} />
            <Route exact path="/add" component={AddUser} />
            <Route exact path="/edit/:userId" component={EditUser} />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
