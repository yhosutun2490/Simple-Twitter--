import styles from "./AdminNavBar.module.scss";
import { ReactComponent as AcLogo } from "../../../assets/icons/AcLogo.svg";
import { ReactComponent as House } from "../../../assets/icons/house.svg";
import { ReactComponent as Head } from "../../../assets/icons/head.svg";
import NavBarItem from "../../UserSideBar/UserNavBar/NavBarItem";
import LogoutButton from "../../UserSideBar/UserNavBar/LogoutButton";
import { NavLink } from "react-router-dom";
function AdminNavBar() {
  return (
    <div className={styles["container"]}>
      <AcLogo className={styles["navbar-logo"]} />
      <NavBarItem>
        <NavLink
          to={"/admin/tweetlist"}
          className={({ isActive }) =>
            [
              `${styles["navbar-link"]}`,
              isActive ? `${styles["router-link-active"]}` : ``,
            ].join(" ")
          }
          end
        >
          <House className={styles["navbar-link__logo"]} />
        </NavLink>
        <NavLink
          to={"/admin/tweetlist"}
          className={({ isActive }) =>
            [
              `${styles["navbar-link"]}`,
              isActive ? `${styles["router-link-active"]}` : ``,
            ].join(" ")
          }
          end
        >
          {" "}
          <p className={styles["navbar-link__title"]}>推文清單</p>
        </NavLink>
      </NavBarItem>
      <NavBarItem>
        <NavLink
          to={"/admin/userlist"}
          className={({ isActive }) =>
            [
              `${styles["navbar-link"]}`,
              isActive ? `${styles["router-link-active"]}` : ``,
            ].join(" ")
          }
          end
        >
          <Head className={styles["navbar-link__logo"]} />
          <p className={styles["navbar-link__title"]}>使用者列表</p>
        </NavLink>
      </NavBarItem>
      <div className={styles["logout-btn"]}>
        <LogoutButton />
      </div>
    </div>
  );
}
export default AdminNavBar;
