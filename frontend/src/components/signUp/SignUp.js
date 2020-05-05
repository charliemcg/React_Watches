import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { signUpUser } from "../../actions/authActions";
import constants from "../../constants";
import strings from "./strings";
import styles from "./styles";

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
    this.firstNameRef = React.createRef();
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push(constants.routes.DASHBOARD);
    } else {
      this.firstNameRef.current.focus();
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
      <div style={styles.masterWrapper}>
        <div style={styles.contentWrapper}>
          <div style={styles.title}>{strings.signUpBelow}</div>
          <div style={styles.signIn}>
            {strings.alreadyHaveAnAccount}{" "}
            <Link to={constants.routes.SIGN_IN} style={styles.signInBtn}>
              {strings.signIn}
            </Link>
          </div>
          {/* TODO might not need this form */}
          <form noValidate onSubmit={this.onSubmit} style={styles.form}>
            <div style={styles.inputWrapper}>
              <div style={styles.label}>
                <label htmlFor="firstname">{strings.firstName}</label>
              </div>
              <input
                ref={this.firstNameRef}
                onChange={this.onChange}
                value={this.state.firstname}
                error={errors.firstname}
                id="firstname"
                type="text"
                style={styles.input}
              />
              <span>{errors.firstname}</span>
            </div>
            <div style={styles.inputWrapper}>
              <div style={styles.label}>
                <label htmlFor="lastname">{strings.lastName}</label>
              </div>
              <input
                onChange={this.onChange}
                value={this.state.lastname}
                error={errors.lastname}
                id="lastname"
                type="text"
                style={styles.input}
              />
              <span>{errors.lastname}</span>
            </div>
            <div style={styles.inputWrapper}>
              <div style={styles.label}>
                <label htmlFor="email">{strings.email}</label>
              </div>
              <input
                onChange={this.onChange}
                value={this.state.email}
                error={errors.email}
                id="email"
                type="email"
                style={styles.input}
              />
              <span>{errors.email}</span>
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
              <span>{errors.password}</span>
            </div>
            <div style={styles.inputWrapper}>
              <div style={styles.label}>
                <label htmlFor="password2">{strings.confirmPassword}</label>
              </div>
              <input
                onChange={this.onChange}
                value={this.state.password2}
                error={errors.password2}
                id="password2"
                type="password"
                style={styles.input}
              />
              <span>{errors.password2}</span>
            </div>
            <div style={styles.inputWrapper}>
              <div style={styles.label}>
                <label htmlFor="address">{strings.address}</label>
              </div>
              <input
                onChange={this.onChange}
                value={this.state.address}
                error={errors.address}
                id="address"
                type="text"
                style={styles.input}
              />
              <span>{errors.address}</span>
            </div>
            <div style={styles.inputWrapper}>
              <div style={styles.label}>
                <label htmlFor="phone">{strings.phone}</label>
              </div>
              <input
                onChange={this.onChange}
                value={this.state.phone}
                error={errors.phone}
                id="phone"
                type="text"
                style={styles.input}
              />
              <span>{errors.phone}</span>
            </div>
            <div style={styles.inputWrapper}>
              <div style={styles.btnWrapper}>
                <button type="submit" style={styles.btn}>
                  {strings.signUp}
                </button>
              </div>
            </div>
          </form>
        </div>
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
