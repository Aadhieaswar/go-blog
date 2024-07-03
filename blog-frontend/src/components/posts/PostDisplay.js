import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Post.css";
import { GetPostBySlug } from "api/Posts";
import { AlertContext } from "context/AlertContext";
import Urls from "context/Urls";

const PostDisplay = () => {
    const [postInfo, setPostInfo] = useState(null);

    const navigate = useNavigate()
    const { slug } = useParams();

    const { addAlert } = useContext(AlertContext);

    useEffect(() => {
        GetPostBySlug(slug)
            .then(response => {
                if (!response.error) {
                    setPostInfo(response);
                    return;
                }

                addAlert(response.error.message, "danger")
            })
            .catch(err => console.error(err));
    }, [slug]);

    return (
        <div className="post-container">
        {postInfo ? (
            <div className="card border-dark">
                <h4 className="card-header text-capitalize bg-dark text-white">
                    {postInfo.title}
                </h4>
                <div className="card-body">
                    <h5
                        className="user-profile-link card-title text-capitalize"
                        onClick={() => navigate(Urls.UserProfile.replace(":id", postInfo.author.id))}
                        >
                        By <strong>{postInfo.author.username}</strong>
                    </h5>
                    <p className="card-text text-capitalize">{postInfo.content}</p>
                </div>
            </div>
            ) : (
                <div className="no-posts-info card border-warning">
                    <p className="card-text text-warning">Oops! It seems the post information is unavailable..</p>
                </div>
            )
        }
        </div>
    );
}

export default PostDisplay;