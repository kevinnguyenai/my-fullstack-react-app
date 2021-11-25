import React from 'react';

const content = document.createElement('div');
document.body.appendChild(content);

module.exports = class extends React.Component {
  constructor(props){
    super(props)
    this.refInput = null
  }
  static displayName = "04-basic-input";
  state = { names: [], refValue: '' }; // <-- initial state


  callbackInputName = evt => {
    this.refInput = evt
  }

  nameOnChange = (evt) => {
    this.setState({
      refValue: evt.target.value
    })
  }

  onFormSubmit = (evt) => {
    const name = this.state.refValue
    const names = [ ...this.state.names, name ];
    this.setState({ names: names, refValue:'' });
    evt.preventDefault();
  };

  render() {
    return (
      <div>
        <h1>Sign Up Sheet</h1>

        <form onSubmit={this.onFormSubmit}>
          <input
            placeholder='Name'
            ref={this.callbackInputName}
            value={this.state.refValue}
            onChange={this.nameOnChange}
          />

          <input type='submit' />
        </form>

        <div>
          <h3>Names</h3>
          <ul>
            { this.state.names.map((name, i) => <li key={i}>{name}</li>) }
          </ul>
        </div>
      </div>
    );
  }
};
