import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { signInUser } from "../../actions/authActions";
import constants from "../../constants";
import strings from "./strings";
import styles from "./styles";

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
    this.emailRef = React.createRef();
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push(constants.routes.DASHBOARD);
    } else {
      this.emailRef.current.focus();
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
      <div style={styles.masterWrapper}>
        <div style={styles.contentWrapper}>
          <div style={styles.title}>{strings.signInBelow}</div>
          <div style={styles.signUp}>
            {strings.dontHaveAnAccount}{" "}
            <Link to={constants.routes.SIGN_UP} style={styles.signUpBtn}>
              {strings.signUp}
            </Link>
          </div>
          {/* TODO might not need this form */}
          <form noValidate onSubmit={this.onSubmit} style={styles.form}>
            <div style={styles.inputWrapper}>
              <div style={styles.label}>
                <label htmlFor="email">{strings.email}</label>
              </div>
              <input
                ref={this.emailRef}
                onChange={this.onChange}
                value={this.state.email}
                error={errors.email}
                id="email"
                type="email"
                style={styles.input}
              />
              <span>
                {errors.email}
                {errors.emailnotfound}
              </span>
            </div>
            <div style={styles.inputWrapper}>
              <div style={styles.label}>
                <label htmlFor="password">{strings.password}</label>
              </div>
              <input
                onChange={this.onChange}
                value={this.state.password}
                error={errors.password}
                id="password"
                type="password"
                style={styles.input}
              />
              <span>
                {errors.password}
                {errors.passwordincorrect}
              </span>
            </div>
            <div style={styles.inputWrapper}>
              <div style={styles.btnWrapper}>
                <button type="submit" style={styles.btn}>
                  {strings.signIn}
                </button>
              </div>
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
