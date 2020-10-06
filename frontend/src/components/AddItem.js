import React, { Component } from 'react'
import '../App.css'
const axios = require('axios')


export default class AddItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: '',
      price: 0.0
      
    }
    this.onChangelabel = this.onChangelabel.bind(this)
    this.onChangePrice = this.onChangePrice.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    this.setState({ 
      label: 'empty',
      price: 0.00
    });
  }

  onChangelabel(e) {
    this.setState({
      label: e.target.value
    });
  }
  onChangePrice(e) {
    this.setState({
      price: e.target.value
    });
  }
 
  onSubmit(e) {
    e.preventDefault()
    const newItem = {
      label: this.state.label,
      price: this.state.price
    };
    console.log(newItem)
    axios.post('https://csc301-assignment1-web.herokuapp.com/items/additem', newItem)
    .then(res => console.log(res.data))
    .catch(function (error) {
      console.log(error);
    })
    this.setState({
      label: 'empty',
      price: 0
    })
    window.location.reload()
  }
  render() {
    return (
      <div className="addComponent" >
        <h1>Create new Checkout Item</h1>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>New Item Name:
              <input type="text" 
              className="form-control"
              value={this.state.label}
              onChange={this.onChangelabel} />
            </label>
          </div>
          
          <div className="form-group">
            <label>Price($) (Please Enter 2 decimal Places): 
                <input 
                type="text" 
                className="form-control"
                value={this.state.price}
                onChange={this.onChangePrice}
                />
            </label>
          </div>
          <div className="form-group">
            <input type="submit" 
            value="Create new Checkout Item" 
            className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}