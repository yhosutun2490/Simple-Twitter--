import styles from "./LogoutButton.module.scss";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../../../Context/AuthContext";
import { ReactComponent as Logout } from "../../../../assets/icons/logout.svg";

function LogoutButton() {
  const { logout } = useAuth();
  const { pathname } = useLocation();

  const handleClick = () => {
    logout();
  };
  return (
    <div className={styles["container"]} onClick={handleClick}>
      <NavLink
        // 如果現在位置在前台則回到前台登入，後台則回到後台登入
        to={pathname.includes("admin") ? "/admin" : "/login"}
        className={styles["navlink-logo"]}
      >
        <Logout />
      </NavLink>
      <NavLink
        to={pathname.includes("admin") ? "/admin" : "/login"}
        className={styles["navlink-title"]}
      >
        登出
      </NavLink>
    </div>
  );
}

export default LogoutButton;
