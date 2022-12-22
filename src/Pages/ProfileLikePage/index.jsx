import styles from "./ProfileLikePage.module.scss";
import ProfileUserNavBar from "../../Components/ProfileUserNavBar";
import UserTweetList from "../../Components/UserTweetList";
import { useLocation } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { useAuth } from "../../Context/AuthContext"; // 登入使用者狀態共用
import { useFollowBtn } from "../../Context/FollowBtnContext"; // 按鈕共用狀態用
import { getOneUserData } from "../../Api/UserAPI"; //取得某位使用者資料
import { getOneUsersLikes } from "../../Api/UserAPI"; // 取得某位使用者喜歡的推文

function ProfileLikePage() {
  // 共用狀態
  const { userProfile, setUserProfile } = useFollowBtn();
  // 頁面資料狀態
  const [selfLikeData, setSelfLikeData] = useState(""); //個人回覆資料
  // 目前使用者ID
  const currentUserInfo = useAuth().currentUser;
  const currentUserID = currentUserInfo.id;
  // 現在瀏覽者的ID
  const { pathname } = useLocation();
  const pathNameArr = pathname.split("/");
  const viewID = pathNameArr[2];
  // 置頂功能
  const containerRef = useRef(null);
  function scrollTop() {
    containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
  }

  // 定義初始資料fetch api
  useEffect(() => {
    // 定義初始資料fetch api
    const apiTweets = async () => {
      try {
        const userData = await getOneUserData(viewID);
        setUserProfile(userData);
      } catch (error) {
        console.error("initialize UserData(ProfileLikePage) error", error);
      }
    };
    apiTweets();
  }, [viewID, setUserProfile]);

  // fecth使用者likes的資料
  useEffect(() => {
    // 定義初始資料fetch api
    const apiUserLikes = async () => {
      try {
        const userLikeData = await getOneUsersLikes(viewID);
        setSelfLikeData(userLikeData);
      } catch (error) {
        console.error("initialize OneTweetReply Data error", error);
      }
    };
    apiUserLikes();
  }, [viewID]);

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
          selfLikeTweet={selfLikeData}
          setSelfLikeTweet={setSelfLikeData}
        />
      </div>
    </div>
  );
}

export default ProfileLikePage;
