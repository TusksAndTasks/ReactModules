import React from 'react';

export default class About extends React.Component {
  render() {
    return (
      <div className="About-container">
        <div className="About-box">
          <div className="About-textfield">
            <h2> About project:</h2>
            <p>
              First part of the App allows to search through characters of Rick and Morty via{' '}
              <a href="https://rickandmortyapi.com" className="about-link">
                https://rickandmortyapi.com/
              </a>
              Users can filter search-results by their status. App supports a pagination system
              which can display different amounts of cards on a page at once (Note: this feature is
              not part of the API and was written by me). Users also can open full information about
              character by clicking on a card. Second part allows users to create their own
              characters via form-page. All inputs (except for switch) support validation. Cards and
              parameters for the first part and cards and parameters for second part don’t disappear
              upon switching between parts.
            </p>
            <h3>Work-flow:</h3>
            <p>
              This app was part of RSSchool -{' '}
              <a href="https://rs.school/" className="about-link">
                https://rs.school/
              </a>{' '}
              React course (2022Q2). Work-flow consists of 6 parts.
            </p>
            <ol>
              <li>Basic structure and search bar was written using only Class Components</li>
              <li>Form-page was written via uncontrolled components of native React</li>
              <li>API search functional was also written via Class Components</li>
              <li>
                Then, all of the above was rewritten with functional components and React Hooks (For
                form used React-form-hooks -{' '}
                <a href="https://react-hook-form.com" className="about-link">
                  https://react-hook-form.com/
                </a>
                )
              </li>
              <li>
                After this, a custom app state was created via UseReducer and Context API. On this
                step also were created filter and pagination features.
              </li>
              <li>
                And at last the custom app state was rewritten via the Redux Toolkit. Right now the
                app is working on functional components and Redux Toolkit.
              </li>
            </ol>
            <h3>
              Code with all steps and my other projects you can find at{' '}
              <a href="https://github.com/TusksAndTasks" className="about-link">
                my github
              </a>
            </h3>
          </div>
        </div>
      </div>
    );
  }
}
