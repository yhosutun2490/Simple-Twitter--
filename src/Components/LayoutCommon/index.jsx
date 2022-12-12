import { Outlet } from "react-router-dom";
import styles from "./LayoutCommon.module.scss";
import UserSideBar from "../UserSideBar";
import PopularBar from "../PopularBar";

function LayoutCommon() {
  return (
    <div className={styles["layout-container"]}>
      <div className={styles["column-1"]}>
        <UserSideBar />
      </div>
      <div className={styles["column-2"]}>
        <Outlet />
      </div>
      <div className={styles["column-3"]}>
        <PopularBar />
      </div>
    </div>
  );
}
export default LayoutCommon;
