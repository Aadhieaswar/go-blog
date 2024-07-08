import React, { useEffect, useState } from "react";
import './Post.css';
import { useNavigate } from "react-router-dom";
import { CreatePost } from "@api/Posts";
import { nanoid } from "nanoid";
import { useAuth } from "../../context/AuthContext";
import routes from "../../routes/Routes";
import { CreatePostParams, ErrorResponse } from "../../api/Utils";
import { useAlerts } from "../../context/AlertContext";
import { Button, Form } from "react-bootstrap";
import { Slugify } from "../../utils/String";

const CreatePostForm: React.FC = () => {
    const [postForm, setPostForm] = useState<CreatePostParams>({
        title: '',
        content: '',
        slug: '',
    });

    const navigate = useNavigate();
    const { token } = useAuth();
    const { addAlert } = useAlerts();

    useEffect(() => {
        if (!token) {
            alert("You need to be logged into create a post!");
            navigate(routes.Home.path as string);
        }
    });

    const submitPost = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (postForm.title.replace(" ", "").length === 0 || postForm.content.replace(" ", "").length === 0) {
            addAlert("Please add values for the title and/or content fields", "warning");
            return;
        }

        const slug = `${Slugify(postForm.title)}-${nanoid(10)}`;

        CreatePost({ ...postForm, slug }, token)
            .then((response: ErrorResponse | any) => {
                if ("error" in response) {
                    addAlert(response.error.message, "danger");
                    return;
                }

                addAlert("Successfully crreated post!", "success");
                navigate(routes.Home.path as string);
            });
    }

    const handleFormValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPostForm(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            };
        });
    }

    return (
        <Form className="post-form justify-content-center" onSubmit={submitPost}>
            <h3 className="text-uppercase">Create New Post</h3>
            <Form.Control
                type="text"
                placeholder="Title"
                name="title"
                onChange={handleFormValueChange}
                />
            <Form.Control
                as="textarea"
                type="text"
                placeholder="Content"
                name="content"
                onChange={handleFormValueChange}
                rows={3}
                />
            <Button variant="primary" type="submit">Create Post</Button>
        </Form>
    );
}

export default CreatePostForm