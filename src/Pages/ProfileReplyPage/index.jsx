import styles from "./ProfileReplyPage.module.scss";
import ProfileUserNavBar from "../../Components/ProfileUserNavBar";
import ReplyList from "../../Components/ReplyList";
import { getOneUserData } from "../../Api/UserAPI"; //取得某位使用者主要資料的API
import { getOneUsersReplies } from "../../Api/UserAPI"; // 取得某位使用者自己的回覆列表
import { useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFollowBtn } from "../../Context/FollowBtnContext"; // 追隨按鈕共用狀態用
import { useTweetList } from "../../Context/TweetContext";
import { useAuth } from "../../Context/AuthContext"; // context傳入現在登入使用者資訊
function ProfileReplyPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  // 共用狀態
  const { userProfile, setUserProfile } = useFollowBtn();
  // 頁面資料狀態
  const { selfReplyData, setSelfReplyData } = useTweetList(); //個人回覆資料

  // 目前使用者ID
  const currentUserInfo = useAuth().currentUser;
  const currentUserID = currentUserInfo.id;
  // 置頂功能
  const containerRef = useRef(null);
  function scrollTop() {
    containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
  }
  // 現在瀏覽使用者的ID
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
        console.error("initialize UserData(ProfileReplyPage) error", error);
      }
    };
    apiTweets();
  }, [viewID, setUserProfile]);

  // fecth使用者回覆貼文的資料
  useEffect(() => {
    // 定義初始資料fetch api
    const apiUserReplies = async () => {
      try {
        const apiUserReplies = await getOneUsersReplies(viewID); // 等待資料回傳後渲染
        setSelfReplyData(apiUserReplies);
      } catch (error) {
        console.error("initialize OneTweetReply Data error", error);
      }
    };
    apiUserReplies();
  }, [viewID, setSelfReplyData]);

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
        <ReplyList selfReplies={selfReplyData} selfProfile={userProfile} />
      </div>
    </div>
  );
}

export default ProfileReplyPage;
