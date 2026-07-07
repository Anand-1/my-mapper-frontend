# My Mapper Frontend

My Mapper is a React, TypeScript, and Vite frontend for collecting dated ideas, signing users in, viewing an admin dashboard, opening tool pages, and sending Tealium page-view events on client-side route changes.

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run test:e2e
npm run preview
```

## Environment

Create a local `.env` from `.env.example` and fill in the values needed by your environment.

```env
VITE_API_BASE_URL=http://127.0.0.1:5000
VITE_ADMIN_USERNAME=admin
VITE_ADMIN_PASSWORD=admin123
VITE_ROUTER_BASE=/

VITE_TEALIUM_ACCOUNT=your-account
VITE_TEALIUM_PROFILE=your-profile
VITE_TEALIUM_ENVIRONMENT=dev
VITE_TEALIUM_ENABLED=true
```

`VITE_ROUTER_BASE` defaults to `/` during local development. Production builds use the Vite base path for GitHub Pages unless this value is overridden.

## Application Flow

```mermaid
flowchart TD
  Browser[Browser] --> Vite[Vite app shell]
  Vite --> Router[BrowserRouter]
  Router --> App[App]
  App --> TealiumTracker[TealiumRouteTracker]
  App --> Nav[AppNav]
  App --> Routes[Route table]

  Routes --> Home["/ - HomePage"]
  Routes --> Landing["/landing - LandingPage"]
  Routes --> Login["/login - LoginPage"]
  Routes --> Register["/register - RegisterPage"]
  Routes --> Dashboard["/dashboard - AdminLandingPage"]
  Routes --> Tools["/tools - ToolsPage"]
  Routes --> LegacyHome["/home - redirect to /"]
  Routes --> LegacyTools["/further - redirect to /tools"]
  Routes --> NotFound["* - redirect to /"]

  Home --> InputHook[useHomeInputs]
  InputHook --> InputService[inputService]
  InputService --> InputsApi["API: /inputs"]

  Login --> LoginHook[useLoginPage]
  Register --> RegisterHook[useRegisterPage]
  Dashboard --> AdminHook[useAdminLandingPage]
  Nav --> NavHook[useAppNav]

  LoginHook --> AuthService[authService]
  RegisterHook --> AuthService
  AdminHook --> AuthService
  NavHook --> AuthService
  AuthService --> AuthApi["API: /auth/login, /auth/register, /auth/me, /auth/logout"]
  AuthService --> LocalStorage[localStorage admin session]

  TealiumTracker --> TealiumService[tealiumService]
  TealiumService --> TealiumCdn["Tealium iQ utag.js"]
```

## Dependency Flow

```mermaid
flowchart LR
  Source[src] --> React[react]
  Source --> ReactDom[react-dom]
  Source --> Router[react-router-dom]
  Source --> Formik[formik]
  Source --> DatePicker[react-datepicker]

  ReactDom --> BrowserDom[Browser DOM]
  Router --> ClientRoutes[Client-side routing]
  Formik --> LoginForms[Login and register forms]
  DatePicker --> HomeDate[Home date input]

  Source --> Config[services/config.ts]
  Config --> Env[Vite env vars]
  Config --> ApiBase[VITE_API_BASE_URL]
  Config --> TealiumEnv[Tealium env vars]

  Config --> AuthService[authService.ts]
  Config --> InputService[inputService.ts]
  Config --> TealiumService[tealiumService.ts]

  AuthService --> BackendAuth[Backend auth endpoints]
  InputService --> BackendInputs[Backend input endpoints]
  TealiumService --> Utag[window.utag]

  Build[Vite build] --> TypeScript[typescript]
  Build --> ReactCompiler[babel-plugin-react-compiler]
  Lint[ESLint] --> TypeScriptEslint[typescript-eslint]
  E2E[Playwright] --> LocalVite[Vite dev server]
```

## Route Map

| Route | Page | Notes |
| --- | --- | --- |
| `/` | `HomePage` | Main mapper page with saved ideas and date/input submission. |
| `/landing` | `LandingPage` | Placeholder landing page. |
| `/login` | `LoginPage` | Admin username/password and Google auth entry. |
| `/register` | `RegisterPage` | Account registration form. |
| `/dashboard` | `AdminLandingPage` | Session-checked admin landing page. |
| `/tools` | `ToolsPage` | Tools and further components. |
| `/home` | Redirect | Legacy path redirected to `/`. |
| `/further` | Redirect | Legacy path redirected to `/tools`. |
| `*` | Redirect | Unknown paths redirect to `/`. |

Routes are centralized in `src/routes.ts`. Use `appRoutes` instead of hard-coded path strings when adding links, redirects, or navigation calls.

## Tealium

Tag management is wired through Tealium iQ.

When `VITE_TEALIUM_ACCOUNT` and `VITE_TEALIUM_PROFILE` are set, the app loads:

```text
https://tags.tiqcdn.com/utag/{account}/{profile}/{environment}/utag.js
```

`TealiumRouteTracker` initializes Tealium once and sends a `page_view` event on every React Router navigation. Use `trackTealiumEvent` from `src/services/tealiumService.ts` for custom link or interaction tracking.

## Data Flow

```mermaid
sequenceDiagram
  participant User
  participant Page
  participant Hook
  participant Service
  participant API
  participant Tealium

  User->>Page: Navigate or submit form
  Page->>Hook: Invoke page hook
  Hook->>Service: Request auth or input data
  Service->>API: fetch VITE_API_BASE_URL endpoint
  API-->>Service: JSON response
  Service-->>Hook: Typed data or error
  Hook-->>Page: Render state
  Page-->>User: Updated UI
  Page->>Tealium: Route tracker sends page_view
```

## Project Structure

```text
src/
  components/
    AppNav/
    ProgressSideBar/
    TealiumRouteTracker/
  hooks/
  pages/
    AdminLanding/
    Home/
    Landing/
    Login/
    Register/
    Tools/
  services/
    authService.ts
    config.ts
    inputService.ts
    tealiumService.ts
  routes.ts
  App.tsx
  main.tsx
```

## Verification

Use these commands before shipping route, auth, or tracking changes:

```bash
npm run build
npm run lint
npm run test:e2e
```
