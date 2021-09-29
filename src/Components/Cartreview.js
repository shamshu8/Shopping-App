import axios from "axios";
import React from "react";
import { Quantity } from "./Quantity";

class Cartreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartInfo: undefined,
    };
  }

  componentDidMount() {
    axios({
      url: `https://api.chec.io/v1/carts/${localStorage.getItem("cartID")}`,
      method: "GET",
      headers: {
        "X-Authorization": "pk_33667a0cf86135ae518661f63d52da5e1c600da1e1b49",
      },
    })
      .then((response) => {
        this.setState({
          cartInfo: response.data,
        });
      })
      .catch(() => {});
  }
  removeItems = (lineItemsID) => {
    axios({
      url: `https://api.chec.io/v1/carts/${localStorage.getItem(
        "cartID"
      )}/items/${lineItemsID}`,
      method: "DELETE",
      headers: {
        "X-Authorization": "pk_33667a0cf86135ae518661f63d52da5e1c600da1e1b49",
      },
    })
      .then((response) => {
        this.setState({
          cartInfo: response.data.cart,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <h4>Review your cart</h4>
        {this.state.cartInfo && (
          <div>
            {this.state.cartInfo.line_items.map((lineItems) => {
              return (
                <div style={{ display: "flex" }}>
                  <div className="card mb-3" style={{ maxWidth: "300px" }}>
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img
                          src={lineItems.media.source}
                          className="img-fluid rounded-start"
                          alt="..."
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">{lineItems.name}</h5>
                          <p>
                            {" "}
                            Quantity : <Quantity />{" "}
                          </p>
                          <p>
                            Price per qty :{" "}
                            {lineItems.price.formatted_with_symbol}
                          </p>
                          <p>
                            Total Price :
                            {lineItems.line_total.formatted_with_symbol}
                          </p>

                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              this.removeItems(lineItems.id);
                            }}
                          >
                            Remove item
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <button className="btn btn-warning">checkout</button>
      </div>
    );
  }
}

export default Cartreview;
