import styles from "./ProfilePage.module.scss";
import ProfileUserNavBar from "../../Components/ProfileUserNavBar";
import UserTweetList from "../../Components/UserTweetList";
import { useRef } from "react";
import { useLocation } from "react-router-dom";

function ProfilePage() {
  // 目前使用者ID
  const currentUserID = 1;
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
    {
      id: 3,
      updatedAt: "2022-11-17T15:32:31.000z",
      description: "大家都很棒，隊友加油~!!!",
      repliesCount: 7,
      likeCount: 10,
      user: {
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
      user: {
        account: "NatsuTW",
        id: 1,
        name: "Natsu",
        avatar: "https://picsum.photos/50/50",
      },
    },
  ];

  return (
    <div className={styles["container"]} ref={containerRef}>
      <ProfileUserNavBar
        viewID={viewID}
        currentUserID={currentUserID}
        scrollTop={scrollTop}
      />
      <div>
        <UserTweetList tweetList={tweetList} />
      </div>
    </div>
  );
}
export default ProfilePage;
