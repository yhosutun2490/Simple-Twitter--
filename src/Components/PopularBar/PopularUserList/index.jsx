import styles from "./PopularUserList.module.scss";
import PopularUserCard from "./PopularUserCard";
// 模擬user 假資料
const fakeUser = [
  {
    id: 1,
    account: "Rafael123",
    name: "Rafael",
    isFollowed: true,
  },
  {
    id: 3,
    account: "Natsu222",
    name: "Natsu",
    isFollowed: false,
  },
  {
    id: 4,
    account: "AnnW50",
    name: "Ann",
    isFollowed: true,
  },
  {
    id: 5,
    account: "Gina123",
    name: "Gina",
    isFollowed: false,
  },
  {
    id: 6,
    account: "Pop3",
    name: "Pop11",
    isFollowed: false,
  },
];
function PopularUserList() {
  // 之後設定PopularUserCard以map渲染
  return (
    <div className={styles["container"]}>
      <h4 className={styles["popular__title"]}>推薦跟隨</h4>
      <div className={styles["popular__user-list"]}>
        {fakeUser.map((user) => (
          <PopularUserCard
            key={user.id}
            id={user.id}
            accountName={user.account}
            userName={user.name}
            isFollowed={user.isFollowed}
          />
        ))}
      </div>
    </div>
  );
}
export default PopularUserList;
