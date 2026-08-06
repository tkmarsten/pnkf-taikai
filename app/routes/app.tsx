import type { Route } from "./+types/app";
import Nav from "../components/nav";
import Home from "./home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "PNKF Taikai and Seminar" },
    {
      name: "description",
      content: "Registration page for PNKF kendo taikai and seminar.",
    },
  ];
}

export default function App() {
  return <Home />;
}
