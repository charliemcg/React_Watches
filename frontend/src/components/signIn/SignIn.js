import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { signInUser } from "../../actions/authActions";
import constants from "../../constants";
import strings from "./strings";
import "./styles/styles.css";

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
    const userData = {
      query: `query {
        signIn(email: "${emailRef.current.value}", password: "${passwordRef.current.value}") {
          success
          token
          errors {
            email
            password
          }
        }
      }`,
    };
    props.signInUser(userData);
  };

  const detailsArr = [
    { id: "email", type: "email", ref: emailRef },
    { id: "password", type: "password", ref: passwordRef },
  ];

  const getInputs = detailsArr.map((e) => {
    return (
      <div className="signin-input-wrapper">
        <div id="signin-label">
          <label htmlFor={e.id}>{strings[e.id]}</label>
        </div>
        <input
          ref={e.ref}
          type={e.type}
          //Give input a red border if input invalid
          id={
            errors !== undefined && errors[e.id]
              ? "signin-input-with-error"
              : "signin-input"
          }
        />
        <div id="signin-error">{errors !== undefined && errors[e.id]}</div>
      </div>
    );
  });

  return (
    <div id="signin-master-wrapper">
      <div id="signin-content-wrapper">
        <div id="signin-title">{strings.signInBelow}</div>
        <div id="signin-signup">
          {strings.dontHaveAnAccount}{" "}
          <Link to={constants.routes.SIGN_UP} id="signin-signup-btn">
            {strings.signUp}
          </Link>
        </div>
        <div id="signin-form">
          {getInputs}
          <div className="signin-input-wrapper">
            <div id="signin-btn-wrapper">
              <button type="submit" id="signin-btn" onClick={onSubmit}>
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
