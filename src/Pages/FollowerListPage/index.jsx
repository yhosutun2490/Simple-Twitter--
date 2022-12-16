import styles from "./FollowerListPage.module.scss";
import ProfileFollowNavBar from "../../Components/ProfileFollowNavBar";
import ProfileFollowList from "../../Components/ProfileFollowList";
import { useLocation } from "react-router-dom";
function FollowerListPage() {
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
    ],
  };

  return (
    <div className={styles["container"]}>
      <ProfileFollowNavBar viewID={viewID} />
      <div className={styles["follow-list"]}>
        <ProfileFollowList followedData={apiData.data} />
      </div>
    </div>
  );
}
export default FollowerListPage;
