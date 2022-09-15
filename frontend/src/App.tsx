import ErrorBoundary from './Components/ErrorBoundary'
import { AddComment } from './AddComment'
import { Comment } from './Comments'
import { ThemeProvider } from './theme'

const App = () => (
  <ErrorBoundary>
    <ThemeProvider>
      <h1>Comments Feed</h1>

      <AddComment />

      <Comment
        remark={{
          id: 1,
          name: 'Billy Bob',
          message: 'This is more then I can handle',
          created: new Date(),
        }}
      />
    </ThemeProvider>
  </ErrorBoundary>
)

export default App
