import React, { useContext, useEffect, useState } from "react";
import './Post.css';
import { AuthContext } from "context/AuthContext";
import { useNavigate } from "react-router-dom";
import { CreatePost } from "api/Posts";
import Urls from "context/Urls";
import { nanoid } from "nanoid";

const CreatePostForm = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const navigate = useNavigate();
    const { token } = useContext(AuthContext);


    useEffect(() => {
        // redirect user if they are not logged in
        if (!token) {
            alert("You need to be logged into create a post!");
            navigate(Urls.Home);
        }
    }, []);

    const slugify = (title) => {
        return title
            .toLowerCase()
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, "");
    }

    const submitPost = (e) => {
        e.preventDefault();

        if (title.replace(" ", "").length === 0 || content.replace(" ", "").length === 0) {
            alert("Please add values for the title and/or content fields")
            return;
        }

        const slug = `${slugify(title)}-${nanoid(10)}`;
        console.log(slug);

        CreatePost({ title, content, token, slug })
            .then(response => {
                if (!response.error) {
                    navigate(Urls.Home);
                }

                // handle error message
            })
            .catch(err => console.error(err));
    }

    return (
        <form className="post-form justify-content-center" onSubmit={submitPost}>
            <h3 className="text-uppercase">Create New Post</h3>
            <input
                className="form-control"
                type="text"
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
                />
            <textarea
                className="form-control"
                type="text"
                placeholder="Content"
                onChange={(e) => setContent(e.target.value)}
                />
            <button className="btn btn-primary" type="submit">Create Post</button>
        </form>
    );
}

export default CreatePostForm