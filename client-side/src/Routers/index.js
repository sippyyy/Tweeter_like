import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { PrivateRoutes } from "../utils";
import { routes } from "./routesConfig";

const appRouters = createBrowserRouter([
  ...routes.map((route) => ({
    ...route,
    element: route.isPrivated ?
      <PrivateRoutes><App>{route.element}</App></PrivateRoutes>:
      <App typeLayout={true}>{route.element}</App>,
  }))
]);

export { appRouters };