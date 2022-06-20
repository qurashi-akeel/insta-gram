import { Link } from 'react-router-dom';

import error from './error.gif';

const Error = () => {
  return (
    <div className='errContainer'>
      <Link to={'/'} className="err">
        <img src={error} alt="" width={'80%'} height={'auto'} />
      </Link>
    </div>
  );
};

export default Error;
