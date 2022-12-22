import styles from "./ProfilePage.module.scss";
import ProfileUserNavBar from "../../Components/ProfileUserNavBar";
import UserTweetList from "../../Components/UserTweetList";
import { getOneUserData } from "../../Api/UserAPI"; //取得某位使用者主要資料的API
import { getOneUserTweets } from "../../Api/UserAPI"; // 取得某位使用者自己的推文
import { useRef, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext"; // context傳入現在登入使用者資訊
import { useFollowBtn } from "../../Context/FollowBtnContext"; //追隨按鈕狀態控制context

function ProfilePage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  // 共用狀態
  const { userProfile, setUserProfile } = useFollowBtn();
  // 頁面資料狀態
  const [selfTweetList, setSelfTweetList] = useState("");
  // 目前使用者ID
  const currentUserInfo = useAuth().currentUser;
  const currentUserID = currentUserInfo.id;
  // 置頂功能
  const containerRef = useRef(null);
  function scrollTop() {
    containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
  }
  // 目前頁面瀏覽者ID
  const { pathname } = useLocation();
  const pathNameArr = pathname.split("/");
  const viewID = pathNameArr[2];

  // 定義初始資料fetch api
  useEffect(() => {
    // 定義初始資料fetch api
    const apiTweets = async () => {
      try {
        const userData = await getOneUserData(viewID);
        setUserProfile(userData);
      } catch (error) {
        console.error("initialize UserData(ProfilePage) error", error);
      }
    };
    apiTweets();
  }, [viewID, setUserProfile]);

  useEffect(() => {
    /// 定義初始資料fetch api
    const apiUserTweets = async () => {
      try {
        const userTweet = await getOneUserTweets(viewID);
        setSelfTweetList(userTweet);
      } catch (error) {
        console.error("initialize UserTweets(ProfilePage) error", error);
      }
    };
    apiUserTweets();
  }, [viewID]);

  // 如果使用者沒有取得登入授權狀態(或憑證過期)
  useEffect(() => {
    // 如果token驗證狀態沒過
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);

  return (
    <div className={styles["container"]} ref={containerRef}>
      <ProfileUserNavBar
        viewID={viewID}
        currentUserID={currentUserID}
        scrollTop={scrollTop}
        userProfile={userProfile}
      />
      <div>
        <UserTweetList
          selfTweet={selfTweetList}
          setSelfTweetList={setSelfTweetList}
        />
      </div>
    </div>
  );
}
export default ProfilePage;
