import React from 'react';

const App = (props) => {
  return (
    <div>
      Hello from App Component
      {props.children}
    </div>
  );
};

App.propTypes = {
  children:   React.PropTypes.node,
};

export default App;
