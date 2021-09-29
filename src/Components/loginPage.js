import React from "react";
import axios from "axios";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: " ",
      password: "",
    };
  }
  handleChange = (event, key) => {
    let value = event.target.value;

    this.setState({
      [key]: value,
    });
  };
  handleLogin = (event) => {
    event.preventDefault();
    axios({
      url: "https://zealedshock.backendless.app/api/users/login",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        login: this.state.email,
        password: this.state.password,
      },
    })
      .then((response) => {
        sessionStorage.setItem("user-token", response.data["user-token"]);
        alert("You are sucessfully Logged in Happy Shopping !!!");
        window.location.href = "/Shopping";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <>
        <h1>Login Here</h1>
        <div style={{ width: "500px", margin: "0px auto" }}>
          <form>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                value={this.state.email}
                onChange={(event) => {
                  this.handleChange(event, "email");
                }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={this.state.password}
                onChange={(event) => {
                  this.handleChange(event, "password");
                }}
              />
            </div>

            <button className="btn btn-primary" onClick={this.handleLogin}>
              Login
            </button>
            <p>
              Don't have an account ? <a href="signup">Singup here</a>
            </p>
          </form>
        </div>
      </>
    );
  }
}

export default LoginPage;
