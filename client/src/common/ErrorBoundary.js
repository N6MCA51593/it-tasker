import React, { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='error'>
          <h1>Uh oh, I think you broke it</h1>
          <h2>
            Quickly refresh the page before anyone noticed
            <span role='img' aria-label='hush-hush'>
              🤐
            </span>
          </h2>
        </div>
      );
    }

    return this.props.children;
  }
}
