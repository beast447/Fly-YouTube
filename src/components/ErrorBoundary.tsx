import { Component, type ErrorInfo, type ReactNode } from 'react';
import { FY, FONTS } from '../theme.ts';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Unhandled UI error:', error, info.componentStack);
  }

  handleReset = () => {
    this.setState({ error: null });
    window.location.assign('/');
  };

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <div
        role="alert"
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: 24,
          gap: 12,
        }}
      >
        <div style={{ fontSize: 40 }}>⚠</div>
        <div style={{ fontFamily: FONTS.display, fontSize: 20, fontWeight: 700, color: FY.fg }}>
          Something went wrong
        </div>
        <p style={{ fontFamily: FONTS.body, fontSize: 14, color: FY.fg3, maxWidth: 360 }}>
          This screen hit a turbulence we couldn&apos;t fly through. Try heading back to dispatch.
        </p>
        <button
          onClick={this.handleReset}
          style={{
            marginTop: 8,
            padding: '10px 20px',
            borderRadius: 9999,
            border: 'none',
            background: FY.amber500,
            color: '#fff',
            fontFamily: FONTS.body,
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          Back to Dispatch
        </button>
      </div>
    );
  }
}
