import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => (
  <header className={`py-4 bg-purple-lighter`}>
    <div className="container mx-auto flex justify-between ">
      <Link to="/">
        <div>TastingNotes</div>
      </Link>
      <div>
        <Link to="/">Home</Link>
        <Link to="/events">Events</Link>
        <button>Login</button>
      </div>
    </div>
  </header>
)

const Footer = () => (
  <footer>
    <Link to="/vendor">
      <div className="inline-block mr-2">Vendor</div>
    </Link>
    <Link to="/organizer">
      <div className="inline-block mr-2">Organizer</div>
    </Link>
  </footer>
)

const Layout = ({ children }) => (
  <div className="flex flex-col min-h-screen font-sans">
    <Header />
    <div className="pt-6 bg-grey-lightest flex-1">
      <div className="container mx-auto">{children}</div>
    </div>
    <Footer />
  </div>
)

export default Layout
