import styles from "./FolloweringListPage.module.scss";
import { useLocation } from "react-router-dom";
import ProfileFollowNavBar from "../../Components/ProfileFollowNavBar";
import ProfileFollowList from "../../Components/ProfileFollowList";
import { getOneUserFollowing } from "../../Api/FollowShipsAPI"; //取得使用者追隨中清單
import { getOneUserData } from "../../Api/UserAPI"; //取得使用者資本資料
import { useState, useEffect } from "react";
function FolloweringListPage() {
  // 使用者儲存自己追隨資料的狀態
  const [userData, setUserData] = useState("");
  const [selfFollowing, setSelfFollowing] = useState("");

  // 現在瀏覽使用者的ID
  const { pathname } = useLocation();
  const pathNameArr = pathname.split("/");
  const viewID = pathNameArr[2];
  // 自己的個人資料、推文數
  useEffect(() => {
    // 定義初始資料fetch api
    const apiUserData = async () => {
      try {
        const apiResUserData = await getOneUserData(viewID); // 等待資料回傳後渲染
        setUserData(apiResUserData);
      } catch (error) {
        console.error("initialize UserData(Following Page) error", error);
      }
    };
    apiUserData();
  }, [viewID]);

  // 由API獲取所有Following User資料 (只有第一次mount呼叫useEffect)
  useEffect(() => {
    // 定義初始資料fetch api
    const apiFollowingData = async () => {
      try {
        const apiFollowingData = await getOneUserFollowing(viewID); // 等待資料回傳後渲染
        setSelfFollowing(apiFollowingData);
      } catch (error) {
        console.error("initialize Following User error", error);
      }
    };
    apiFollowingData();
  }, [viewID]);

  return (
    <div className={styles["container"]}>
      <div className={styles["profile-navbar"]}>
        <ProfileFollowNavBar viewID={viewID} userData={userData} />
      </div>
      <div className={styles["follow-list"]}>
        <ProfileFollowList followingData={selfFollowing} />
      </div>
    </div>
  );
}

export default FolloweringListPage;
