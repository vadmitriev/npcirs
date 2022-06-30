import React, { Component } from 'react';
import { NotFoundPage } from 'pages';

class ErrorBoundary extends Component {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <NotFoundPage text="Произошла ошибка" />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
