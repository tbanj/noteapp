import React, { Component } from 'react';

import './App.css';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import Footer from './component/Footer/Footer';
import Content from './component/content/Content';

class App extends Component {
  render() {
    return (
      <div className="">
      <BrowserRouter>
        <div>

       
        <Switch>
            <Route exact path="/" component={Content}/>
            {/* <Route exact path="/signup" component={Signup}/>
            <Route exact path="/signin" component={Signin}/> */}
        </Switch>
        <Footer/>
        </div>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;
