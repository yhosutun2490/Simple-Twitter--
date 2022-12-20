import styles from "./ProfileReplyPage.module.scss";
import ProfileUserNavBar from "../../Components/ProfileUserNavBar";
import ReplyList from "../../Components/ReplyList";
import { getOneUserData } from "../../Api/UserAPI"; //取得某位使用者主要資料的API
import { getOneUsersReplies } from "../../Api/UserAPI"; // 取得某位使用者自己的回覆列表
import { useRef, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext"; // context傳入現在登入使用者資訊
function ProfileReplyPage() {
  // 頁面資料狀態
  const [userProfile, setUserProfile] = useState(""); //個人資料
  const [selfReplyData, setSelfReplyData] = useState(""); //個人回覆資料
  console.log(selfReplyData);
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

  // API文件假資料
  const repliesData = [
    {
      id: 1,
      description: "我在推文",
      createdAt: "2022-11-17T15:32:31.000z",
      updatedAt: "2022-11-17T15:32:31.000z",
      user: {
        account: "user1",
        id: 5,
      },
      replied: [
        {
          id: 1,
          comment: "第一則回覆",
          createdAt: "2022-11-17T15:32:31.000z",
          updatedAt: "2022-11-17T15:32:31.000z",
        },
        {
          id: 2,
          comment: "第二則回覆",
          createdAt: "2022-11-17T15:32:31.000z",
          updatedAt: "2022-11-17T15:32:31.000z",
        },
      ],
    },
    {
      id: 2,
      description: "我在推文2",
      createdAt: "2022-11-17T15:32:31.000z",
      updatedAt: "2022-11-17T15:32:31.000z",
      user: {
        account: "user1",
        id: 5,
      },
      replied: [
        {
          id: 1,
          comment: "第一則回覆",
          createdAt: "2022-11-17T15:32:31.000z",
          updatedAt: "2022-11-17T15:32:31.000z",
        },
      ],
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
        console.error("initialize UserData(ProfileReplyPage) error", error);
      }
    };
    apiTweets();
  }, [viewID]);

  // fecth使用者回覆貼文的資覅
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
        <ReplyList selfReplies={selfReplyData} selfProfile={userProfile} />
      </div>
    </div>
  );
}

export default ProfileReplyPage;
