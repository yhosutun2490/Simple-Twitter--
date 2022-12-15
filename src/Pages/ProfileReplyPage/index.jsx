import styles from "./ProfileReplyPage.module.scss";
import ProfileUserNavBar from "../../Components/ProfileUserNavBar";
import ReplyList from "../../Components/ReplyList";
import { useLocation } from "react-router-dom";
function ProfileReplyPage() {
   const { pathname } = useLocation();
   const viewID = pathname.slice(6, 7);
  //  API文件某位使用者假資料
  const user = {
    id: 1,
    account: "NatsuTW",
    email: "user1@example.com",
    name: "Natsu",
    avatar: "https://picsum.photos/50/50",
    introduction: "我是大帥哥",
    role: "1",
    cover: "https://imgur.com/kaoge55g",
    createdAt: "2022-11-17T15:32:31.000z",
    updatedAt: "2022-11-17T15:32:31.000z",
    following: "true",
    followingCount: 3,
    follower: 2,
    tweetsCount: 4,
  };

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
  return (
    <div className={styles["container"]}>
      <ProfileUserNavBar userID={viewID} />
      <div>
        <ReplyList selfReplies={repliesData} selfAccount={user} />
      </div>
    </div>
  );
}

export default ProfileReplyPage;
