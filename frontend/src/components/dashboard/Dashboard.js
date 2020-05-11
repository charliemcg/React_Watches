import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

// class Dashboard extends Component {
//   onLogoutClick = (e) => {
//     e.preventDefault();
//     this.props.logoutUser();
//   };

//   render() {
//     const { user } = this.props.auth;
//     return (
//       <div style={{ height: "75vh" }}>
//         <div>
//           <div>
//             <h4 style={{ color: "pink" }}>
//               <b>Hey there,</b> {user.firstname}
//             </h4>
//             <button
//               style={{
//                 width: "150px",
//                 borderRadius: "3px",
//                 letterSpacing: "1.5px",
//                 marginTop: "1rem",
//                 color: "pink",
//               }}
//               onClick={this.onLogoutClick}
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
// Dashboard.propTypes = {
//   logoutUser: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired,
// };
// const mapStateToProps = (state) => ({
//   auth: state.auth,
// });
// export default connect(mapStateToProps, { logoutUser })(Dashboard);

function Dashboard() {
  const onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  const { user } = this.props.auth;
  return (
    <div style={{ height: "75vh" }}>
      <div>
        <div>
          <h4 style={{ color: "pink" }}>
            <b>Hey there,</b> {user.firstname}
          </h4>
          <button
            style={{
              width: "150px",
              borderRadius: "3px",
              letterSpacing: "1.5px",
              marginTop: "1rem",
              color: "pink",
            }}
            onClick={onLogoutClick}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);
