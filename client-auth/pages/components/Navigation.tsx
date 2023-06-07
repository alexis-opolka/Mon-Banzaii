import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { userService } from "pages/services";
import Link from "next/link";
import PropTypes from "prop-types";
import { NavHeaderLogo } from "./logos";
import { Dropdown, User, Grid } from "@nextui-org/react";
import { minidenticon } from "minidenticons";

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

  const username = userService.userValue?.username;

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
      <div className="navbar-brand">
        <NavLink href="/" exact>
          <NavHeaderLogo />
        </NavLink>
      </div>
      <div className="collapse navbar-collapse">
        <div className="navbar-nav">
          <NavLink href="/dashboard" exact className="nav-item nav-link">Dashboard</NavLink>
          {user.isAdmin && <NavLink href="/users" exact className="nav-item nav-link">Users</NavLink>}
        </div>
      </div>
      <div>
        <UserDropdown user={user} />
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

function UserDropdown({user}){
  return (
    <Grid.Container justify="flex-start" gap={2}>
      <Grid>
        <Dropdown placement="bottom-left">
          <Dropdown.Trigger>
            <User
              name={user.firstName + " " + user.lastName}
              description={user.username}
              bordered
              size="md"
              as="button"
              color="primary"
              src={'data:image/svg+xml;utf8,' + encodeURIComponent(minidenticon(user.username))}
              zoomed
            />
          </Dropdown.Trigger>
          <Dropdown.Menu color="primary" aria-label="Avatar Actions">
            <Dropdown.Item key="settings">
              <button onClick={userService.accessProfile} className="btn btn-link nav-item nav-link w-full text-start">My Profile</button>
            </Dropdown.Item>
            <Dropdown.Item key="logout" color="error" withDivider>
              <button onClick={userService.logout} className="btn btn-link nav-item nav-link w-full text-start">Logout</button>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Grid>
    </Grid.Container>
  );
}

// Variables declaration
NavLink.propTypes = {
  href: PropTypes.string.isRequired,
  exact: PropTypes.bool
};

NavLink.defaultProps = {
  exact: false
};

export { NavLink, Nav};
