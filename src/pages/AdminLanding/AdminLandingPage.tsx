import { Link } from "react-router-dom";
import { appRoutes } from "../../routes";
import { useAdminLandingPage } from "../../hooks/useAdminLandingPage";
import "./AdminLandingPage.css";

const AdminLandingPage = () => {
  const { adminSession, displayName, isCheckingSession } = useAdminLandingPage();

  if (isCheckingSession) {
    return (
      <main className="admin-landing app-page app-page--soft">
        <p className="admin-landing__loading">Checking session...</p>
      </main>
    );
  }

  return (
    <main className="admin-landing app-page app-page--soft">
      <section className="admin-landing__content" aria-labelledby="admin-title">
        <p className="app-eyebrow">{adminSession?.role || "Signed in"}</p>
        <h1 id="admin-title">Welcome, {displayName}</h1>
        <p className="admin-landing__copy">
          Your admin landing page is ready. Continue building maps, reviewing ideas,
          and managing progress from here.
        </p>

        <div className="admin-landing__actions">
          <Link className="app-action-link app-action-link--primary" to={appRoutes.home}>Open mapper</Link>
          <Link className="app-action-link" to={appRoutes.tools}>View tools</Link>
        </div>
      </section>
    </main>
  );
};

export default AdminLandingPage;
