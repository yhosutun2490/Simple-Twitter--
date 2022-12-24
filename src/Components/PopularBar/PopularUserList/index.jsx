import styles from "./PopularUserList.module.scss";
import PopularUserCard from "./PopularUserCard";
import { useAuth } from "../../../Context/AuthContext"; // 取得當前使用者id context狀態
import { useEffect } from "react";
import { getTopFollower } from "../../../Api/UserAPI"; //前10大追隨者清單API
import { useFollowBtn } from "../../../Context/ProfileContext"; //推薦跟隨狀態由context共享

function PopularUserList() {
  const { topFollower, setTopFollower } = useFollowBtn(); //推薦追隨資料放在共享context
  // 現在使用者資料
  const currentUserInfo = useAuth().currentUser;
  const currentUserID = currentUserInfo.id;
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
  }, [setTopFollower]);

  // 之後設定PopularUserCard以map渲染
  return (
    <div className={styles["container"]}>
      <h4 className={styles["popular__title"]}>推薦跟隨</h4>
      <div className={styles["popular__user-list"]}>
        {topFollower &&
          topFollower?.map((user) => (
            <PopularUserCard
              key={user?.id}
              userID={user?.id}
              accountName={user?.account}
              userName={user?.name}
              isFollowed={user?.isFollowing}
              avatar={user?.avatar}
              currentUserID={currentUserID}
              setTopFollower={setTopFollower}
            />
          ))}
      </div>
    </div>
  );
}
export default PopularUserList;
