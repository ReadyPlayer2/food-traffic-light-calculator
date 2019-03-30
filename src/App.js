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

      this.normaliseInput();
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
        <p>Each 100g portion contains:</p>
        <ul className='traffic-light-container'>
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
    let dailyRecommended = 2000;
    let dailyPercentage =  ((this.state.lastResult.normalenergy / dailyRecommended) * 100).toFixed(1);

    return <li className='white'>{this.state.lastResult.normalenergy}kcal ({dailyPercentage}%)</li>
  }

  // returns a <li /> of the correct class based on value
  crunchItem(value, dailyRecommended, greenMax, orangeMax) {
    let dailyPercentage =  ((value / dailyRecommended) * 100).toFixed(1);

    if (value <= greenMax) {
      return <li className='green'>{value}g ({dailyPercentage}%)</li>
    } else if (value <= orangeMax) {
      return <li className='orange'>{value}g ({dailyPercentage}%)</li>
    } else {
      return <li className='red'>{value}g ({dailyPercentage}%)</li>
    }
  }

  crunchFat() {
    return this.crunchItem(this.state.lastResult.normalfat, 70, 3.0, 17.5);
  }

  crunchSaturates() {
    return this.crunchItem(this.state.lastResult.normalsaturates, 20, 1.5, 5.0);
  }

  crunchSugars() {
    return this.crunchItem(this.state.lastResult.normalsugars, 90, 5.0, 22.5);
  }

  crunchSalt() {
    return this.crunchItem(this.state.lastResult.normalsalt, 6, 0.3, 1.5);
  }

  normaliseInput() {
    let multiplier = 100 / this.state.weight;
    
    // normalised values (for 100grams)
    const resultObj = {
      normalenergy: (this.state.energy * multiplier).toFixed(0),
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
              <input type="number" name="weight" onChange={this.handleChange} min='0.0' step='0.1' placeholder='grams' required/>
            </label>
            <br></br>
            <label>
              Energy:
              <input type="number" name="energy" onChange={this.handleChange} min='0.0' step='0.1' placeholder='kcal' required/>
            </label>
            <br></br>
            <label>
              Total Fat:
              <input type="number" name="fat" onChange={this.handleChange} min='0.0' step='0.1' placeholder='grams' required/>
            </label>
            <br></br>
            <label>
              Saturates:
              <input type="number" name="saturates" onChange={this.handleChange} min='0.0' step='0.1' placeholder='grams' required/>
            </label>
            <br></br>
            <label>
              Sugars:
              <input type="number" name="sugars" onChange={this.handleChange} min='0.0' step='0.1' placeholder='grams' required/>
            </label>
            <br></br>
            <label>
              Salt:
              <input type="number" name="salt" onChange={this.handleChange} min='0.0' step='0.1' placeholder='grams' required/>
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
