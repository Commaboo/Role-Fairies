import { Outlet } from 'react-router'
import Header from './Header'

function Layout() {
  return (
    <div className="min-h-screen bg-linear-to-br from-deep-space-blue-300 to-deep-purple-200 text-deep-space-blue-900">
      <Header />
      <main className="p-8">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
