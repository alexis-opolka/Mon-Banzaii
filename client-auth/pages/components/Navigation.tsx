import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { userService } from "pages/services";
import Link from "next/link";
import PropTypes from "prop-types";

// Functions
function Nav() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const subscription = userService.user.subscribe(x => setUser(x));
    return () => subscription.unsubscribe();
  }, []);

  // We want to show the navigation only when the user
  // is logged in
  if (!user) return null;

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
      <div className="navbar-nav">
        <NavLink href="/" exact className="nav-item nav-link">Home</NavLink>
        <NavLink href="/users" exact className="nav-item nav-link">Users</NavLink>
        <button onClick={userService.logout} className="btn btn-link nav-item nav-link">Logout</button>
      </div>
    </nav>
  )
}

function NavLink({
  children,
  href,
  exact, ...props
}) {
  const { pathname } = useRouter();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  if (isActive) {
    props.className += " active";
  }

  return <Link href={href} {...props}>{children}</Link>
}

// Variables declaration
NavLink.propTypes = {
  href: PropTypes.string.isRequired,
  exact: PropTypes.bool
};

NavLink.defaultProps = {
  exact: false
};

export {NavLink, Nav}
