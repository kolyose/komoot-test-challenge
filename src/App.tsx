import { ErrorBoundary } from 'react-error-boundary'
import { ToastContainer } from 'react-toastify'

import ErrorMessage from './components/ErrorMessage'
import Feed from './pages/Feed'

function App() {
  return (
    <ErrorBoundary fallback={<ErrorMessage />}>
      <ToastContainer />
      <Feed />
    </ErrorBoundary>
  )
}

export default App
