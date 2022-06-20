import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import wh from '../../src/wh.png';

const Card = ({ post, cmtLength }) => {
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

  const navigate = useNavigate();

  return (
    <div className="card">
      <Link to={`/comments/${post.code}`}>
        <div style={{ position: 'relative' }}>
          <img src={post.display_src} width="100%" alt={post.caption} />
          <img src={wh} alt="" width={100} className="wh" style={myStyle} />
        </div>
      </Link>
      <div className="extra">
        <p>{post.caption}</p>
        <div className="btns">
          <button style={{ width: '50%' }} onClick={handleLike}>
            <span>💙</span>
            <span>{likes}</span>
          </button>
          <button
            style={{ width: '50%' }}
            onClick={() => navigate(`/comments/${post.code}`)}
          >
            <span>💬</span>
            <span>{cmtLength}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
