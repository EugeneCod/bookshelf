import { Component } from 'react';

import s from './ErrorBoundary.module.scss';

interface Props {
  children: JSX.Element;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={s['error']}>
          <h1 className={s['error__title']}>Sorry :(</h1>
          <p className={s['error__message']}>
            An unexpected error has occurred
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
