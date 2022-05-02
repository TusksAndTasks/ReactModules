import React from 'react';

export default class About extends React.Component {
  render() {
    return (
      <div className="About-container">
        <div className="About-box">
          <img src="images/Bear.jpg" className="About-avatar" />
          <div className="About-textfield">
            <h2>This is me!</h2>
            <p>
              And this is my <a href="https://github.com/TusksAndTasks">github</a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
