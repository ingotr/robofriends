import React from 'react';

class ErrorBoundry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    }
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError === true) {
      return <h1>Oooops. That is no good</h1>;
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundry;
