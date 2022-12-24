import styles from "./FolloweringListPage.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import ProfileFollowNavBar from "../../Components/ProfileFollowNavBar";
import ProfileFollowList from "../../Components/ProfileFollowList";
import { getOneUserFollowing } from "../../Api/FollowShipsAPI"; //取得使用者追隨中清單
import { getOneUserData } from "../../Api/UserAPI"; //取得使用者資本資料
import { useState, useEffect } from "react";
import { useFollowBtn } from "../../Context/ProfileContext"; //追隨按鈕共用狀態
import { useAuth } from "../../Context/AuthContext";

function FolloweringListPage() {
  //驗證用
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { selfFollowing, setSelfFollowing } = useFollowBtn(); //追隨清單按鈕共用狀態
  // 使用者儲存自己資料的狀態
  const [userData, setUserData] = useState("");

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
  }, [viewID, setSelfFollowing]);

  useEffect(() => {
    // 如果token驗證狀態沒過
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);

  return (
    <div className={styles["container"]}>
      <div className={styles["profile-navbar"]}>
        <ProfileFollowNavBar viewID={viewID} userData={userData} />
      </div>
      <div className={styles["follow-list"]}>
        <ProfileFollowList
          followingData={selfFollowing}
          setSelfFollowing={setSelfFollowing}
        />
      </div>
    </div>
  );
}

export default FolloweringListPage;
