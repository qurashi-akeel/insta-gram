import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

import logo from './logo.png';
import wh from './wh.png';
import posts from './data/posts';
import comments from './data/comments';

const Post = () => {
  const postId = useLocation().pathname.split('/')[2];
  const post = posts.filter((post) => post.code === postId)[0];
  const postComments = comments[postId];
  const [comment, setComment] = useState(postComments || []);
  const [newComment, setNewComment] = useState({
    user: '',
    text: '',
  });

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.user !== '' && newComment.text !== '') {
      setComment([...comment, newComment]);
      setNewComment({ text: '', user: '' });
      refComment.current.blur();
    }
  };

  const [likes, setLikes] = useState(post.likes);

  const [wha, setWha] = useState(false);

  const handleLike = () => {
    setLikes(likes + 1);
    setWha(true);
  };

  let myStyle = wha
    ? { transform: 'scale(0.5)', transition: 'transform 300ms' }
    : { transform: 'scale(0)', transition: 'transform 300ms' };

  useEffect(() => {
    const timer = setTimeout(() => {
      setWha(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [likes]);

  const refAuthor = useRef();
  const refComment = useRef();

  const focusInp = () => {
    refAuthor.current.focus();
  };

  return (
    <div className="post">
      <Link to={'/'} className="logo">
        <img src={logo} alt="logo" width="30%" height="auto" />
      </Link>
      <div className="postCard">
        <div className="">
          <div style={{ position: 'relative' }}>
            <img
              className="postImg"
              src={post.display_src}
              width="100%"
              alt=""
              onDoubleClick={handleLike}
            />
            <div className="wh" style={myStyle}>
              <img src={wh} alt="" width='100%' />
              <span className='whItem'>{likes}</span>
            </div>
          </div>
          <p className="caption">{post.caption}</p>
          <div className="btns postBtns">
            <button className="postBtn" onClick={handleLike}>
              <span>💙</span>
              <span>{likes}</span>
            </button>
            <button className="postBtn" onClick={focusInp}>
              <span>💬</span>
              <span>{comment?.length || 0}</span>
            </button>
          </div>
        </div>
        <div className="comments">
          {comment?.length
            ? comment?.map((cmt, i) => (
                <div key={i} className="commentWrapper">
                  <span className="author">{cmt.user}</span>
                  <span className="comment">{cmt.text}</span>
                </div>
              ))
            : ''}
          <form onSubmit={handleCommentSubmit}>
            <input
              ref={refAuthor}
              type="text"
              placeholder="Author"
              value={newComment.user}
              onChange={(e) =>
                setNewComment({ text: newComment.text, user: e.target.value })
              }
            />
            <input
              ref={refComment}
              type="text"
              value={newComment.text}
              placeholder="Comment"
              onChange={(e) =>
                setNewComment({ text: e.target.value, user: newComment.user })
              }
            />
            <button type="submit" hidden></button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Post;
