import React, { Component } from 'react';

export default class CheckoutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemName: '',
      price: 0.0
      
    }
    this.onChangeItemName = this.onChangeItemName.bind(this)
    this.onChangePrice = this.onChangePrice.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    this.setState({ 
      itemName: 'apple',
      price: 1.99
    });
  }

  onChangeItemName(e) {
    this.setState({
      itemName: e.target.value
    });
  }
  onChangePrice(e) {
    this.setState({
      price: e.target.value
    });
  }
 
  onSubmit(e) {
    e.preventDefault();
    const newItem = {
      itemName: this.state.itemName,
      price: this.state.price
    };
  }
  render() {
    return (
      <div>
        <h1>Create new Checkout Item</h1>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>New Item Name:
              <input type="text" 
              className="form-control"
              value={this.state.itemName}
              onChange={this.onChangeItemName} />
            </label>
          </div>
          
          <div className="form-group">
            <label>Price($): 
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