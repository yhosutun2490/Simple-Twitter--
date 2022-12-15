import styles from "./ProfilePage.module.scss";
import ProfileUserNavBar from "../../Components/ProfileUserNavBar";
import UserTweetList from "../../Components/UserTweetList";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";


function ProfilePage(props) {
  // 目前頁面userID
  const { pathname } = useLocation();
  const viewID = pathname.slice(6);

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

  return (
    <div className={styles["container"]}>
      <ProfileUserNavBar userID={viewID} />
      <div>
        <UserTweetList tweetList={tweetList} />
      </div>
    </div>
  );
}
export default ProfilePage;
