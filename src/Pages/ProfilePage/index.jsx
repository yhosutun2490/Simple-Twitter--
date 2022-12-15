import styles from "./ProfilePage.module.scss";
import ProfileUserNavBar from "../../Components/ProfileUserNavBar";
import UserTweetList from "../../Components/UserTweetList";
import { useEffect, useState } from "react";
import { getOneUserTweets, getOneUserData } from "../../Api/UserAPI";

function ProfilePage(props) {
  const [userTweet, setUserTweet] = useState("");
  const [userData, setUserData] = useState("");
  // 預設 userID = 1
  const userID = 1;
  // api文件假資料有點問題，先自創
  const tweetList = [
    {
      id: 1,
      updatedAt: "2022-11-17T15:32:31.000z",
      description: "大家都很棒",
      repliesCount: 5,
      likeCount: 8,
      user: {
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
      user: {
        account: "NatsuTW",
        id: 1,
        name: "Natsu",
        avatar: "https://picsum.photos/50/50",
      },
    },
  ];

  // 由API獲取該使用者Tweet資料 (只有第一次mount呼叫useEffect)
  useEffect(() => {
    // 定義初始資料fetch api
    const apiUserTweet = async () => {
      try {
        const apiAllTweet = await getOneUserTweets(); // 等待資料回傳後渲染
        setUserTweet(apiAllTweet);
      } catch (error) {
        console.error("initialize UserTweets error", error);
      }
    };
    apiUserTweet();
  }, []);
  // 使用者基本資料
  useEffect(() => {
    // 定義初始資料fetch api
    const apiUserData = async () => {
      try {
        const apiUserData = await getOneUserData(); // 等待資料回傳後渲染
        setUserData(apiUserData);
      } catch (error) {
        console.error("initialize UserData error", error);
      }
    };
    apiUserData();
  }, []);
  return (
    <div className={styles["container"]}>
      <ProfileUserNavBar userID={userID} />
      <div>
        <UserTweetList tweetList={tweetList} />
      </div>
    </div>
  );
}
export default ProfilePage;
