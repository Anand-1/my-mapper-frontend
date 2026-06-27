import { Link } from "react-router-dom";
import { useRegisterPage } from "../../hooks/useRegisterPage";
import "../Login/LoginPage.css";

const RegisterPage = () => {
  const { formik, isSubmitting, registerError } = useRegisterPage();

  return (
    <main className="login-page app-page app-page--center app-page--soft">
      <section className="login-panel app-panel app-stack" aria-labelledby="register-title">
        <div className="login-panel__intro">
          <span className="app-eyebrow">My Mapper</span>
          <h1 id="register-title">Create an account</h1>
          <p>Register to map your ideas and access your dashboard.</p>
        </div>

        {registerError ? (
          <div className="app-alert app-alert--error" role="alert">
            {registerError}
          </div>
        ) : null}

        <form className="login-form" onSubmit={formik.handleSubmit}>
          <label className="app-form-field">
            <span>Name</span>
            <input
              id="name"
              name="name"
              type="text"
              value={formik.values.name}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Your full name"
              autoComplete="name"
              aria-invalid={formik.touched.name && Boolean(formik.errors.name)}
              aria-describedby={
                formik.touched.name && formik.errors.name ? "name-error" : undefined
              }
            />
            {formik.touched.name && formik.errors.name ? (
              <span className="app-form-error" id="name-error">
                {formik.errors.name}
              </span>
            ) : null}
          </label>

          <label className="app-form-field">
            <span>Email</span>
            <input
              id="email"
              name="email"
              type="email"
              value={formik.values.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="you@example.com"
              autoComplete="email"
              aria-invalid={formik.touched.email && Boolean(formik.errors.email)}
              aria-describedby={
                formik.touched.email && formik.errors.email ? "email-error" : undefined
              }
            />
            {formik.touched.email && formik.errors.email ? (
              <span className="app-form-error" id="email-error">
                {formik.errors.email}
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
              placeholder="Create a password"
              autoComplete="new-password"
              aria-invalid={formik.touched.password && Boolean(formik.errors.password)}
              aria-describedby={
                formik.touched.password && formik.errors.password ? "password-error" : undefined
              }
            />
            {formik.touched.password && formik.errors.password ? (
              <span className="app-form-error" id="password-error">
                {formik.errors.password}
              </span>
            ) : null}
          </label>

          <label className="app-form-field">
            <span>Confirm password</span>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formik.values.confirmPassword}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Confirm your password"
              autoComplete="new-password"
              aria-invalid={
                formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)
              }
              aria-describedby={
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? "confirmPassword-error"
                  : undefined
              }
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <span className="app-form-error" id="confirmPassword-error">
                {formik.errors.confirmPassword}
              </span>
            ) : null}
          </label>

          <button
            className="login-form__submit app-button app-button--primary"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="login-panel__footer">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </section>
    </main>
  );
};

export default RegisterPage;
