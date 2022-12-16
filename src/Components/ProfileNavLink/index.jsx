import styles from "./ProfileNavLink.module.scss";
import { NavLink } from "react-router-dom";

function ProfileNavLink(props) {
  // 傳入現在瀏覽者id(viewID)
  const { viewID } = props;
  return (
    <div className={styles["container"]}>
      <NavLink
        to={`/user/${viewID}`}
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
        to={`/user/${viewID}/reply`}
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
        to={`/user/${viewID}/likes`}
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
