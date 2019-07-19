import React from 'react';
import './styles/App.scss';
import Login from './components/Login'
import { Route } from 'react-router-dom'
import PrivateRoute from './routes/PrivateRoute'
import List from './components/List'

function App() {
  return (

    <div className="App">

      <Route exact path="/" 
          render={props => (
            <Login 
              {...props}
            />
          )} 
        />

      <PrivateRoute path="/list" component={List} />	

    </div>
  );
}

export default App;
