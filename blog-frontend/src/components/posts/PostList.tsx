import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Card, Col, OverlayTrigger, Row, Spinner, Tooltip } from 'react-bootstrap';
import { GoPlus } from "react-icons/go";
import { VscAdd } from "react-icons/vsc";
import "./Post.css";
import { GetAllPosts } from '@api/Posts';
import { ErrorResponse, PostParams } from '@api/Utils';
import { Truncate } from '@/utils/String';
import { useAuth } from '@context/AuthContext';
import { useAlerts } from '@context/AlertContext';
import routes from '@routes/Routes';
import { DefaultImagePath } from '@/utils/Image';

const PostList: React.FC = () => {
    const maxPostContentLength = 200;

    const [posts, setPosts] = useState<PostParams[]>([]);
    const [loading, setLoading] = useState(true);

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
                setLoading(false);
            });
    }, []);

    return (

        <div id="posts-container">
            <h2 className="text-uppercase">Posts</h2>
            {loading && (
                <div className='loading-container'>
                    <Spinner animation="border" variant="primary" />
                    <h4 className='text-dark'>Loading</h4>
                </div>
            )}
            {posts.length > 0 && !loading && (
                <Row xs={1} md={3} className='g-4'>
                    {posts.map(post => (
                        <Col key={post.id}>
                            <Card className='post-card shadow-sm' as='a' href={(routes.GetPost.path as string).replace(":slug", post.slug)}>
                                <Card.Img src={post.image ?? DefaultImagePath} />
                                <Card.ImgOverlay>
                                    <Card.Body>
                                        <Card.Title className='text-capitalize'>{post.title}</Card.Title>
                                        <Card.Subtitle className='text-capitalize'>{post.author.username}</Card.Subtitle>
                                        <hr />
                                        <Card.Text className='text-capitalize'>{Truncate(post.content, maxPostContentLength)}</Card.Text>
                                    </Card.Body>
                                </Card.ImgOverlay>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )} 
            {posts.length == 0 && !loading && (
                <Card border='primary' bg="dark">
                    <Card.Body>
                        <Card.Text className='text-white'>
                            {token ? (
                                <>
                                    <h5>
                                        Be the first to add a post!
                                    </h5>
                                    <Button 
                                        variant='outline-primary'
                                        onClick={() => navigate(routes.CreatePost.path as string)}
                                        >
                                        <GoPlus size={25} />
                                        Create New Post
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <h5>
                                        Be the first to add a post! Register/Login an account to get started.
                                    </h5>
                                    <Button variant='outline-primary' href={routes.RegisterUser.path}>Register</Button>{' '}
                                    <Button variant='outline-primary' href={routes.LoginUser.path}>Login</Button>
                                </>
                            )}
                        </Card.Text>
                    </Card.Body>
                </Card>
            )}
            {token ?
            <OverlayTrigger
                placement='top'
                delay={{ show: 250, hide: 400 }}
                overlay={(props) => <Tooltip {...props}>Create Post</Tooltip>}
                >
                <Button 
                    className='add-post-btn rounded-circle'
                    variant='primary'
                    onClick={() => navigate(routes.CreatePost.path as string)}
                    >
                    <VscAdd />
                </Button>
            </OverlayTrigger>
             : null}
        </div>
    );
}

export default PostList;