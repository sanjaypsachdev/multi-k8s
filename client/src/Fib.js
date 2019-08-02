import React, { Component } from 'react';
import axios from 'axios';

class Fib extends Component {
  state = {
    seenIndexes: [],
    values: {},
    index: ''
  };

  async fetchAll() {
    const values =  await axios.get('/api/values/current');
    const seenIndexes =  await axios.get('/api/values/all');
    if ((seenIndexes && Array.isArray(seenIndexes.data)) && (values && typeof values.data === 'object')) {
      this.setState(() => ({
        seenIndexes: seenIndexes.data,
        values: values.data,
        index:''
      }));
    }
  }

  async fetchValues() {
    const values =  await axios.get('/api/values/current');
    if (values && typeof values.data === 'object') {
      this.setState(() =>  ({
        values: values.data
      }));
    }
  }

  async fetchIndexes() {
    const seenIndexes =  await axios.get('/api/values/all');
    if (seenIndexes && Array.isArray(seenIndexes.data)) {
      this.setState(() =>  ({
        seenIndexes: seenIndexes.data
      }));
    }
  }

  componentDidMount() {
    this.fetchAll();
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    await axios.post('/api/values', {
      index: this.state.index
    });

    this.fetchAll();
  }

  renderSeenIndexes() {
    return this.state.seenIndexes.map(({ number }) => number).join(', ');
  }

  renderValues() {
    const entries = [];

    for (let key in this.state.values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {this.state.values[key]}
        </div>
      );
    }

    return entries;
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Enter your index: </label>
          <input
            value={this.state.index}
            onChange={event => this.setState({ index: event.target.value })}
          />
          <button>Submit</button>
        </form>

        <h3>Indexes i have seen:</h3>
        {this.renderSeenIndexes()}

        <h3>Calculated Values:</h3>
        {this.renderValues()}
      </div>
    );
  }
}

export default Fib;