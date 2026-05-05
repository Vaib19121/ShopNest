import { Component, type ErrorInfo, type ReactNode } from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Props {
  children: ReactNode
  /** Optional custom fallback UI. Receives the error and a reset callback. */
  fallback?: (error: Error, reset: () => void) => ReactNode
  /**
   * When this value changes the error state is cleared without unmounting
   * the tree (unlike using `key`). Pass the current pathname to reset on
   * navigation.
   */
  resetKey?: string
}

interface State {
  error: Error | null
  prevResetKey?: string
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromProps(props: Props, state: State): Partial<State> | null {
    // When resetKey changes, clear the error so the boundary recovers on
    // navigation — without destroying the component tree via `key`.
    if (props.resetKey !== state.prevResetKey) {
      return { prevResetKey: props.resetKey, error: null }
    }
    return null
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack)
  }

  reset = () => this.setState({ error: null })

  render() {
    const { error } = this.state
    const { children, fallback } = this.props

    if (!error) return children

    if (fallback) return fallback(error, this.reset)

    return (
      <div className="min-h-[60vh] flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center flex flex-col items-center gap-5">
          <div className="size-16 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertTriangle className="size-8 text-destructive" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Something went wrong</h2>
            <p className="text-sm text-muted-foreground mt-1.5">
              An unexpected error occurred. You can try again or go back home.
            </p>
            {import.meta.env.DEV && (
              <pre className="mt-4 text-left text-xs bg-muted rounded-lg p-3 overflow-auto max-h-40 text-muted-foreground">
                {error.message}
              </pre>
            )}
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" onClick={this.reset} className="gap-1.5">
              <RefreshCw className="size-3.5" />
              Try again
            </Button>
            <Button size="sm" onClick={() => { this.reset(); window.location.href = '/' }} className="gap-1.5">
              <Home className="size-3.5" />
              Go home
            </Button>
          </div>
        </div>
      </div>
    )
  }
}
