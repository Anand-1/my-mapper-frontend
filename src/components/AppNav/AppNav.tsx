import { Link, NavLink } from "react-router-dom";
import { useAppNav } from "../../hooks/useAppNav";
import "./AppNav.css";

const AppNav = () => {
  const { handleLogout, isLoggingOut, user } = useAppNav();

  return (
    <header className="app-nav">
      <Link className="app-nav__brand" to="/">
        <span className="app-nav__mark" aria-hidden="true">M</span>
        <span>My Mapper</span>
      </Link>

      <nav className="app-nav__links" aria-label="Primary navigation">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/further">Tools</NavLink>
      </nav>

      <div className="app-nav__account">
        {user ? (
          <>
            <span className="app-nav__user" title={`${user.role}: ${user.label}`}>
              {user.label}
            </span>
            <button
              className="app-button app-button--primary"
              type="button"
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? "Logging out..." : "Logout"}
            </button>
          </>
        ) : (
          <Link
            className="app-nav__login app-action-link app-action-link--primary"
            to="/login"
          >
            Log in
          </Link>
        )}
      </div>
    </header>
  );
};

export default AppNav;
