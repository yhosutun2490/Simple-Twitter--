import styles from "./ProfileNavLink.module.scss";
import { NavLink } from "react-router-dom";

function ProfileNavLink() {
  return (
    <div className={styles["container"]}>
      <NavLink
        to={"/user/:username"}
        className={({ isActive }) =>
          [
            `${styles["profile-nav-link"]}`,
            isActive ? `${styles["router-link-active"]}` : ``,
          ].join(" ")
        }
        end
      >
        推文
      </NavLink>
      <NavLink
        to={"/user/:username/reply"}
        className={({ isActive }) =>
          [
            `${styles["profile-nav-link"]}`,
            isActive ? `${styles["router-link-active"]}` : ``,
          ].join(" ")
        }
        end
      >
        回覆
      </NavLink>
      <NavLink
        to={"/user/:username/likes"}
        className={({ isActive }) =>
          [
            `${styles["profile-nav-link"]}`,
            isActive ? `${styles["router-link-active"]}` : ``,
          ].join(" ")
        }
        end
      >
        喜歡的內容
      </NavLink>
    </div>
  );
}

export default ProfileNavLink;
