import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import { addItem, updateItem, removeItem } from './cartHelpers';
import { addItemWishList, removeItemWishList } from './wishListHelpers';

const Card = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  showAddToWishListButton = true,

  cartUpdate = false,
  showRemoveProductButton = false,
  showRemoveProductButtonWishList = false,
  setRun = f => f,
  run = undefined
  // changeCartSize
}) => {
  const [redirect, setRedirect] = useState(false);
  const [redirectToWishList, setRedirectWishList] = useState(false);
  const [count, setCount] = useState(product.count);

  const showViewButton = showViewProductButton => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`} className="mr-2">
          <button className="btn btn-outline-primary mt-2 mb-2 card-btn-1">View Product</button>
        </Link>
      )
    );
  };

  const addToCart = () => {
    // console.log('added');
    addItem(product, setRedirect(true));
  };

  const shouldRedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCartBtn = showAddToCartButton => {
    return (
      showAddToCartButton && (
        <button onClick={addToCart} className="btn btn-outline-warning m-2 mb-2 card-btn-1  ">
          Add to cart
        </button>
      )
    );
  };

  const addToWishList = () => {
    // console.log('added');
    addItemWishList(product, setRedirectWishList(true));
  };

  const shouldRedirectWishList = redirectToWishList => {
    if (redirectToWishList) {
      return <Redirect to="/wishlist" />;
    }
  };


  const showAddToWishListBtn = showAddToWishListButton => {
    return (
      showAddToWishListButton && (
        <button onClick={addToWishList} className="btn btn-outline-info mt-2 mb-2 card-btn-2  ">
          Add to Wishlist
        </button>
      )
    );
  };


  const showStock = quantity => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill">In Stock </span>
    ) : (
      <span className="badge badge-primary badge-pill">Out of Stock </span>
    );
  };

  const handleChange = productId => event => {
    setRun(!run); // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const showCartUpdateOptions = cartUpdate => {
    return (
      cartUpdate && (
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Adjust Quantity</span>
            </div>
            <input type="number" className="form-control" value={count} onChange={handleChange(product._id)} />
          </div>
        </div>
      )
    );
  };

  const showRemoveButton = showRemoveProductButton => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => {
            removeItem(product._id);
            setRun(!run); // run useEffect in parent Cart
          }}
          className="btn btn-outline-danger mt-2 mb-2"
        >
          Remove Product
        </button>
      )
    );
  };

  const showRemoveButtonWishList = showRemoveProductButtonWishList => {
    return (
      showRemoveProductButtonWishList && (
        <button
          onClick={() => {
            removeItemWishList(product._id);
            setRun(!run); // run useEffect in parent Cart
          }}
          className="btn btn-outline-danger mt-2 mb-2"
        >
          Remove Product
        </button>
      )
    );
  };

  return (
    <div className="card ">
      <div className="card-header card-header-1 ">{product.name}</div>
      <div className="card-body">
        {shouldRedirect(redirect)}
        {shouldRedirectWishList(redirectToWishList)}
        <ShowImage item={product} url="product" />
        <p className="card-p  mt-2">{product.description.substring(0, 100)} </p>
        <p className="card-p black-10">$ {product.price}</p>
        <p className="black-9">Category: {product.category && product.category.name}</p>
        <p className="black-8">Added on {moment(product.createdAt).fromNow()}</p>
        {showStock(product.quantity)}
        <br />

        {showViewButton(showViewProductButton)}

        {showAddToCartBtn(showAddToCartButton)}

        {showAddToWishListBtn(showAddToWishListButton)}

        {showRemoveButton(showRemoveProductButton)}

        {showRemoveButtonWishList(showRemoveProductButtonWishList)}

        {showCartUpdateOptions(cartUpdate)}
      </div>
    </div>
  );
};

export default Card;
