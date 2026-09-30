import {StrictMode, Component, ReactNode, ErrorInfo} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Naiahautos application error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-slate-800">
          <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-slate-200 text-center space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto font-bold text-xl">
              N
            </div>
            <h2 className="text-xl font-bold text-slate-900">Naiahautos Dealership</h2>
            <p className="text-xs text-slate-600">
              The application encountered a display refresh state.
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false });
                window.location.reload();
              }}
              className="py-2.5 px-6 bg-[#064E3B] hover:bg-[#043E2F] text-white font-bold text-xs rounded-xl shadow cursor-pointer transition-colors"
            >
              Reload Showroom
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const mountApp = () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.warn("Naiahautos: #root element not found yet, retrying...");
    return false;
  }
  
  createRoot(rootElement).render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>,
  );
  return true;
};

if (!mountApp()) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountApp);
  } else {
    setTimeout(mountApp, 100);
  }
}
