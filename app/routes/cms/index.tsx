import type { Route } from "./+types";
import { CMSPage } from "~/features/cms";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "CMS" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function CMS() {
  return <CMSPage />;
}
