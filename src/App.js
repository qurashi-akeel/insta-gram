import logo from './logo.png';
import './App.css';
import Card from './components/Card';

import posts from './data/posts';
import comments from './data/comments';

function App() {
  return (
    <div className="App">
      <img src={logo} alt="logo" width="25%" height="auto" className="logo" />
      <div className="cards">
        {posts.map((post) => {
          return (
            <Card
              post={post}
              key={post.code}
              cmtLength={comments[post.code]?.length || 0}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
