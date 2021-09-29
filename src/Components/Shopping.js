import axios from "axios";
import React from "react";
import CartInfo from "./CartInfo";

class Shopping extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      cartInfo: undefined,
      productAdded: [],
    };
  }

  loadProduct = () => {
    axios({
      url: "https://api.chec.io/v1/products",
      method: "GET",
      params: {
        limit: 50,
      },
      headers: {
        "X-Authorization": "pk_33667a0cf86135ae518661f63d52da5e1c600da1e1b49",
      },
    })
      .then((response) => {
        //console.log(response);
        this.setState({
          products: response.data.data,
        });
      })
      .catch((err) => {});
  };
  createCart = () => {
    if (localStorage.getItem("cartID") == null) {
      axios({
        url: "https://api.chec.io/v1/carts",
        method: "GET",
        headers: {
          "X-Authorization": "pk_33667a0cf86135ae518661f63d52da5e1c600da1e1b49",
        },
      })
        .then((response) => {
          console.log("cartId", response.data);

          const cartId = response.data.id;
          localStorage.setItem("cartID", cartId);

          this.setState({
            cartInfo: response.data,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios({
        url: `https://api.chec.io/v1/carts/${localStorage.getItem("cartID")}`,
        method: "GET",
        headers: {
          "X-Authorization": "pk_33667a0cf86135ae518661f63d52da5e1c600da1e1b49",
        },
      })
        .then((response) => {
          const mapProdcutId = response.data.line_items.map((lineItems) => {
            return lineItems.product_id;
          });
          this.setState({
            cartInfo: response.data,
            productAdded: mapProdcutId,
          });
        })
        .catch(() => {});
    }
  };

  componentDidMount() {
    this.loadProduct();
    this.createCart();
  }
  handleAddItem = (valueId) => {
    console.log(valueId);
    axios({
      url: `https://api.chec.io/v1/carts/${localStorage.getItem("cartID")}`,
      method: "POST",
      headers: {
        "X-Authorization": "pk_33667a0cf86135ae518661f63d52da5e1c600da1e1b49",
      },
      data: {
        id: valueId,
        quantity: 1,
      },
    })
      .then((response) => {
        const addedProduct = [
          ...this.state.productAdded,
          response.data.product_id,
        ];

        this.setState({
          cartInfo: response.data.cart,
          productAdded: addedProduct,
        });
      })
      .catch((error) => {});
  };

  handleLogout = () => {
    sessionStorage.clear();
    window.location.href = "/login";
  };

  render() {
    return (
      <>
        {sessionStorage.getItem("user-token") != null && (
          <button className="btn btn-danger" onClick={this.handleLogout}>
            Logout
          </button>
        )}

        {this.state.cartInfo && (
          <CartInfo
            total_unique_items={this.state.cartInfo.total_unique_items}
            formatted_with_symbol={
              this.state.cartInfo.subtotal.formatted_with_symbol
            }
          />
          // <div className="card" style={{ width: "18rem", margin: "0px auto" }}>
          //   <h4>Your Cart </h4>
          //   <p>Cart items : {this.state.cartInfo.total_unique_items}</p>
          //   <p>
          //     Cart Value : {this.state.cartInfo.subtotal.formatted_with_symbol}
          //   </p>
          //   <a href="/product/checkout">
          //     <button className="btn btn-warning">Review Cart</button>
          //   </a>
          // </div>
        )}
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {this.state.products.map((value, index) => {
            return (
              <div
                className="card"
                style={{ width: "18rem", margin: "20px" }}
                key={index}
              >
                <img
                  src={value.media.source}
                  className="card-img-top"
                  alt="..."
                  style={{ width: 250, height: 200 }}
                />
                <div className="card-body">
                  <h5 className="card-title">{value.name}</h5>
                  <p
                    className="card-text"
                    dangerouslySetInnerHTML={{ __html: value.description }}
                  ></p>
                  <p>Price : {value.price.formatted_with_symbol} </p>

                  {value.inventory.available ? (
                    <div>
                      {this.state.productAdded.includes(value.id) ? (
                        <button
                          className="btn btn-success"
                          onClick={() => {
                            this.handleAddItem(value.id);
                          }}
                        >
                          Added to Cart
                        </button>
                      ) : (
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            this.handleAddItem(value.id);
                          }}
                        >
                          Add to Cart
                        </button>
                      )}
                    </div>
                  ) : (
                    <p className="text-danger"> out of stock</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  }
}
export default Shopping;
