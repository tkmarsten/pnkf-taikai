import { NavLink } from "react-router";

export default function Nav() {
  return (
    <nav>
      <NavLink to="/" end>
        Home
      </NavLink>
      <NavLink to="/tournament" end>
        Tournament
      </NavLink>
    </nav>
  );
}
