# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  # OctoFit Tracker frontend

  The React 19 presentation tier uses Vite and React Router. Set `VITE_CODESPACE_NAME` in `octofit-tracker/frontend/.env.local` when running in Codespaces so the browser can reach the public API on port 8000:

  ```dotenv
  VITE_CODESPACE_NAME=your-codespace-name
  ```

  Use the Codespace name only, without the port or URL. Vite reads this variable at startup, so restart the frontend after changing it. When it is unset, API requests fall back to `http://localhost:8000` for local development. See `.env.example` for the expected format.
      tseslint.configs.strictTypeChecked,
