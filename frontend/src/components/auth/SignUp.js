import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { signUpUser } from "../../actions/authActions";

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      password2: "",
      address: "",
      phone: "",
      errors: {},
    };
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      address: this.state.address,
      phone: this.state.phone,
    };
    this.props.registerUser(newUser, this.props.history);
  };
  render() {
    const { errors } = this.state;
    return (
      <div>
        <Link to="/">Back to home</Link>
        <div style={{ paddingLeft: "11.250px" }}>
          <h4>
            <b>Register</b> below
          </h4>
          <p>
            Already have an account? <Link to="/signIn">Sign in</Link>
          </p>
        </div>
        <form noValidate onSubmit={this.onSubmit}>
          <div>
            <input
              onChange={this.onChange}
              value={this.state.firstname}
              error={errors.firstname}
              id="firstname"
              type="text"
            />
            <label htmlFor="firstname">First Name</label>
            <span>{errors.firstname}</span>
          </div>
          <div>
            <input
              onChange={this.onChange}
              value={this.state.lastname}
              error={errors.lastname}
              id="lastname"
              type="text"
            />
            <label htmlFor="lastname">Last Name</label>
            <span>{errors.lastname}</span>
          </div>
          <div>
            <input
              onChange={this.onChange}
              value={this.state.email}
              error={errors.email}
              id="email"
              type="email"
            />
            <label htmlFor="email">Email</label>
            <span>{errors.email}</span>
          </div>
          <div>
            <input
              onChange={this.onChange}
              value={this.state.password}
              error={errors.password}
              id="password"
              type="password"
            />
            <label htmlFor="password">Password</label>
            <span>{errors.password}</span>
          </div>
          <div>
            <input
              onChange={this.onChange}
              value={this.state.password2}
              error={errors.password2}
              id="password2"
              type="password"
            />
            <label htmlFor="password2">Confirm Password</label>
            <span>{errors.password2}</span>
          </div>
          <div>
            <input
              onChange={this.onChange}
              value={this.state.address}
              error={errors.address}
              id="address"
              type="text"
            />
            <label htmlFor="address">Address</label>
            <span>{errors.address}</span>
          </div>
          <div>
            <input
              onChange={this.onChange}
              value={this.state.phone}
              error={errors.phone}
              id="phone"
              type="text"
            />
            <label htmlFor="phone">Phone</label>
            <span>{errors.phone}</span>
          </div>
          <div style={{ paddingLeft: "11.250px" }}>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem",
              }}
              type="submit"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    );
  }
}
SignUp.propTypes = {
  signUpUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { signUpUser })(withRouter(SignUp));
