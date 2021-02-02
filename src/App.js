import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './pages/Home';
import { Join } from "./pages/Join";
import { Login } from './pages/Login';
import { TimeLinePage } from "./pages/TimeLinePage";
import { PostPage } from "./pages/PostPage";
import { MyPage } from './pages/MyPage';

function App() {
  return <>
    <div className="App">
      <Router>
        <Route exact path={"/"} component={Home}/>
        <Route path={"/join"} component={Join}/>
        <Route path={"/login"} component={Login}/>
        <Route path={"/timeline"} component={TimeLinePage}/>
        <Switch>
          <Route path={'/post/:id'} component={PostPage}/>
        </Switch>
        <Route path={"/MyPage"} component={MyPage}/>
      </Router>
    </div>
  </>
}

export default App;
