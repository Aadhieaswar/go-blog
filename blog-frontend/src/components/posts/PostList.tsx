import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import "./Post.css";
import { GetAllPosts } from '@api/Posts';
import { ErrorResponse, PostParams } from '@api/Utils';
import { Truncate } from '@/utils/String';
import { useAuth } from '@context/AuthContext';
import { useAlerts } from '@context/AlertContext';
import routes from '@routes/Routes';
import { Button, Card, Col, Row } from 'react-bootstrap';

const PostList: React.FC = () => {
    const maxPostContentLength = 200;

    const [posts, setPosts] = useState<PostParams[]>([]);

    const navigate = useNavigate();
    const { token } = useAuth();
    const { addAlert } = useAlerts();

    useEffect(() => {
        GetAllPosts()
            .then((response: ErrorResponse | PostParams[]) => {
                if ("error" in response) {
                    addAlert(response.error.message, "danger");
                    return;
                }

                setPosts(response); 
            });
    }, []);

    return (

        <div id="posts-container">
            <h2 className="text-uppercase">Posts</h2>
            <Row xs={1} md={2} className='g-4'>
            {posts.length > 0 ? (
                posts.map(post => (
                    <Col key={post.id}>
                        <Card className='post-card' border='primary'>
                            <Card.Body>
                                <Card.Title className='text-capitalize'>{post.title}</Card.Title>
                                <Card.Subtitle className='text-capitalize'>{post.author.username}</Card.Subtitle>
                                <hr />
                                <Card.Text className='text-capitalize'>{Truncate(post.content, maxPostContentLength)}</Card.Text>
                            </Card.Body>
                            <Button
                                href={routes.GetPost.path.replace(":slug", post.slug)}
                                variant='primary'
                                >
                                Read More
                            </Button>
                        </Card>
                    </Col>
                ))) : (
                <div className="no-posts-info card border-warning text-warning">
                    No Posts Published at the Moment...
                </div>
            )}
            </Row>
            {token ? 
            <Button 
                className='text-uppercase'
                variant='primary'
                onClick={() => navigate(routes.CreatePost.path)}
                >
                Create New Post
            </Button> : null}
        </div>
    );
}

export default PostList;