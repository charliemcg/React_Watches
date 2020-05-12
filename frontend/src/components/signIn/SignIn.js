import React, { Component, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { signInUser } from "../../actions/authActions";
import constants from "../../constants";
import strings from "./strings";
import styles from "./styles";

// class SignIn extends Component {
//   constructor() {
//     super();
//     this.state = {
//       email: "",
//       password: "",
//       errors: {},
//     };
//     this.emailRef = React.createRef();
//   }

//   componentDidMount() {
//     if (this.props.auth.isAuthenticated) {
//       this.props.history.push(constants.routes.HOME);
//     } else {
//       this.emailRef.current.focus();
//     }
//   }

//   componentWillReceiveProps(nextProps) {
//     if (nextProps.auth.isAuthenticated) {
//       this.props.history.push(constants.routes.HOME);
//     }
//     if (nextProps.errors) {
//       this.setState({
//         errors: nextProps.errors,
//       });
//     }
//   }

//   onChange = (e) => {
//     this.setState({ [e.target.id]: e.target.value });
//   };

//   onSubmit = (e) => {
//     e.preventDefault();
//     const userData = {
//       email: this.state.email,
//       password: this.state.password,
//     };
//     this.props.signInUser(userData);
//   };

//   render() {
//     const { errors } = this.state;
//     const detailsArr = [
//       { id: "email", type: "email" },
//       { id: "password", type: "password" },
//     ];
//     const getInputs = detailsArr.map((e) => {
//       return (
//         <div style={styles.inputWrapper}>
//           <div style={styles.label}>
//             <label htmlFor={e.id}>{strings[e.id]}</label>
//           </div>
//           <input
//             ref={e.id === "email" && this.emailRef}
//             onChange={this.onChange}
//             value={this.state[e.id]}
//             error={errors[e.id]}
//             id={e.id}
//             type={e.type}
//             //Give input a red border in input invalid
//             style={errors[e.id] ? styles.inputWithError : styles.input}
//           />
//           <div style={styles.error}>{errors[e.id]}</div>
//         </div>
//       );
//     });
//     return (
//       <div style={styles.masterWrapper}>
//         <div style={styles.contentWrapper}>
//           <div style={styles.title}>{strings.signInBelow}</div>
//           <div style={styles.signUp}>
//             {strings.dontHaveAnAccount}{" "}
//             <Link to={constants.routes.SIGN_UP} style={styles.signUpBtn}>
//               {strings.signUp}
//             </Link>
//           </div>
//           <div style={styles.form}>
//             {getInputs}
//             <div style={styles.inputWrapper}>
//               <div style={styles.btnWrapper}>
//                 <button
//                   type="submit"
//                   style={styles.btn}
//                   onClick={this.onSubmit}
//                 >
//                   {strings.signIn}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// SignIn.propTypes = {
//   signInUser: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired,
//   errors: PropTypes.object.isRequired,
// };

// const mapStateToProps = (state) => ({
//   auth: state.auth,
//   errors: state.errors,
// });

// export default connect(mapStateToProps, { signInUser })(SignIn);

function SignIn() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [userDetails, setUserDetails] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  // componentDidMount() {
  //   if (this.props.auth.isAuthenticated) {
  //     this.props.history.push(constants.routes.HOME);
  //   } else {
  //     this.emailRef.current.focus();
  //   }
  // }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.auth.isAuthenticated) {
  //     this.props.history.push(constants.routes.HOME);
  //   }
  //   if (nextProps.errors) {
  //     this.setState({
  //       errors: nextProps.errors,
  //     });
  //   }
  // }

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    signInUser(userData);
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
          error={errors[e.id]}
          id={e.id}
          type={e.type}
          //Give input a red border in input invalid
          style={errors[e.id] ? styles.inputWithError : styles.input}
        />
        <div style={styles.error}>{errors[e.id]}</div>
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

export default SignIn;

// SignIn.propTypes = {
//   signInUser: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired,
//   errors: PropTypes.object.isRequired,
// };

// const mapStateToProps = (state) => ({
//   auth: state.auth,
//   errors: state.errors,
// });

// export default connect(mapStateToProps, { signInUser })(SignIn);
