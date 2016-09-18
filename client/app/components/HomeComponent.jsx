import React from 'react';

const Home = (props) => {
  return (
    <div>
      Hello from Home Component
    </div>
  );
};

Home.propTypes = {
  children:   React.PropTypes.node,
};

export default Home;
