import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { signInUser } from "../../actions/authActions";
import constants from "../../constants";
import strings from "./strings";

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push(constants.routes.DASHBOARD);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push(constants.routes.DASHBOARD);
    }
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
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.signInUser(userData);
  };
  render() {
    const { errors } = this.state;
    return (
      <div>
        <div>
          <Link to={constants.routes.HOME}>{strings.backToHome}</Link>
          <div>
            <h4>
              <b>{strings.signIn}</b> {strings.below}
            </h4>
            <p>
              {strings.dontHaveAnAccount}{" "}
              <Link to={constants.routes.SIGN_UP}>{strings.signUp}</Link>
            </p>
          </div>
          <form noValidate onSubmit={this.onSubmit}>
            <div>
              <input
                onChange={this.onChange}
                value={this.state.email}
                error={errors.email}
                id="email"
                type="email"
              />
              <label htmlFor="email">{strings.email}</label>
              <span>
                {errors.email}
                {errors.emailnotfound}
              </span>
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
              <span>
                {errors.password}
                {errors.passwordincorrect}
              </span>
            </div>
            <div>
              <button type="submit">{strings.signInCapitalized}</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
SignIn.propTypes = {
  signInUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { signInUser })(SignIn);
