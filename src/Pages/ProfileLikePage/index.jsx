import styles from "./ProfileLikePage.module.scss";
import ProfileUserNavBar from "../../Components/ProfileUserNavBar";
import UserTweetList from "../../Components/UserTweetList";
import { useLocation } from "react-router-dom";
function ProfileLikePage() {
  // 目前使用者ID
  const currentUserID = 1;
  // 現在瀏覽者的ID
  const { pathname } = useLocation();
  const pathNameArr = pathname.split("/");
  const viewID = pathNameArr[2];

  //另一支API 使用者個人資料
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

  // api文件 使用者like推文資料
  const likedata = {
    status: "success",
    data: [
      {
        id: 1,
        description: "我在推文",
        createdAt: "2022-11-17T15:32:31.000z",
        updatedAt: "2022-11-17T15:32:31.000z",
        likeCount: 8,
        liked: true,
        replies: 5,
        user: {
          id: 3,
          account: "Rafael202",
          name: "Rafael",
          avatar: "https://picsum.photos/50/50",
        },
      },
      {
        id: 2,
        description: "我在推文2",
        createdAt: "2022-11-17T15:32:31.000z",
        updatedAt: "2022-11-17T15:32:31.000z",
        liked: true,
        user: {
          id: 2,
          account: "Rubyhelen",
          name: "Ruby",
          avatar: "https://picsum.photos/50/50",
        },
      },
    ],
  };

  return (
    <div className={styles["container"]}>
      <ProfileUserNavBar viewID={viewID} currentUserID={currentUserID} />
      <div>
        <UserTweetList tweetList={likedata.data} />
      </div>
    </div>
  );
}

export default ProfileLikePage;
