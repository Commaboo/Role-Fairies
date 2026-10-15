import { Link, NavLink } from 'react-router'

const NAV_LINKS = [{ to: '/des', label: 'Dés' }]

function navLinkClass({ isActive }: { isActive: boolean }) {
  return isActive
    ? 'font-bold text-stormy-teal-700'
    : 'text-deep-space-blue-800 hover:text-stormy-teal-800'
}

function Header() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-charcoal-blue-500 px-8 py-4">
      <Link to="/" className="text-2xl font-bold text-stormy-teal-700">
        Role&Fairies
      </Link>

      <nav className="flex gap-6">
        {NAV_LINKS.map((link) => (
          <NavLink key={link.to} to={link.to} className={navLinkClass}>
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}

export default Header
