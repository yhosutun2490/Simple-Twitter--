import styles from "./UserNavBar.module.scss";
import { ReactComponent as AcLogo } from "../../../assets/icons/AcLogo.svg";
import NavBarItem from "./NavBarItem";
import LogoutButton from "./LogoutButton";
import { NavLink } from "react-router-dom";
import { ReactComponent as House } from "../../../assets/icons/house.svg";
import { ReactComponent as Head } from "../../../assets/icons/head.svg";
import { ReactComponent as Gear } from "../../../assets/icons/gear.svg";
function UserNavBar(props) {
  // 個人資料頁路由名稱 暫定為self
  const currentUsername = "self";
  return (
    <div className={styles["container"]}>
      <AcLogo className={styles["navbar-logo"]} />
      <NavBarItem>
        <NavLink
          to={"/home"}
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
          to={"/home"}
          className={({ isActive }) =>
            [
              `${styles["navbar-link"]}`,
              isActive ? `${styles["router-link-active"]}` : ``,
            ].join(" ")
          }
          end
        >
          {" "}
          <p className={styles["navbar-link__title"]}>首頁</p>
        </NavLink>
      </NavBarItem>
      <NavBarItem>
        <NavLink
          to={`/user/${currentUsername}`}
          className={({ isActive }) =>
            [
              `${styles["navbar-link"]}`,
              isActive ? `${styles["router-link-active"]}` : ``,
            ].join(" ")
          }
          end
        >
          <Head className={styles["navbar-link__logo"]} />
          <p className={styles["navbar-link__title"]}>個人資料</p>
        </NavLink>
      </NavBarItem>
      <NavBarItem>
        <NavLink
          to={"/setting"}
          className={({ isActive }) =>
            [
              `${styles["navbar-link"]}`,
              isActive ? `${styles["router-link-active"]}` : ``,
            ].join(" ")
          }
          end
        >
          <Gear className={styles["navbar-link__logo"]} />
        </NavLink>
        <NavLink
          to={"/setting"}
          className={({ isActive }) =>
            [
              `${styles["navbar-link"]}`,
              isActive ? `${styles["router-link-active"]}` : ``,
            ].join(" ")
          }
          end
        >
          <p className={styles["navbar-link__title"]}>設定</p>
        </NavLink>
      </NavBarItem>
      <div className={styles["tweet-btn"]}>推文</div>
      <div className={styles["logout-btn"]}>
        <LogoutButton />
      </div>
    </div>
  );
}
export default UserNavBar;
