import React from 'react';

export default class About extends React.Component {
  render() {
    return (
      <div className="About-container">
        <div className="About-box">
          <img src="images/Bear.jpg" className="About-avatar" />
          <div className="About-textfield">
            <h2>Это я</h2>
            <p>
              А это мой <a href="https://github.com/TusksAndTasks">гитхаб</a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
