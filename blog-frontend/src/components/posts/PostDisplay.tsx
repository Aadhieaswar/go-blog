import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "react-bootstrap";
import "./Post.css";
import { GetPostBySlug } from "@api/Posts";
import { PostParams, ErrorResponse } from "@api/Utils";
import { useAlerts } from "@context/AlertContext";
import routes from "@routes/Routes";
import { DefaultImagePath } from "@utils/Image";

const PostDisplay: React.FC = () => {
    const [postInfo, setPostInfo] = useState<PostParams>({
        title: "title_placeholder",
        content: "content_placeholder",
        slug: "slug_placeholder",
        id: NaN,
        author: {
            username: "username_placeholder",
            id: NaN
        },
        image: DefaultImagePath
    });

    const navigate = useNavigate()
    const { addAlert } = useAlerts();

    const { slug } = useParams();

    useEffect(() => {
        GetPostBySlug(slug as string)
            .then((response: ErrorResponse | PostParams) => {
                if ("error" in response) {
                    addAlert(response.error.message, "danger");
                    return;
                }

                setPostInfo(response);
            });
    }, [slug]);

    return (
        <div className="post-details-container">
            <Card border="dark">
                <Card.Header as="h4" className="text-capitalize bg-dark text-white">
                    {postInfo.title}
                </Card.Header>
                <Card.Body>
                    <Card.Title
                        className="user-profile-link text-capitalize"
                        onClick={() => navigate((routes.UserProfile.path as string).replace(":id", String(postInfo.author.id)))}
                        >
                        By <strong>{postInfo.author.username}</strong>
                    </Card.Title>
                    <Card.Text className="text-capitalize">{postInfo.content}</Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}

export default PostDisplay;