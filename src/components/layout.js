import React from 'react'
import { Link } from 'gatsby'

const Header = () => (
  <header className="py-4 bg-purple-dark">
    <div className="max-w-xl mx-auto flex justify-between items-center">
      <div>
        <Link
          className="font-bold no-underline text-purple-lightest pr-4"
          to="/"
        >
          TastingNotes
        </Link>
        <div className="inline-block ml-4">
          <Link
            className="mr-4 no-underline hover:underline text-purple-lightest"
            to="/"
          >
            Home
          </Link>
          <Link
            className="mr-4 no-underline hover:underline text-purple-lightest"
            to="/events"
          >
            Events
          </Link>
        </div>
      </div>
      <div>
        <Link to="/signup">
          <button className="mr-4 bg-white hover:bg-white rounded shadow px-4 py-2 text-purple-dark font-bold">
            Sign Up
          </button>
        </Link>
        <Link to="/login">
          <button className="px-4 py-2 rounded text-purple-lightest hover:text-white font-bold">
            Login
          </button>
        </Link>
      </div>
    </div>
  </header>
)

const Footer = () => (
  <footer className=" py-6 bg-purple-darker text-purple ">
    <div className="max-w-lg mx-auto">
      <Link to="/vendor">
        <span className="mr-2">Vendor</span>
      </Link>
      <Link to="/organizer">
        <span className=" mr-2">Organizer</span>
      </Link>
      <p>TastingNotes is brought to you in part by:</p>
      <ul>
        <li>React</li>
        <li>Tailwind</li>
        <li>GraphQL</li>
        <li>Hasura</li>
        <li>Postgres</li>
      </ul>
    </div>
  </footer>
)

const Layout = ({ children }) => (
  <div className="flex flex-col min-h-screen font-sans">
    <Header />
    <div className="pt-6 pb-10 bg-grey-lighter flex-1">
      <div className="container mx-auto">{children}</div>
    </div>
    <Footer />
  </div>
)

export default Layout
