import styled from 'styled-components'

import ErrorBoundary from './Components/ErrorBoundary'
import { AddComment } from './AddComment'
import { Comments } from './Comments'
import { AppProvider } from './context'
import { ThemeProvider } from './theme'

const AppBody = styled.main`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
  padding: 2rem 0;
`

const AppHeader = styled.h1`
  margin: 0 0 2rem;
`

const AppBodyContent = styled.section`
  padding: 0.75rem 1.5rem;
  border-radius: 1em;
  box-shadow: 0 0 0 0.0625rem ${(props) => props.theme.text};
  margin-bottom: 2rem;
`

const App = () => (
  <ErrorBoundary>
    <ThemeProvider>
      <AppProvider>
        <AppBody>
          <AppHeader>Comments Feed</AppHeader>

          <AppBodyContent>
            <AddComment />
          </AppBodyContent>

          <Comments />
        </AppBody>
      </AppProvider>
    </ThemeProvider>
  </ErrorBoundary>
)

export default App
