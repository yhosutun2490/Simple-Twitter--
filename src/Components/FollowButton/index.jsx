import styles from "./FollowButton.module.scss";
import { addfollowUser } from "../../Api/FollowShipsAPI"; //增加跟隨
import { deletefollowUser } from "../../Api/FollowShipsAPI"; //取消跟隨
import { useAuth } from "../../Context/AuthContext"; //取得現在登入者資料
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

function FollowButton(props) {
  // 設定本人id，傳入的使用者id，跟隨狀態，如果是使用者本人不顯示跟隨按鈕
  const currentUserInfo = useAuth().currentUser;
  const currentUserID = currentUserInfo.id; // 登入使用者自己的id
  const { userID, isFollow } = props; // userID指的是卡片使用者id
  let newIsFollowering = isFollow;
  if (Number(newIsFollowering) === 1) {
    newIsFollowering = true;
  } else {
    newIsFollowering = false;
  }
  console.log(newIsFollowering);
  // 現在觀看的使用者viewID 同步更新刷畫面用
  const { pathname } = useLocation();
  const viewID = pathname.split("/")[2];

  // 點擊打api用
  async function handleAddFollow() {
    const apiResponse = await addfollowUser(userID);
    if (apiResponse.status === 200) {
      await Swal.fire({
        position: "top",
        title: "追隨使用者成功！",
        timer: 2000,
        icon: "success",
        showConfirmButton: false,
      });
    } else {
      await Swal.fire({
        position: "top",
        title: "追隨使用者失敗",
        timer: 2000,
        icon: "error",
        showConfirmButton: false,
      });
    }
  }

  async function handleDeleteFollow() {
    const apiResponse = await deletefollowUser(currentUserID, userID);
    console.log(apiResponse);
    if (apiResponse.status === 200) {
      await Swal.fire({
        position: "top",
        title: "取消追隨成功！",
        timer: 2000,
        icon: "success",
        showConfirmButton: false,
      });
    } else {
      await Swal.fire({
        position: "top",
        title: "取消追隨失敗",
        timer: 2000,
        icon: "error",
        showConfirmButton: false,
      });
    }
  }
  return Number(currentUserID) === Number(userID) ? (
    <div></div>
  ) : !newIsFollowering ? (
    <button className={styles["follow-btn"]} onClick={handleAddFollow}>
      跟隨
    </button>
  ) : (
    <button className={styles["following-btn"]} onClick={handleDeleteFollow}>
      正在跟隨
    </button>
  );
}
export default FollowButton;
