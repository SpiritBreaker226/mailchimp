import ErrorBoundary from './Components/ErrorBoundary'
import { ThemeProvider } from './theme'

const App = () => (
  <ErrorBoundary>
    <ThemeProvider>
      <h1>Comments</h1>
    </ThemeProvider>
  </ErrorBoundary>
)

export default App
