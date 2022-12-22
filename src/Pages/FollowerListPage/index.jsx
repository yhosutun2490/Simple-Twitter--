import styles from "./FollowerListPage.module.scss";
import ProfileFollowNavBar from "../../Components/ProfileFollowNavBar";
import ProfileFollowList from "../../Components/ProfileFollowList";
import { getOneUserFollower } from "../../Api/FollowShipsAPI"; //取得某位使用者被跟隨清單
import { getOneUserData } from "../../Api/UserAPI";
import { useLocation, useNavigate } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import { useFollowBtn } from "../../Context/FollowBtnContext"; //追隨按鈕共用狀態
import { useAuth } from "../../Context/AuthContext";
function FollowerListPage() {
  //驗證登入
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { selfFollower, setSelfFollower } = useFollowBtn(); //被跟隨名單由共用狀態控制
  // 使用者的被跟隨名單狀態
  const [userData, setUserData] = useState("");

  // 點擊使用者名稱置頂
  const containerRef = useRef(null);
  function scrollTop() {
    containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
  }
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
        console.error("initialize UserData(Follower Page) error", error);
      }
    };
    apiUserData();
  }, [viewID]);
  // 由API獲取所有Follower(被追隨) User資料 (只有第一次mount呼叫useEffect)
  useEffect(() => {
    // 定義初始資料fetch api
    const apiFollowerData = async () => {
      try {
        const apiFollowerData = await getOneUserFollower(viewID); // 等待資料回傳後渲染
        setSelfFollower(apiFollowerData);
      } catch (error) {
        console.error("initialize Follower User error", error);
      }
    };
    apiFollowerData();
  }, [viewID, setSelfFollower]);

  useEffect(() => {
    // 如果token驗證狀態沒過
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);

  return (
    <div className={styles["container"]} ref={containerRef}>
      <div className={styles["profile-navbar"]}>
        <ProfileFollowNavBar
          viewID={viewID}
          scrollTop={scrollTop}
          userData={userData}
        />
      </div>
      <div className={styles["follow-list"]}>
        <ProfileFollowList
          followedData={selfFollower}
          setSelfFollower={setSelfFollower}
        />
      </div>
    </div>
  );
}
export default FollowerListPage;
