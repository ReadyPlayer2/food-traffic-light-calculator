import React, { Component } from 'react';
import './App.css';
import gitLogo from './GitHub-Mark-64px.png';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      weight: 0.0,
      energy: 0.0,
      fat: 0.0,
      saturates: 0.0,
      sugars: 0.0,
      salt: 0.0,
      lastResult: '-'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  isNormalFloat(str) {
    // https://stackoverflow.com/questions/47661590/check-if-an-input-string-is-a-positive-int-float-number
    return !isNaN(str) && Number(str) > 0;
  }

  handleSubmit(event) {
    // only allow submit when all values are valid
    if (this.isNormalFloat(this.state.weight) &&
      this.isNormalFloat(this.state.energy) &&
      this.isNormalFloat(this.state.fat) &&
      this.isNormalFloat(this.state.saturates) &&
      this.isNormalFloat(this.state.sugars) &&
      this.isNormalFloat(this.state.salt)) {

      this.crunchNumbers();
    }

    event.preventDefault();
  }

  getResults() {
    return (
      // RENDER TRAFFIC LIGHTS RESULTS HERE
      <h2>{this.state.lastResult}</h2>
    )
  }

  crunchNumbers() {
    this.setState({
      lastResult: ['array', 'of values to', 'be displayed']
    })
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div>
            <img src={gitLogo} className='git-icon' alt="gitLogo" />
            <a className="git-link"
              href="https://github.com/ReadyPlayer2/food-traffic-light-calculator"
              target="_blank"
              rel="noopener noreferrer"
            >
              food-traffic-light-calculator
            </a>
          </div>
        </header>

        <div className='App-content'>
          <form onSubmit={this.handleSubmit}>
            <label>
              Weight:
              <input type="text" name="weight" onChange={this.handleChange} />
            </label>
            <br></br>
            <label>
              Energy:
              <input type="text" name="energy" onChange={this.handleChange} />
            </label>
            <br></br>
            <label>
              Fat:
              <input type="text" name="fat" onChange={this.handleChange} />
            </label>
            <br></br>
            <label>
              Saturates:
              <input type="text" name="saturates" onChange={this.handleChange} />
            </label>
            <br></br>
            <label>
              Sugars:
              <input type="text" name="sugars" onChange={this.handleChange} />
            </label>
            <br></br>
            <label>
              Salt:
              <input type="text" name="salt" onChange={this.handleChange} />
            </label>
            <br></br>
            <input type="submit" value="crunch" />
            {this.getResults()}
          </form>
        </div>
      </div>
    );
  }
}

export default App;
