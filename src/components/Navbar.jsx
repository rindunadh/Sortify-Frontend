// function Navbar() {
//   return (
//     // Shared navbar used at the top of the landing page.
//     <nav className="site-nav">
//       <a href="#" className="site-brand">
//         Sortify: One photo. Right Disposal.
//       </a>
//       <div className="site-links">
//         <a href="#analyze">Analyze</a>
//         <span aria-hidden="true">&middot;</span>
//         <a href="#about">About</a>
//       </div>
//     </nav>
//   )
// }

// export default Navbar

import { Link, useLocation } from 'react-router-dom'

/**
 * Shared navbar used across pages.
 * Uses react-router <Link> for in-app navigation
 * and highlights the current route for visual feedback.
 */
function Navbar() {
  const { pathname } = useLocation()

  const isActive = (path) =>
    pathname === path
      ? 'nav-link nav-link--active'
      : 'nav-link'

  return (
    <nav className="site-nav">
      <Link to="/" className="site-brand">
        Sortify: One photo. Right Disposal.
      </Link>

      <div className="site-links">
        <Link to="/" className={isActive('/')}>
          Home
        </Link>

        <Link to="/analyze" className={isActive('/analyze')}>
          Analyze
        </Link>

        <Link to="/about" className={isActive('/about')}>
          About
        </Link>
      </div>
    </nav>
  )
}

export default Navbar