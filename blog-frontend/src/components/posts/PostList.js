import React, { useState, useEffect, useContext } from 'react'
import "./Post.css";
import { GetAllPosts } from 'api/Posts';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from 'context/AuthContext';
import Urls from 'context/Urls';
import { Truncate } from 'components/utils/Utils';

const PostList = () => {
    const maxPostContentLength = 200;

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
            <h2 className="text-uppercase">Posts</h2>
            <ul className="post-list d-inline-flex flex-wrap justify-content-center">
                {posts.length > 0 ? (
                    posts.map(post => (
                        <li
                            key={post.ID}
                            className='card border-primary'
                            >
                            <img className='card-img-top' src={process.env.PUBLIC_URL + '/images/default-post.png'} alt="" />
                            <div className='card-body'>
                                <input type='hidden' value={post.slug} />
                                <div className='card-title fw-bold text-capitalize h5'>{post.title}</div>
                                <div className='card-subtitle text-end text-capitalize fst-italic'>{post.author.username}</div>
                                <div className='card-text text-start fst-normal'>{Truncate(post.content, maxPostContentLength)}</div>
                            </div>
                            <button
                                className="btn bg-primary text-white border-primary card-footer"
                                onClick={() => navigate(Urls.GetPost.replace(":slug", post.slug))}
                                >
                                Read More
                            </button>
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