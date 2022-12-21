import styles from "./FollowerListPage.module.scss";
import ProfileFollowNavBar from "../../Components/ProfileFollowNavBar";
import ProfileFollowList from "../../Components/ProfileFollowList";
import { getOneUserFollower } from "../../Api/FollowShipsAPI"; //取得某位使用者被跟隨清單
import { getOneUserData } from "../../Api/UserAPI";
import { useLocation } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
function FollowerListPage() {
  // 使用者的被跟隨名單狀態
  const [userData, setUserData] = useState("");
  const [selfFollower, setSelfFollower] = useState("");

  // 點擊使用者名稱置頂
  const containerRef = useRef(null);
  function scrollTop() {
    containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
  }
  // 現在瀏覽使用者的ID
  const { pathname } = useLocation();
  const pathNameArr = pathname.split("/");
  const viewID = pathNameArr[2];
  // 跟隨者假資料
  const apiData = {
    status: "success",
    data: [
      {
        id: 1,
        account: "user1",
        email: "user1@example.com",
        name: "handsome",
        avatar: "https://picsum.photos/50/50?random=1",
        introduction:
          "我是大帥哥 If you are going to use a passage of Lorem Ipsum",
        cover: "https://imgur.com/kaoge55g",
        createdAt: "2022-11-17T15:32:31.000z",
        updatedAt: "2022-11-17T15:32:31.000z",
        following: true,
      },
      {
        id: 2,
        account: "user2",
        email: "user2@example.com",
        name: "handsome",
        avatar: "https://picsum.photos/50/50?random=2",
        introduction:
          "我是小帥哥 If you are going to use a passage of Lorem Ipsum",
        cover: "https://imgur.com/kaoge55g",
        createdAt: "2022-11-17T15:32:31.000z",
        updatedAt: "2022-11-17T15:32:31.000z",
        following: false,
      },
      {
        id: 3,
        account: "user3",
        email: "user2@example.com",
        name: "handsome",
        avatar: "https://picsum.photos/50/50?random=3",
        introduction:
          "我是小帥哥 If you are going to use a passage of Lorem Ipsum",
        cover: "https://imgur.com/kaoge55g",
        createdAt: "2022-11-17T15:32:31.000z",
        updatedAt: "2022-11-17T15:32:31.000z",
        following: false,
      },
      {
        id: 4,
        account: "user4",
        email: "user2@example.com",
        name: "handsome",
        avatar: "https://picsum.photos/50/50?random=4",
        introduction:
          "我是小帥哥 If you are going to use a passage of Lorem Ipsum",
        cover: "https://imgur.com/kaoge55g",
        createdAt: "2022-11-17T15:32:31.000z",
        updatedAt: "2022-11-17T15:32:31.000z",
        following: false,
      },

      {
        id: 5,
        account: "user5",
        email: "user2@example.com",
        name: "handsome",
        avatar: "https://picsum.photos/50/50?random=5",
        introduction:
          "我是小帥哥 If you are going to use a passage of Lorem Ipsum",
        cover: "https://imgur.com/kaoge55g",
        createdAt: "2022-11-17T15:32:31.000z",
        updatedAt: "2022-11-17T15:32:31.000z",
        following: false,
      },
    ],
  };
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
  }, [viewID]);

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
        <ProfileFollowList followedData={selfFollower} />
      </div>
    </div>
  );
}
export default FollowerListPage;
