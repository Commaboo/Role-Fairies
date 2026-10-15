import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import Layout from './components/Layout'
import DiceRoller from './features/dice/DiceRoller'
import ErrorPage from './pages/ErrorPage'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'

const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    ErrorBoundary: ErrorPage,
    children: [
      { index: true, Component: HomePage },
      { path: 'des', Component: DiceRoller },
      { path: '*', Component: NotFoundPage },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
