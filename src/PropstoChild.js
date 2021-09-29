// State Lifting code practice

import React from "react";

export default class ComponentOne extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
    };
  }
  addNumber = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };
  deleteNumber = () => {
    this.setState({
      count: this.state.count - 1,
    });
  };

  restNumber = () => {
    this.setState({
      count: 0,
    });
  };
  render() {
    return (
      <ComponentTwo
        valueKeyForCompenentTwo={this.state.count}
        addNumberTwo={this.addNumber}
        deleteNumberTwo={this.deleteNumber}
        restNumberTwo={this.restNumber}
      />
    );
  }
}

class ComponentTwo extends React.Component {
  render() {
    return (
      <ComponentThree
        valueKeyForCompenentThree={this.props.valueKeyForCompenentTwo}
        addNumberThree={this.props.addNumberTwo}
        deleteNumberThree={this.props.deleteNumberTwo}
        restNumberThree={this.props.restNumberTwo}
      />
    );
  }
}

class ComponentThree extends React.Component {
  render() {
    return (
      <div>
        <p> The value is {this.props.valueKeyForCompenentThree}</p>
        <button onClick={this.props.addNumberThree}> + </button>
        <button onClick={this.props.deleteNumberThree}> - </button>
        <button onClick={this.props.restNumberThree}> Rest </button>
      </div>
    );
  }
}
