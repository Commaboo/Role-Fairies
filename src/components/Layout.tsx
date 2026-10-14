import type { ReactNode } from 'react'
import Header from './Header'

type LayoutProps = {
  children: ReactNode
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-linear-to-br from-deep-space-blue-300 to-deep-purple-200 text-deep-space-blue-900">
      <Header />
      <main className="p-8">{children}</main>
    </div>
  )
}

export default Layout
