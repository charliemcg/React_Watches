import React, { Component } from "react";

// export default class FourOhFour extends Component {
//   render() {
//     return (
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//         }}
//       >
//         <h1
//           style={{
//             width: "75%",
//           }}
//         >
//           404 Page not found...
//         </h1>
//       </div>
//     );
//   }
// }

export default function FourOhFour() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <h1
        style={{
          width: "75%",
        }}
      >
        404 Page not found...
      </h1>
    </div>
  );
}
