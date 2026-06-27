import { Link } from "react-router-dom";
import { useLoginPage } from "../../hooks/useLoginPage";
import "./LoginPage.css";

const LoginPage = () => {
  const {
    authenticatedUser,
    authLookupError,
    formik,
    handleGoogleLogin,
    loginError,
    oauthMessage,
    oauthStatus,
  } = useLoginPage();

  return (
    <main className="login-page app-page app-page--center app-page--soft">
      <section className="login-panel app-panel app-stack" aria-labelledby="login-title">
        <div className="login-panel__intro">
          <span className="app-eyebrow">My Mapper</span>
          <h1 id="login-title">Welcome back</h1>
          <p>Sign in to continue mapping your ideas and tracking progress.</p>
        </div>

        {oauthStatus === "success" ? (
          <div className="app-alert app-alert--success" role="status">
            Signed in with Google
            {authenticatedUser?.name || authenticatedUser?.email
              ? ` as ${authenticatedUser.name || authenticatedUser.email}`
              : ""}
            .
          </div>
        ) : null}

        {oauthStatus === "error" || authLookupError || loginError ? (
          <div className="app-alert app-alert--error" role="alert">
            {oauthMessage ||
              authLookupError ||
              loginError ||
              "Google sign-in could not be completed."}
          </div>
        ) : null}

        <button
          className="login-oauth app-button"
          type="button"
          onClick={handleGoogleLogin}
        >
          <span className="login-oauth__mark" aria-hidden="true">
            G
          </span>
          Continue with Google
        </button>

        <div className="login-divider">
          <span>or</span>
        </div>

        <form className="login-form" onSubmit={formik.handleSubmit}>
          <label className="app-form-field">
            <span>Admin username</span>
            <input
              id="username"
              name="username"
              type="text"
              value={formik.values.username}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="admin"
              autoComplete="username"
              aria-invalid={formik.touched.username && Boolean(formik.errors.username)}
              aria-describedby={
                formik.touched.username && formik.errors.username
                  ? "username-error"
                  : undefined
              }
            />
            {formik.touched.username && formik.errors.username ? (
              <span className="app-form-error" id="username-error">
                {formik.errors.username}
              </span>
            ) : null}
          </label>

          <label className="app-form-field">
            <span>Password</span>
            <input
              id="password"
              name="password"
              type="password"
              value={formik.values.password}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Enter your password"
              autoComplete="current-password"
              aria-invalid={formik.touched.password && Boolean(formik.errors.password)}
              aria-describedby={
                formik.touched.password && formik.errors.password
                  ? "password-error"
                  : undefined
              }
            />
            {formik.touched.password && formik.errors.password ? (
              <span className="app-form-error" id="password-error">
                {formik.errors.password}
              </span>
            ) : null}
          </label>

          <div className="login-form__row">
            <label className="login-form__remember">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                checked={formik.values.remember}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              <span>Remember me</span>
            </label>
            <a href="#forgot-password">Forgot password?</a>
          </div>

          <button className="login-form__submit app-button app-button--primary" type="submit">
            Log in
          </button>
        </form>

        <p className="login-panel__footer">
          New here? <Link to="/register">Create an account</Link>
        </p>
      </section>
    </main>
  );
};

export default LoginPage;
