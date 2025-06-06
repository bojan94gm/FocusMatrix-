import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("about", "routes/about.tsx"),
  route("completed", "routes/completed.tsx"),
  route("matrix", "routes/matrix.tsx"),
  route("routines", "routes/routines.tsx"),
] satisfies RouteConfig;
