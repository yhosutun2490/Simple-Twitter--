import styles from "./FolloweringListPage.module.scss";
import { useLocation } from "react-router-dom";
import ProfileFollowNavBar from "../../Components/ProfileFollowNavBar";
import ProfileFollowList from "../../Components/ProfileFollowList";
function FolloweringListPage() {
  // apiData
  const apiData = [
    {
      followerId: 3,
      followingId: 2,
      createdAt: "2022-12-12T00:00:00.000Z",
      updatedAt: "2022-12-12T00:00:00.000Z",
      id: 2,
      account: "user1",
      name: "user1",
      introduction:
        "Inventore ipsa ut nisi ducimus culpa nesciunt. Et nobis alias quis earum deleniti quas voluptas officia.",
      avatar: "https://loremflickr.com/140/140/people/?random=1.7767842498287",
      Following: 0,
    },
    {
      followerId: 3,
      followingId: 4,
      createdAt: "2022-12-12T00:00:00.000Z",
      updatedAt: "2022-12-12T00:00:00.000Z",
      id: 4,
      account: "architecto",
      name: "Mattie Borer",
      introduction:
        "Ducimus nihil cum distinctio ut. Doloribus aut sed voluptatem. Totam quo error expedita consequatur quis veritatis eius culpa. Dolorem odio ipsa sit omnis omnis",
      avatar: "https://loremflickr.com/140/140/people/?random=93.4816219787695",
      Following: 0,
    },
    {
      followerId: 3,
      followingId: 5,
      createdAt: "2022-12-12T00:00:00.000Z",
      updatedAt: "2022-12-12T00:00:00.000Z",
      id: 5,
      account: "aspernatur",
      name: "Bertha Harvey",
      introduction:
        "Molestias non culpa perferendis eaque et labore ipsum sapiente. Consequatur voluptas velit totam autem sit ea fugit ut.",
      avatar:
        "https://loremflickr.com/140/140/people/?random=89.36766613202873",
      Following: 0,
    },
  ];

  // 現在瀏覽使用者的ID
  const { pathname } = useLocation();
  const pathNameArr = pathname.split("/");
  const viewID = pathNameArr[2];
  return (
    <div className={styles["container"]}>
      <ProfileFollowNavBar viewID={viewID} />
      <div className={styles["follow-list"]}>
        <ProfileFollowList followingData={apiData} />
      </div>
    </div>
  );
}

export default FolloweringListPage;
