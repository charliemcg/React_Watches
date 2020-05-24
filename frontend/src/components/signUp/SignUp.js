import React, { useState, useRef, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { signUpUser } from "../../actions/authActions";
import constants from "../../constants";
import strings from "./strings";
// import styles from "./styles";
import styles from "./styles.module.css";

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
    // const newUser = {
    //   firstname: firstnameRef.current.value,
    //   lastname: lastnameRef.current.value,
    //   email: emailRef.current.value,
    //   password: passwordRef.current.value,
    //   password2: password2Ref.current.value,
    //   address: addressRef.current.value,
    //   phone: phoneRef.current.value,
    // };
    const newUser = {
      // query: `
      //   mutation CreateUser($firstname: String!, $lastname: String!, $email: String!, $password: String!, $password2: String!, address: String!, phone: String!) {
      //     createUser(userInput: {firstname: $firstname, lastname: $lastname, email: $email, password: $password, password2: $password2, address: $address, phone: $phone}) {
      //       _id
      //     }
      //   }
      // `,
      // query: `
      //   mutation
      //     createUser(userInput: {firstname: ${firstnameRef.current.value}, lastname: ${lastnameRef.current.value}, email: ${emailRef.current.value}, password: ${passwordRef.current.value}, password2: ${password2Ref.current.value}, address: ${addressRef.current.value}, phone: ${phoneRef.current.value}}) {
      //       _id
      //     }
      //   }
      // `,
      query: `
        mutation {
          createUser(userInput: {firstname: Test, lastname: User8, email: test@user8.com, password: testuser8, password2: testuser8, address: khlkajshdflksjhdfk, phone: 123456789}) {
            _id
          }
        }
      `,
      // variables: {
      //   firstname: firstnameRef.current.value,
      //   lastname: lastnameRef.current.value,
      //   email: emailRef.current.value,
      //   password: passwordRef.current.value,
      //   password2: password2Ref.current.value,
      //   address: addressRef.current.value,
      //   phone: phoneRef.current.value,
      // },
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
      <div className={styles.inputWrapper}>
        <div className={styles.label}>
          <label htmlFor={e.id}>{strings[e.id]}</label>
        </div>
        <input
          ref={e.ref}
          error={errors[e.id]}
          id={e.id}
          type={e.type}
          className={styles.input}
          //Give input a red border in input invalid
          style={errors[e.id] && { border: "2px solid red" }}
        />
        <div className={styles.error}>{errors[e.id]}</div>
      </div>
    );
  });

  return (
    <div className={styles.masterWrapper}>
      <div className={styles.contentWrapper}>
        <div className={styles.title}>{strings.signUpBelow}</div>
        <div className={styles.signIn}>
          {strings.alreadyHaveAnAccount}{" "}
          <Link to={constants.routes.SIGN_IN} className={styles.signInBtn}>
            {strings.signIn}
          </Link>
        </div>
        <div classname={styles.form}>
          {getInputs}
          <div className={styles.inputWrapper}>
            <div className={styles.btnWrapper}>
              <button type="submit" className={styles.btn} onClick={onSubmit}>
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
