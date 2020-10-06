import React, { Component } from 'react';
import axios from 'axios';

const Item = props => (
  <tr>
    <td>{props.item.label}</td>
    <td>{props.item.price}</td>
    <td>
        <input type="number" placeholder={0} ></input>
        <input type='submit' value="Enter" onClick={() => { props.addQuantity(props.item._id)}}></input>
    </td>
    <td>
      <input type='submit' value="Delete" onClick={() => { props.deleteItem(props.item._id) }}></input>
    </td>
  </tr>
)

export default class CheckoutPage extends Component {
  constructor(props) {
    super(props);
    this.addQuantity = this.addQuantity.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.state = {items: [],
                  total: 0.00};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/items/')
    .then(response => {
      this.setState({ items: response.data});
    })
    .catch((error) => {
       console.log(error);
    })
  }

  addQuantity(e) {
    this.setState({
      total: e.target.value
    });
  }
  deleteItem(id) {
    axios.delete('http://localhost:5000/items/deleteitem/'+id)
      .then(res => console.log(res.data));
    this.setState({
      items: this.state.items.filter(el => el._id !== id)
      
    });
    console.log(this.state.total)
  }
 
  onSubmit(e) {
    e.preventDefault()
    
  }
  itemList() {
    return this.state.items.map(currentitem => {
      return <Item item={currentitem} addQuantity={this.addQuantity} deleteItem={this.deleteItem} key={currentitem._id}/>;
    })
  }
  render() {
    return (
      <div>
      <h1>Checkout Items</h1>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Label</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Delete From Database</th>
          </tr>
        </thead>
        <tbody>
          { this.itemList() }
        </tbody>
      </table>

    </div>
    )
  }
}