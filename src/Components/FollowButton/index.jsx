import styles from "./FollowButton.module.scss";
import { addfollowUser } from "../../Api/FollowShipsAPI"; //增加跟隨
import { deletefollowUser } from "../../Api/FollowShipsAPI"; //取消跟隨
import { getOneUserFollower } from "../../Api/FollowShipsAPI"; //被跟隨名單API
import { getOneUserFollowing } from "../../Api/FollowShipsAPI"; //追隨中名單API
import { getTopFollower } from "../../Api/UserAPI"; //推薦跟隨API
import { getOneUserData } from "../../Api/UserAPI"; //取得某位使用者主資料
import { useAuth } from "../../Context/AuthContext"; //取得現在登入者資料
import { useFollowBtn } from "../../Context/FollowBtnContext"; //取得追隨按鈕所有共用的setFunciton
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

function FollowButton(props) {
  // 更新用的狀態setFunction，由context統一管理
  const { setSelfFollower, setSelfFollowing, setTopFollower, setUserProfile } =
    useFollowBtn();
  // 設定本人id，傳入的使用者id，跟隨狀態，如果是使用者本人不顯示跟隨按鈕
  const currentUserInfo = useAuth().currentUser;
  const currentUserID = currentUserInfo.id; // 登入使用者自己的id
  const { userID, isFollow } = props; // userID指的是卡片使用者id
  let newIsFollowering = isFollow; // 處理後端資料格式不一樣
  if (Number(newIsFollowering) === 1) {
    newIsFollowering = true;
  } else {
    newIsFollowering = false;
  }

  // 現在觀看的使用者viewID 同步更新刷畫面用
  const { pathname } = useLocation();
  const nowPageName = pathname.split("/")[3]; //區分現在在following or follow頁面
  const viewID = pathname.split("/")[2]; //要轉成數字，不然api吃不到
  const userPageName = pathname.split("/")[1]; //取出路由是否為user (個人資料頁)

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
      // 加入追隨後同步更新
      if (nowPageName === "following") {
        const apiNewFollowing = await getOneUserFollowing(viewID);
        setSelfFollowing(apiNewFollowing);
      }
      if (nowPageName === "follower") {
        const apiNewFollower = await getOneUserFollower(viewID);
        setSelfFollower(apiNewFollower);
      }
      if (userPageName === "user") {
        const apiViewUserData = await getOneUserData(viewID);
        setUserProfile(apiViewUserData);
      }

      const apiTopFollower = await getTopFollower();
      setTopFollower(apiTopFollower);
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
    if (apiResponse.status === 200) {
      await Swal.fire({
        position: "top",
        title: "取消追隨成功！",
        timer: 2000,
        icon: "success",
        showConfirmButton: false,
      });
      // 退追成功後要及時更新
      if (nowPageName === "following") {
        const apiNewFollowing = await getOneUserFollowing(viewID);
        setSelfFollowing(apiNewFollowing);
        const apiTopFollower = await getTopFollower();
        setTopFollower(apiTopFollower);
      }
      if (nowPageName === "follower") {
        const apiNewFollower = await getOneUserFollower(viewID);
        setSelfFollower(apiNewFollower);
        const apiTopFollower = await getTopFollower();
        setTopFollower(apiTopFollower);
      }
      if (userPageName === "user") {
        const apiViewUserData = await getOneUserData(viewID);
        setUserProfile(apiViewUserData);
      }
      const apiTopFollower = await getTopFollower();
      setTopFollower(apiTopFollower);
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
