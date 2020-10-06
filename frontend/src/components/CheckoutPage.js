<<<<<<< HEAD
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
                  subtotal: 0.00,
                  total: 0.00,
                  tax: 0.00,
                  discount: 0.00};
  }

  componentDidMount() {
    axios.get('https://csc301-assignment1-web.herokuapp.com/')
    .then(response => {
      this.setState({ items: response.data});
    })
    .catch((error) => {
       console.log(error);
    })
  }

  calculateTotal() {
    let tempTotal = 0
    this.state.items.map(currentitem =>{
      let quantity = parseInt(document.getElementById(currentitem._id).value)
      tempTotal += (currentitem.price * quantity)
      return tempTotal
    })
    let discountValue = parseInt(document.getElementById('discountValue').value)
    let tempDiscount = roundTo((discountValue*tempTotal)/100.00, 2)
    let taxValue = parseInt(document.getElementById('taxValue').value)
    let tempTax = roundTo((taxValue*(tempTotal-tempDiscount))/100.00, 2)
    this.setState({
      subtotal: roundTo(tempTotal, 2), 
      discount: roundTo(tempDiscount, 2),
      tax: roundTo(tempTax, 2),
      total: roundTo(tempTotal + tempTax - tempDiscount, 2) 
    })
  }
  
  deleteItem(id) {
    axios.delete('https://csc301-assignment1-web.herokuapp.com/deleteitem/'+id)
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
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Extra Calculation Type</th>
            <th>Percentage</th>
            <th>Cost</th>           
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Discount(Applied Before Tax)</td>
            <td>
              <input type="number" id="discountValue" placeholder={0} defaultValue={0}></input>
            </td>
            <td><label type="number" id="discount">{this.state.discount * -1} </label></td>
          </tr>
          <tr>
            <td>Tax (Applied After Discount)</td>
            <td>
              <input type="number" id="taxValue" placeholder={0} defaultValue={0}></input>
            </td>
            <td><label type="number" id="tax">{this.state.tax} </label></td>
          </tr>
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
=======
import React, { Component } from 'react';
import axios from 'axios';
import calculate from '../actions/calculate'


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
                  subtotal: 0.00,
                  total: 0.00,
                  tax: 0.00,
                  discount: 0.00};
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

  calculateTotal() {
    let tempTotal = 0
    this.state.items.map(currentitem =>{
      let quantity = parseInt(document.getElementById(currentitem._id).value)
      tempTotal += calculate.addQuantityItem(quantity, currentitem.price)
      return tempTotal
    })
    let discountValue = parseInt(document.getElementById('discountValue').value)
    let tempDiscount = calculate.calculateDiscount(discountValue,tempTotal)
    console.log(tempDiscount)
    let taxValue = parseInt(document.getElementById('taxValue').value)
    let tempTax = calculate.calculateTax(taxValue,tempTotal,tempDiscount)
    let total = calculate.calculateTotal(tempTax, tempTotal, tempDiscount)
    this.setState({
      subtotal: tempTotal, 
      discount: tempDiscount,
      tax: tempTax, 
      total: total
    })
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
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Extra Calculation Type</th>
            <th>Percentage</th>
            <th>Cost</th>           
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Discount(Applied Before Tax)</td>
            <td>
              <input type="number" id="discountValue" placeholder={0} defaultValue={0}></input>
            </td>
            <td><label type="number" id="discount">{this.state.discount * -1} </label></td>
          </tr>
          <tr>
            <td>Tax (Applied After Discount)</td>
            <td>
              <input type="number" id="taxValue" placeholder={0} defaultValue={0}></input>
            </td>
            <td><label type="number" id="tax">{this.state.tax} </label></td>
          </tr>
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
>>>>>>> 621172f56b4edf926a125e49e111690860741526
