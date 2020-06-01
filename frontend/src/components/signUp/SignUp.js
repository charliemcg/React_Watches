import React, { useState, useRef, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { signUpUser } from "../../actions/authActions";
import constants from "../../constants";
import strings from "./strings";
// import styles from "./styles";
// import styles from "./styles.module.css";
import "./styles/styles.css";

function SignUp(props) {
  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const password2Ref = useRef();
  const addressRef = useRef();
  const phoneRef = useRef();
  const [errors, setErrors] = useState({});

  useEffect(
    function () {
      if (props.auth.isAuthenticated) {
        props.history.push(constants.routes.DASHBOARD);
      } else {
        firstnameRef.current.focus();
      }
      if (props.errors) setErrors(props.errors);
    },
    [props.errors, props.auth.isAuthenticated, props.history]
  );

  const onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      query: `
        mutation {
          signUp(userInput: {
            firstname: "${firstnameRef.current.value}",
            lastname: "${lastnameRef.current.value}",
            email: "${emailRef.current.value}",
            password: "${passwordRef.current.value}",
            password2: "${password2Ref.current.value}",
            address: "${addressRef.current.value}",
            phone: "${phoneRef.current.value}"
          }) 
          {
            success
            errors {
              firstname
              lastname
              email
              password
              address
              phone
            }
          }
        }
      `,
    };
    props.signUpUser(newUser, props.history);
  };

  const detailsArr = [
    { id: "firstname", type: "text", ref: firstnameRef },
    { id: "lastname", type: "text", ref: lastnameRef },
    { id: "email", type: "email", ref: emailRef },
    { id: "address", type: "address", ref: addressRef },
    { id: "password", type: "password", ref: passwordRef },
    { id: "password2", type: "password", ref: password2Ref },
    { id: "phone", type: "text", ref: phoneRef },
  ];

  const getInputs = detailsArr.map((e) => {
    return (
      <div
        id="signup-input-wrapper"
        // className={styles.inputWrapper}
      >
        <div
          id="signup-label"
          // className={styles.label}
        >
          <label htmlFor={e.id}>{strings[e.id]}</label>
        </div>
        <input
          ref={e.ref}
          error={errors[e.id]}
          id={e.id}
          type={e.type}
          // className={styles.input}
          //Give input a red border in input invalid
          // style={errors[e.id] && { border: "2px solid red" }}
          //Give input a red border if input invalid
          id={
            errors !== undefined && errors[e.id]
              ? "signup-input-with-error"
              : "signup-input"
          }
        />
        <div
          id="signup-error"
          // className={styles.error}
        >
          {errors[e.id]}
        </div>
      </div>
    );
  });

  return (
    <div
      id="signup-master-wrapper"
      // className={styles.masterWrapper}
    >
      <div
        id="signup-content-wrapper"
        // className={styles.contentWrapper}
      >
        <div
          id="signup-title"
          // className={styles.title}
        >
          {strings.signUpBelow}
        </div>
        <div
          id="signup-signin"
          // className={styles.signIn}
        >
          {strings.alreadyHaveAnAccount}{" "}
          <Link
            to={constants.routes.SIGN_IN}
            id="signup-signin-btn"
            // className={styles.signInBtn}
          >
            {strings.signIn}
          </Link>
        </div>
        <div
          id="signup-form"
          // classname={styles.form}
        >
          {getInputs}
          <div
            id="signup-input-wrapper"
            // className={styles.inputWrapper}
          >
            <div
              id="signup-btn-wrapper"
              // className={styles.btnWrapper}
            >
              <button
                type="submit"
                id="signup-btn"
                // className={styles.btn}
                onClick={onSubmit}
              >
                {strings.signUp}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
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
