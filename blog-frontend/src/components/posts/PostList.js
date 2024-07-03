import React, { useState, useEffect, useContext } from 'react'
import "./Post.css";
import { GetAllPosts } from 'api/Posts';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from 'context/AuthContext';
import Urls from 'context/Urls';

const PostList = () => {
    const [posts, setPosts] = useState([]);

    const navigate = useNavigate();
    const { token } = useContext(AuthContext);

    useEffect(() => {
        GetAllPosts()
            .then(response => {
                if (!response.error) {
                    setPosts(response); 
                }
                // handle error
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div id="posts-container">
            <h2 className='text-uppercase'>Posts</h2>
            <ul className="post-list list-group list-group-flush">
                {posts.length > 0 ? (
                    posts.map(post => (
                        <li
                            key={post.ID}
                            className='list-group-item'
                            onClick={() => navigate(Urls.GetPost.replace(":slug", post.slug))}
                            >
                            <input type='hidden' value={post.slug} />
                            <div className='fw-bold text-capitalize h5'>{post.title}</div>
                            <div className='text-end text-capitalized fst-italic'>{post.author.username}</div>
                            <div className='text-start fst-normal'>{post.content}</div>
                        </li>
                    ))) : (
                    <div className="no-posts-info card border-warning text-warning">
                        No Posts Published at the Moment...
                    </div>
                )}
            </ul>
            {token ? 
            <button 
                className='btn btn-primary text-uppercase'
                onClick={() => navigate(Urls.CreatePost)}
                >
                Create New Post
            </button> : null}
        </div>
    );
}

export default PostList;