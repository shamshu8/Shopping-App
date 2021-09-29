import axios from "axios";
import React from "react";

class SignupPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
    };
  }

  handleChange = (event, key) => {
    let value = event.target.value;

    this.setState({
      [key]: value,
    });
  };
  handleClick = (event) => {
    event.preventDefault();
    axios({
      url: "https://zealedshock.backendless.app/api/users/register",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      },
    })
      .then((response) => {
        alert("You have sucessfully SingedUP, Thank you !");
        window.location.href = "/login";
      })
      .catch((err) => {
        alert("Please check your Passowrd !");
      });
  };

  render() {
    return (
      <>
        <h1>Signup Page</h1>
        <div
          style={{
            width: "500px",
            margin: "0px auto",
          }}
        >
          <form>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="Tex"
                className="form-control"
                value={this.state.name}
                onChange={(event) => {
                  this.handleChange(event, "name");
                }}
              />
              <label className="form-label">Email address </label>
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

            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.handleClick}
            >
              Signup
            </button>
            <p>
              Already have an account? <a href="login">login here</a>
            </p>
          </form>
        </div>
      </>
    );
  }
}

export default SignupPage;
