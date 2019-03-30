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

  renderTrafficLights() {
    if (this.state.lastResult === '-') {
      return
    }

    return (
      // RENDER TRAFFIC LIGHTS RESULTS HERE
      <div>
        <ul>
          {this.crunchEnergy()}
          {this.crunchFat()}
          {this.crunchSaturates()}
          {this.crunchSugars()}
          {this.crunchSalt()}
        </ul>
      </div>
    )
  }

  crunchEnergy() {
    let dailyRecommended = 2500;
    let dailyPercentage =  ((this.state.lastResult.normalenergy / dailyRecommended) * 100).toFixed(1);

    return <li>{dailyPercentage}%</li>
  }

  crunchFat() {
    if (this.state.lastResult.normalfat <= 3.0) {
      return <li className='green'>{this.state.lastResult.normalfat}</li>
    } else if (this.state.lastResult.normalfat <= 17.5) {
      return <li className='orange'>{this.state.lastResult.normalfat}</li>
    } else {
      return <li className='red'>{this.state.lastResult.normalfat}</li>
    }
  }

  crunchSaturates() {
    if (this.state.lastResult.normalsaturates <= 1.5) {
      return <li className='green'>{this.state.lastResult.normalsaturates}</li>
    } else if (this.state.lastResult.normalsaturates <= 5.0) {
      return <li className='orange'>{this.state.lastResult.normalsaturates}</li>
    } else {
      return <li className='red'>{this.state.lastResult.normalsaturates}</li>
    }
  }

  crunchSugars() {
    if (this.state.lastResult.normalsugars <= 5.0) {
      return <li className='green'>{this.state.lastResult.normalsugars}</li>
    } else if (this.state.lastResult.normalsugars <= 22.5) {
      return <li className='orange'>{this.state.lastResult.normalsugars}</li>
    } else {
      return <li className='red'>{this.state.lastResult.normalsugars}</li>
    }
  }

  crunchSalt() {
    if (this.state.lastResult.normalsalt <= 0.3) {
      return <li className='green'>{this.state.lastResult.normalsalt}</li>
    } else if (this.state.lastResult.normalsalt <= 1.5) {
      return <li className='orange'>{this.state.lastResult.normalsalt}</li>
    } else {
      return <li className='red'>{this.state.lastResult.normalsalt}</li>
    }
  }

  crunchNumbers() {
    let multiplier = 100 / this.state.weight;
    
    // normalised values (for 100grams)
    const resultObj = {
      normalenergy: this.state.energy * multiplier,
      normalfat: (this.state.fat * multiplier).toFixed(1),
      normalsaturates: (this.state.saturates * multiplier).toFixed(1),
      normalsugars: (this.state.sugars * multiplier).toFixed(1),
      normalsalt: (this.state.salt * multiplier).toFixed(1)
    }

    this.setState({
      lastResult: resultObj
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
            {this.renderTrafficLights()}
          </form>
        </div>
      </div>
    );
  }
}

export default App;
