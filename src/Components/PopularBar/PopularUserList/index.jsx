import styles from "./PopularUserList.module.scss";
import PopularUserCard from "./PopularUserCard";
import { useEffect, useState } from "react";
import { getTopFollower } from "../../../Api/UserAPI"; //前10大追隨者清單
// 模擬user 假資料
// const fakeUser = [
//   {
//     id: 1,
//     account: "Rafael123",
//     name: "Rafael",
//     isFollowed: true,
//   },
//   {
//     id: 3,
//     account: "Natsu222",
//     name: "Natsu",
//     isFollowed: false,
//   },
//   {
//     id: 4,
//     account: "AnnW50",
//     name: "Ann",
//     isFollowed: true,
//   },
//   {
//     id: 5,
//     account: "Gina123",
//     name: "Gina",
//     isFollowed: false,
//   },
//   {
//     id: 6,
//     account: "Pop3",
//     name: "Pop11",
//     isFollowed: false,
//   },
// ];
function PopularUserList() {
  // fetch 資料存放狀態
  const [topFollower, setTopFollower] = useState("");
  // 由API獲取Top Follower資料 (只有第一次mount呼叫useEffect)
  useEffect(() => {
    // 定義初始資料fetch api
    const apiTweets = async () => {
      try {
        const apiTopFollowers = await getTopFollower(); // 等待資料回傳後渲染
        setTopFollower(apiTopFollowers);
      } catch (error) {
        console.error("initialize TopFollowers error", error);
      }
    };
    apiTweets();
  }, []);
  console.log(topFollower);

  // 之後設定PopularUserCard以map渲染
  return (
    <div className={styles["container"]}>
      <h4 className={styles["popular__title"]}>推薦跟隨</h4>
      <div className={styles["popular__user-list"]}>
        {topFollower &&
          topFollower?.map((user) => (
            <PopularUserCard
              key={user.id}
              id={user.id}
              accountName={user.account}
              userName={user.name}
              isFollowed={user.isFollowing}
              avatar={user.avatar}
            />
          ))}
      </div>
    </div>
  );
}
export default PopularUserList;
