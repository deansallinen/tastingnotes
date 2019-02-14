import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => (
  <header className={`py-4 bg-purple-dark`}>
    <div className="container mx-auto flex justify-between items-center">
      <div>
      <Link className='font-bold no-underline text-purple-lightest px-4' to="/">
        TastingNotes
      </Link>
      <Link className='mr-4 no-underline hover:underline text-purple-lightest' to="/">Home</Link>
      <Link className='mr-4 no-underline hover:underline text-purple-lightest' to="/events">Events</Link>
      </div>
      <div>
        <Link to='/signup'>
          <button className='mr-4 bg-purple-lightest hover:bg-white rounded shadow px-4 py-2 text-purple-dark font-bold'>Sign Up</button>
        </Link>
        <Link to='/login'>
          <button className='mr-4 px-4 py-2 rounded text-purple-lightest hover:text-white font-bold'>Login</button>
        </Link>
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
