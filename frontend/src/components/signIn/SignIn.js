import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { signInUser } from "../../actions/authActions";
import constants from "../../constants";
import strings from "./strings";
import styles from "./styles";

function SignIn(props) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [errors, setErrors] = useState();

  useEffect(
    function () {
      if (props.auth.isAuthenticated) {
        props.history.push(constants.routes.HOME);
      } else {
        emailRef.current.focus();
      }
      if (props.errors) setErrors(props.errors);
    },
    [props.errors, props.auth.isAuthenticated, props.history]
  );

  const onSubmit = (e) => {
    e.preventDefault();
    // const userData = {
    //   email: emailRef.current.value,
    //   password: passwordRef.current.value,
    // };
    const userData = {
      query: `query User($email: String!, $password: String!) {
        user(email: $email, password: $password) {
          _id
        }
      }`,
      variables: {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      },
    };
    props.signInUser(userData);
  };

  const detailsArr = [
    { id: "email", type: "email", ref: emailRef },
    { id: "password", type: "password", ref: passwordRef },
  ];

  const getInputs = detailsArr.map((e) => {
    return (
      <div style={styles.inputWrapper}>
        <div style={styles.label}>
          <label htmlFor={e.id}>{strings[e.id]}</label>
        </div>
        <input
          ref={e.ref}
          error={errors !== undefined && errors[e.id]}
          id={e.id}
          type={e.type}
          //Give input a red border in input invalid
          style={
            errors !== undefined && errors[e.id]
              ? styles.inputWithError
              : styles.input
          }
        />
        <div style={styles.error}>{errors !== undefined && errors[e.id]}</div>
      </div>
    );
  });
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
        <div style={styles.form}>
          {getInputs}
          <div style={styles.inputWrapper}>
            <div style={styles.btnWrapper}>
              <button type="submit" style={styles.btn} onClick={onSubmit}>
                {strings.signIn}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
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
