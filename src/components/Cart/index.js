import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const showEmptyView = cartList.length === 0

      const removeItemsOnClick = () => {
        removeAllCartItems()
      }

      const listOfPrices = cartList.map(i => i.price * i.quantity)
      const cartSum = listOfPrices.reduce((partialSum, a) => partialSum + a, 0)

      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                <button
                  className="remove-all-btn"
                  onClick={removeItemsOnClick}
                  data-testid="remove"
                >
                  Remove All
                </button>
                <CartListView />
                <div className="cart-details">
                  <h1>
                    Order Total:{' '}
                    <span className="total-price">Rs {cartSum}</span>
                  </h1>
                  <p>{cartList.length} items in cart</p>
                  <button className="checkout-btn">Checkout</button>
                </div>
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
