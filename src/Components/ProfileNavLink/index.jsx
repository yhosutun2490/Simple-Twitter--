import styles from "./ProfileNavLink.module.scss";
import { NavLink, useLocation } from "react-router-dom";

function ProfileNavLink(props) {
  // 要用context provider傳入現在瀏覽者id
  const { userID } = props;
  const { pathname } = useLocation();
  return (
    <div className={styles["container"]}>
      <NavLink
        to={`/user/${userID}`}
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
        to={`/user/${userID}/reply`}
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
        to={`/user/${userID}/likes`}
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
