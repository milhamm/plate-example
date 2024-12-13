import {
  type RouteConfig,
  index,
  layout,
  prefix,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  layout("routes/cms/layout.tsx", [
    ...prefix("cms", [index("routes/cms/index.tsx")]),
  ]),
] satisfies RouteConfig;
