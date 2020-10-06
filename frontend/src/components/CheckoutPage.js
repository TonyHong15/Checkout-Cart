import React, { Component } from 'react';
import axios from 'axios';
const roundTo =require('round-to')

const Item = props => (
  <tr>
    <td>{props.item.label}</td>
    <td>{props.item.price}</td>
    <td>
        <input type="number" id={props.item._id} placeholder={0} defaultValue={0}></input>
    </td>
    <td>
      <input type='submit' value="Delete" onClick={() => { props.deleteItem(props.item._id) }}></input>
    </td>
  </tr>
)

export default class CheckoutPage extends Component {
  constructor(props) {
    super(props);
    this.calculateTotal = this.calculateTotal.bind(this);
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

  refreshTotal(){
    let tempTotal = 0
    this.state.items.map(currentitem =>{
      let quantity = document.getElementById(currentitem._id).value
      tempTotal += (currentitem.price * quantity)
    })
    this.setState({
      total: roundTo(tempTotal, 2)
    })
  }
  calculateTotal() {
    this.refreshTotal()
  }
  
  deleteItem(id) {
    axios.delete('http://localhost:5000/items/deleteitem/'+id)
      .then(res => console.log(res.data));
    this.setState({
      items: this.state.items.filter(el => el._id !== id)
      
    });
    window.location.reload()
  }
 
  itemList() {
    return this.state.items.map(currentitem => {
      return <Item item={currentitem}  deleteItem={this.deleteItem} key={currentitem._id}/>;
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
      <div>
          <input type="submit" value="Calculate Total" onClick={() => {this.calculateTotal()}}></input>
          <h3>Total Price for Items ($): {this.state.total}</h3>
      </div>
      <br></br>
    </div>
    )
  }
}