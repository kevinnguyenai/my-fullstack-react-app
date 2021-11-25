import React, { Component } from 'react';
import './App.css';
import Messages from './components/Messages/Messages';

const styles = require('./components/Messages/Messages.css');


class App extends Component {
  render() {
    const data = require('./components/Messages/data.js')(10);
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <body>
        <div className={styles.container}>
          <Messages messages={data.messages} users={data.users}/>
        </div>
        </body>
      </div>
      
    );
  }
}

export default App;
