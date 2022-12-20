import styles from "./ProfilePage.module.scss";
import ProfileUserNavBar from "../../Components/ProfileUserNavBar";
import UserTweetList from "../../Components/UserTweetList";
import { getOneUserData } from "../../Api/UserAPI"; //取得某位使用者主要資料的API
import { useRef, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext"; // context傳入現在登入使用者資訊

function ProfilePage() {
  // 頁面資料狀態
  const [userProfile, setUserProfile] = useState("");
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

  // api文件假資料有點問題，先自創
  const tweetList = [
    {
      id: 1,
      updatedAt: "2022-11-17T15:32:31.000z",
      description: "大家都很棒",
      repliesCount: 5,
      likeCount: 8,
      User: {
        account: "NatsuTW",
        id: 1,
        name: "Natsu",
        avatar: "https://picsum.photos/50/50",
      },
    },
    {
      id: 2,
      updatedAt: "2022-11-17T15:32:31.000z",
      description: "大家都很棒22",
      repliesCount: 7,
      likeCount: 10,
      User: {
        account: "NatsuTW",
        id: 1,
        name: "Natsu",
        avatar: "https://picsum.photos/50/50",
      },
    },
    {
      id: 3,
      updatedAt: "2022-11-17T15:32:31.000z",
      description: "大家都很棒，隊友加油~!!!",
      repliesCount: 7,
      likeCount: 10,
      User: {
        account: "NatsuTW",
        id: 1,
        name: "Natsu",
        avatar: "https://picsum.photos/50/50",
      },
    },
    {
      id: 4,
      updatedAt: "2022-11-17T15:32:31.000z",
      description: "大家都很棒，隊友加油~!!!",
      repliesCount: 7,
      likeCount: 10,
      User: {
        account: "NatsuTW",
        id: 1,
        name: "Natsu",
        avatar: "https://picsum.photos/50/50",
      },
    },
  ];
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
        <UserTweetList tweetList={tweetList} />
      </div>
    </div>
  );
}
export default ProfilePage;
