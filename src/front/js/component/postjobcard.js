import React, { useContext } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export const PostJobCard = (props) => {
  const navigate = useNavigate("");
  const { store, actions } = useContext(Context);
  return (
    <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
      <div className="card">
        <img
          className="card-img-top"
          src={props.image}
          alt="Card image cap"
          style={{ width: "100%", height: "200px", objectFit: "contain" }}
        />
        <div className="container">
          <h5 className="card-title">
            <b>{props.jobtitlename}</b>
          </h5>
          <p className="card-text">{props.Company}</p>
          <p className="card-text">{props.Location}</p>
          <p className="card-text">{props.Jobtype}</p>
        </div>
        <div className="buttons">
          <button onClick={() => props.onViewClick(props.post_id)}>View</button>
          <button onClick={() => navigate(`/editpost/${props.post_id}`)}>
            Edit
          </button>
          <button onClick={() => actions.deleteJob(props.post_id)}>
            Delete
          </button>
          <button>Pause</button>
        </div>
      </div>
    </div>
  );
};

PostJobCard.PropTypes = {
  jobtitlename: PropTypes.string,
  Company: PropTypes.string,
  Location: PropTypes.string,
  Jobtype: PropTypes.string,
  post_id: PropTypes.number,
  onViewClick: PropTypes.func,
};
