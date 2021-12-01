import React from "react";
import "./feeds.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { isAuthenticated } from "../../Authen";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import moment from 'moment';

const Feeds = (props) => {
  const [getFeeds, setFeeds] = useState([]);
  const history = useHistory();
  //  const [like,setLike]=useState([])

  useEffect(async () => {
    refreshLikes();
  }, []);

  const refreshLikes = async () => {
    const allFeed = await axios.get(`http://localhost:9009/nominations`);
    if (!allFeed) {
      alert("No data in feed");
    } else {
      setFeeds(allFeed.data);
    }
  };

  const likeButton = async (id) => {
    const like = isAuthenticated()._id;
    await axios
      .put("http://localhost:9009/nominations/" + id, { like })
      .then((res) => {
        refreshLikes();
      });
  };

  const dislikeButton = async (id) => {
    const dislike = isAuthenticated()._id;
    await axios
      .put("http://localhost:9009/nominations/dislike/" + id, { dislike })
      .then((res) => {
        refreshLikes();
      });
  };

  return (
    <>
      {/*Employee and Team Lead Feed */}
      {isAuthenticated() &&
        (isAuthenticated().designation === "Employee" ||
          isAuthenticated().designation === "Team Lead") &&
        getFeeds
          .slice(0)
          .reverse()
          .map((e, index) => {
            return (
              <div className="card" key={e._id}>
                <div className="container">
                  <div>
                    <h5>
                      <b>{e.fullName}</b> has been nominated for Employee of the
                      month award (Month : <b>{moment(e.Months).format("MMMM YYYY")}</b>) by his manager <b>{e.nominatedBy}</b> for
                      Department {e.department}
                    </h5>
                    <br />
                    <h5>
                      Criterias he has satisfied are {e.criteria.join(", ")}
                    </h5>
                    <br />
                    <h5>
                      {e.fullName}'s manager has praised as {e.praise}
                    </h5>
                    <br />
                  </div>

                  <div className="buttons">
                    {e.likes.includes(isAuthenticated()._id) ||
                    e.dislikes.includes(isAuthenticated()._id) ? (
                      <div>
                         <button className="likeButton">
                          <span className="icon">
                            <ion-icon name="happy"></ion-icon>
                          </span>
                          <span className="buttonheading"> {(e.likes.includes(isAuthenticated()._id))? "Liked":"Disliked"} </span>
                        </button>
                        </div>
                    ) : (
                      <div>
                        <button
                          className="likeButton"
                          disabled={
                            e.likes.includes(isAuthenticated()._id)
                              ? true
                              : false
                          }
                          onClick={() => {
                            likeButton(e._id);
                          }}
                        >
                          <span className="icon">
                            <ion-icon name="happy"></ion-icon>
                          </span>
                          <span className="buttonheading"> Likes </span>
                        </button>
                        <button
                          className="likeButton"
                          disabled={
                            e.dislikes.includes(isAuthenticated()._id)
                              ? true
                              : false
                          }
                          onClick={() => {
                            dislikeButton(e._id);
                          }}
                        >
                          <span className="icon">
                            <ion-icon name="heart-dislike"></ion-icon>
                          </span>
                          <span className="buttonheading">Dislike</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

      {isAuthenticated() &&
        isAuthenticated().designation === "Admin" &&
        getFeeds
          .slice(0)
          .reverse()
          .map((e, index) => {
            return (
              <div className="card" key={e._id}>
                <div className="container">
                  <div>
                    <h5>
                      <b>{e.fullName}</b> has been nominated for Employee of the
                      month award (Month : <b>{moment(e.Months).format("MMMM YYYY")}</b>) by his manager <b>{e.nominatedBy}</b> for
                      Department {e.department}
                    </h5>
                    <br />
                    <h5>
                      Criterias he has satisfied are {e.criteria.join(", ")}
                    </h5>
                    <br />
                    <h5>
                      {e.fullName}'s manager has praised as {e.praise}
                    </h5>
                    <br />
                  </div>

                  <div className="buttons">
                    <button className="votes">
                      <span className="icon">
                        <ion-icon name="happy"></ion-icon>
                      </span>
                      <span className="buttonheading">
                        {e.likes.length} Likes
                      </span>
                    </button>

                    <button className="votes">
                      <span className="icon">
                        <ion-icon name="heart-dislike"></ion-icon>
                      </span>
                      <span className="buttonheading">
                        {e.dislikes.length} Dislikes
                      </span>
                    </button>

                    <button className="likeButton">
                      <span className="icon">
                        <ion-icon name="megaphone"></ion-icon>
                      </span>
                      <span
                        className="buttonheading"
                        onClick={() => history.push(`/WinnerForm/${e._id}`)}
                        component={Link}
                        to={`/WinnerForm/${e._id}`}
                      >
                        Winner for this month
                      </span>
                    </button>
                    {/* onClick={()=>{history.push('/WinnerForm')}} */}
                  </div>
                </div>
              </div>
            );
          })}

      {/*Managers Feed */}
      {isAuthenticated() &&
        isAuthenticated().designation === "Manager" &&
        getFeeds
          .slice(0)
          .reverse()
          .map((e, index) => {
            return (
              <div className="card" key={e._id}>
                <div className="container">
                  <div>
                    <h5>
                      <b>{e.fullName}</b> has been nominated for Employee of the
                      month award (Month : <b>{moment(e.Months).format("MMMM YYYY")}</b>) by his manager <b>{e.nominatedBy}</b> for
                      Department {e.department}
                    </h5>
                    <br />
                    <h5>
                      Criterias he has satisfied are {e.criteria.join(", ")}{" "}
                    </h5>
                    <br />
                    <h5>
                      {e.fullName}'s manager has praised as {e.praise}
                    </h5>
                    <br />
                  </div>

                  <div className="buttons">
                    {e.likes.includes(isAuthenticated()._id) ||
                    e.dislikes.includes(isAuthenticated()._id) ? (
                      <div>
                         <button className="likeButton">
                          <span className="icon">
                            <ion-icon name="happy"></ion-icon>
                          </span>
                          <span className="buttonheading"> {(e.likes.includes(isAuthenticated()._id))? "Liked":"Disliked"} </span>
                        </button>
                        </div>
                    ) : (
                      <div>
                        <button
                          className="likeButton"
                          disabled={
                            e.likes.includes(isAuthenticated()._id)
                              ? true
                              : false
                          }
                          onClick={() => {
                            likeButton(e._id);
                          }}
                        >
                          <span className="icon">
                            <ion-icon name="happy"></ion-icon>
                          </span>
                          <span className="buttonheading"> Likes </span>
                        </button>
                        <button
                          className="likeButton"
                          disabled={
                            e.dislikes.includes(isAuthenticated()._id)
                              ? true
                              : false
                          }
                          onClick={() => {
                            dislikeButton(e._id);
                          }}
                        >
                          <span className="icon">
                            <ion-icon name="heart-dislike"></ion-icon>
                          </span>
                          <span className="buttonheading">Dislike</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
    </>
  );
};

export default Feeds;
