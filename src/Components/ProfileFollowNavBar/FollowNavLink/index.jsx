import styles from "./FollowNavLink.module.scss";
import { NavLink } from "react-router-dom";
function FollowNavLink(props) {
  const { viewID } = props;
  return (
    <div className={styles["container"]}>
      <NavLink
        to={`/user/${viewID}/follower`}
        className={({ isActive }) =>
          [
            `${styles["profile-nav-link"]}`,
            isActive ? `${styles["router-link-active"]}` : ``,
          ].join(" ")
        }
        end
      >
        追隨者
      </NavLink>
      <NavLink
        to={`/user/${viewID}/following`}
        className={({ isActive }) =>
          [
            `${styles["profile-nav-link"]}`,
            isActive ? `${styles["router-link-active"]}` : ``,
          ].join(" ")
        }
        end
      >
        正在追隨
      </NavLink>
    </div>
  );
}
export default FollowNavLink;
