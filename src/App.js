import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

// const removeCartItem = id => (
//   <CartContext.Consumer>
//     {value => {
//       const {cartList} = value
//       const cartItemsAfterRemoving = cartList.filter(i => i.id !== id)
//       this.setState({cartList: cartItemsAfterRemoving})
//     }}
//   </CartContext.Consumer>
// )

class App extends Component {
  state = {
    cartList: [],
  }

  removeAllItems = () => {
    this.setState({cartList: []})
  }

  //   removeCartItem = id => {
  //     const {cartList} = this.state
  //     const cartItemsAfterRemoving = cartList.filter(i => i.id !== id)
  //     this.setState({cartList: cartItemsAfterRemoving})
  //   }

  removeCartItem = id => (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        const cartItemsAfterRemoving = cartList.filter(i => i.id !== id)
        this.setState({cartList: cartItemsAfterRemoving})
      }}
    </CartContext.Consumer>
  )

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updatedList = cartList.map(i => {
      if (i.id === id) {
        return {...i, quantity: i.quantity + 1}
      }
      return i
    })
    this.setState({cartList: updatedList})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updatedList = cartList.map(i => {
      if (i.id === id) {
        return {
          ...i,
          quantity: i.quantity === 1 ? this.removeCartItem(id) : i.quantity - 1,
        }
      }
      return i
    })
    this.setState({cartList: updatedList})
  }

  addCartItem = (product, q) => {
    const {cartList} = this.state
    const itemInCard = cartList.find(i => i.id === product.id)
    if (itemInCard === undefined) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      const s = cartList.map(i => {
        if (i.id === product.id) {
          return {...i, quantity: i.quantity + q}
        }
        return i
      })
      this.setState({cartList: s})
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeAllCartItems: this.removeAllItems,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
