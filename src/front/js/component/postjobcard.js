// import React, { useContext } from "react";
// import { Context } from "../store/appContext";
// import PropTypes from "prop-types";
// import { useNavigate } from "react-router-dom";
// import "../../styles/postjobcard.css";
// export const PostJobCard = (props) => {
//   const navigate = useNavigate("");
//   const { store, actions } = useContext(Context);
//   return (
//     <table>
//       <thead>
//         <tr>
//           <th>Job Title</th>
//           <th>Company</th>
//           <th>Location</th>
//           <th>Job Type</th>
//           <th>Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           <td>{props.jobtitlename}</td>
//           <td>{props.Company}</td>
//           <td>{props.Location}</td>
//           <td>{props.Jobtype}</td>
//           <td>
//             <button onClick={() => props.onViewClick(props.post_id)}>
//               View
//             </button>
//             <button onClick={() => navigate(`/editpost/${props.post_id}`)}>
//               Edit
//             </button>
//             <button onClick={() => actions.deleteJob(props.post_id)}>
//               Delete
//             </button>
//             <button>Pause</button>
//             <button
//               onClick={() => {
//                 actions.getallapplicants(props.post_id);
//                 navigate(`/applicants/${props.post_id}`);
//                 actions.getemployersaveduser(props.post_id);
//               }}
//             >
//               Applicants
//             </button>
//           </td>
//         </tr>
//       </tbody>
//     </table>
//   );
// };

// PostJobCard.PropTypes = {
//   jobtitlename: PropTypes.string,
//   Company: PropTypes.string,
//   Location: PropTypes.string,
//   Jobtype: PropTypes.string,
//   post_id: PropTypes.number,
//   onViewClick: PropTypes.func,
// };
