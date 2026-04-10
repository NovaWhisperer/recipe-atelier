import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error Boundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='rounded-lg border-2 border-red-300 bg-red-50 p-6 text-center'>
          <h2 className='text-lg font-bold text-red-700'>Something went wrong</h2>
          <p className='mt-2 text-sm text-red-600'>
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className='mt-4 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700'
          >
            Try Again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
