import React from "react"
import { Link } from "gatsby"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <div className="navbar">
        <h1 className="logo">
          <Link to="/">{title}</Link>
        </h1>
        <ul className="nav-item">
          <Link to="/"><li>HOME</li></Link>
          <Link to="/blog"><li>BLOG</li></Link>
        </ul>
      </div>
    )
  } else {
    header = (
      <div className="navbar">
        <h1 className="logo">
          <Link to="/">{title}</Link>
        </h1>
        <ul className="nav-item">
          <Link to="/"><li>HOME</li></Link>
          <Link to="/blog"><li>BLOG</li></Link>
        </ul>
      </div>
    )
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>
      <main>{children}</main>
      <footer className="text-center">
        © {new Date().getFullYear()}
        {` `}
        ハウスケアサービス

      </footer>
    </div>
  )
}

export default Layout
