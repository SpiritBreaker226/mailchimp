import ErrorBoundary from './Components/ErrorBoundary'
import { AddComment } from './AddComment'
import { ThemeProvider } from './theme'

const App = () => (
  <ErrorBoundary>
    <ThemeProvider>
      <h1>Comments Feed</h1>

      <AddComment />
    </ThemeProvider>
  </ErrorBoundary>
)

export default App
