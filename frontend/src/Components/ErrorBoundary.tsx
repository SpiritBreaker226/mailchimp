import { Component, ErrorInfo, ReactNode } from 'react'

export type ErrorBoundaryProps = {
  children: ReactNode
}

type ErrorBoundaryState = { hasError: boolean }

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps | Readonly<ErrorBoundaryProps>) {
    super(props)

    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>
    }

    return this.props.children
  }
}
