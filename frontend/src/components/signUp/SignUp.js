import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { signUpUser } from "../../actions/authActions";
import constants from "../../constants";
import strings from "./strings";

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
      this.props.history.push(constants.routes.DASHBOARD);
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
    this.props.signUpUser(newUser, this.props.history);
  };
  render() {
    const { errors } = this.state;
    return (
      <div>
        <div>
          <h4>
            <b>{strings.signUp}</b> {strings.below}
          </h4>
          <p>
            {strings.alreadyHaveAnAccount}{" "}
            <Link to={constants.routes.SIGN_IN}>{strings.signIn}</Link>
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
            <label htmlFor="firstname">{strings.firstName}</label>
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
            <label htmlFor="lastname">{strings.lastName}</label>
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
            <label htmlFor="email">{strings.email}</label>
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
            <label htmlFor="password">{strings.password}</label>
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
            <label htmlFor="password2">{strings.confirmPassword}</label>
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
            <label htmlFor="address">{strings.address}</label>
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
            <label htmlFor="phone">{strings.phone}</label>
            <span>{errors.phone}</span>
          </div>
          <div>
            <button type="submit">{strings.signUpCapitalized}</button>
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
