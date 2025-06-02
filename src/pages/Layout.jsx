import { NavLink, Outlet } from "react-router-dom";
import styles from "./Layout.module.css";

export default function Layout() {
  return (
    <div>
      <nav className={styles.nav}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/movies"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          Movies
        </NavLink>
      </nav>

      <Outlet />
    </div>
  );
}
