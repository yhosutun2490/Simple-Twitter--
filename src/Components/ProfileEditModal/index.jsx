import styles from "./ProfileEditModal.module.scss";
import { useState } from "react";
// import initialBackground from "../../assets/icons/background.svg";
import { ReactComponent as Camera } from "../../assets/icons/camera_icon.svg";
import { ReactComponent as Cross } from "../../assets/icons/cross_white.svg";
import { ReactComponent as CrossOrange } from "../../assets/icons/cross_orange.svg";
import { useAuth } from "../../Context/AuthContext"; //傳入登入使用者個人資料
import { useFollowBtn } from "../../Context/FollowBtnContext"; //傳入使用者資料卡片共用狀態
import { useTweetList } from "../../Context/TweetContext";
import { userEditPhotoModalNew } from "../../Api/EditModalAPI";
import { getOneUserData } from "../../Api/UserAPI"; //個人資料API
import { getOneUserTweets } from "../../Api/UserAPI";
import { getOneUsersReplies } from "../../Api/UserAPI";
import { getOneUsersLikes } from "../../Api/UserAPI";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

function ProfileEditModal(props) {
  // 檢查目前路由
  const { pathname } = useLocation();
  const nowPageName = pathname.split("/")[3];
  // 目前登入者資料
  const currentUserInfo = useAuth().currentUser;
  const userID = currentUserInfo.id;
  // 共用狀態
  const { setUserProfile } = useFollowBtn();
  const { setSelfTweetList, setSelfReplyData, setSelfLikeData } =
    useTweetList();
  // 要帶入資料庫使用者的帳戶、名稱、自介、大頭貼和背景圖
  const { trigger, closeEvent } = props;
  //上傳資料儲存狀態
  const [background, setBackgroundUrl] = useState(currentUserInfo.cover);
  const [avatarUrl, setAvatarUrl] = useState(currentUserInfo.avatar);
  const [name, setName] = useState(currentUserInfo.name);
  const [introduction, setIntroduction] = useState(
    currentUserInfo.introduction
  );
  const [avatarPhoto, setAvatarPhoto] = useState("");
  const [coverPhoto, setCoverPhoto] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 字數錯誤參數
  const nameError = name?.trim().length > 50 ? "error" : "";
  const introductionError = introduction?.trim().length > 160 ? "error" : "";

  // 檢查圖片格式和大小的函式
  async function checkPhotoValid(files) {
    const fileType = files[0].type.slice(0, 5); //檔案類型 (image)
    const imageType = files[0].type.slice(6);
    const fileSize = files[0].size; //檔案大小 (最大1000KB)
    let checkResult = false;
    if (files.length === 0) {
      // 使用者沒有選擇上傳的檔案
      return checkResult;
    }
    // 檔案類型不是圖片
    if (fileType !== "image") {
      await Swal.fire({
        position: "top",
        title: "只能上傳圖片檔案！",
        timer: 1000,
        icon: "error",
        showConfirmButton: false,
      });
      return checkResult;
    }
    if (fileSize >= 1000000) {
      await Swal.fire({
        position: "top",
        title: "圖片大小不能超過1MB",
        timer: 1500,
        icon: "error",
        showConfirmButton: false,
      });
      return checkResult;
    }
    // 圖片類型驗證
    if (imageType === "png" || imageType === "jpeg" || imageType === "jpg") {
      checkResult = true;
      return checkResult;
    } else {
      await Swal.fire({
        position: "top",
        title: "圖片格式錯誤(僅接受png/jpeg/jpg)",
        timer: 1500,
        icon: "error",
        showConfirmButton: false,
      });
      return checkResult;
    }
  }
  // handlBgeFileChange 取出上傳圖片物件
  async function handleBgFileChange(e) {
    const { files } = e.target;
    const checkResult = await checkPhotoValid(files);
    if (checkResult) {
      // 檢查正確產生預覽圖
      const imageURL = window.URL.createObjectURL(files[0]);
      setBackgroundUrl(imageURL);
      setCoverPhoto(files[0]);
    } else {
      return;
    }
  }
  async function handleAvatarFileChange(e) {
    const { files } = e.target;
    const checkResult = await checkPhotoValid(files);
    if (checkResult) {
      // 檢查圖片正確產生預覽圖
      const imageURL = window.URL.createObjectURL(files[0]);
      setAvatarUrl(imageURL);
      setAvatarPhoto(files[0]);
    }
  }
  // 表單資料提交，字數超過上限不能提交(表單不送出)、資料如果是空白傳回預設值
  async function handleSubmit() {
    setIsSubmitting(true);
    // 如果名稱是空白，顯示錯誤再輸入欄底下
    if (name.length === 0) {
      return;
    }

    // 超過字數上限表單不作事、跳出錯誤
    if (nameError === "error" || introductionError === "error") {
      Swal.fire({
        position: "top",
        title: "輸入字數超過上限！",
        timer: 1000,
        icon: "info",
        showConfirmButton: false,
      });
      setIsSubmitting(false);
      return;
    }
    let formData = new FormData();
    formData.append("avatar", avatarPhoto);
    formData.append("cover", coverPhoto);
    formData.append("name", name);
    formData.append("introduction", introduction);
    // 等待編輯後端API回傳訊息
    const editResponse = await userEditPhotoModalNew(userID, formData);
    if (editResponse.status === 200) {
      await Swal.fire({
        position: "top",
        title: "編輯個人資料成功！",
        timer: 2000,
        icon: "success",
        showConfirmButton: false,
      });
      //返回使用者頁面，同步更新個人資料頁
      if (nowPageName === undefined) {
        const selfNewTweet = await getOneUserTweets(userID);
        setSelfTweetList(selfNewTweet);
      }
      if (nowPageName === "reply") {
        const selfNewReply = await getOneUsersReplies(userID);
        setSelfReplyData(selfNewReply);
      }
      if (nowPageName === "like") {
        const selfNewLike = await getOneUsersLikes(userID);
        setSelfLikeData(selfNewLike);
      }
      const newSelfPrfileData = await getOneUserData(userID);
      setUserProfile(newSelfPrfileData);
      resetModalStatus();
    } else {
      await Swal.fire({
        position: "top",
        title: "編輯個人資料失敗！",
        timer: 1000,
        icon: "error",
        showConfirmButton: false,
      });
      setIsSubmitting(false);
    }
  }
  // function 關掉視窗後重置狀態
  function resetModalStatus() {
    setIsSubmitting(false);
    setBackgroundUrl("");
    setAvatarUrl("");
    setIsSubmitting(false);
    closeEvent(false);
  }

  // 處理onFocus 使用者再次輸入時解除按鈕disabled
  function handleOnFocus() {
    setIsSubmitting(false);
  }
  /////////////////////元件JSX
  // 如果trigger是 True 打開元件
  return trigger ? (
    <>
      <div
        className={styles["popup-backdrop"]}
        onClick={() => {
          resetModalStatus();
          closeEvent(false);
        }}
      ></div>
      <div className={styles["popup-main-window"]}>
        <div className={styles["popup-head"]}>
          <CrossOrange
            className={styles["btn-cross-orange"]}
            onClick={() => {
              resetModalStatus();
              closeEvent(false);
            }}
          />
          <p className={styles["popup-title"]}>編輯個人資料</p>
          {!isSubmitting && (
            <button
              className={styles["btn-save"]}
              type="submit"
              onClick={handleSubmit}
            >
              儲存
            </button>
          )}
          {isSubmitting ? (
            <button className={styles["btn-submitting"]}>傳送中</button>
          ) : (
            ""
          )}
        </div>
        <div className={styles["popup-body"]} onFocus={handleOnFocus}>
          <div className={styles["user-bg"]}>
            <img
              src={background ? background : currentUserInfo.cover}
              alt="bg-img"
              className={styles["bg-image"]}
            />
            <label htmlFor="user-bg" className={styles["user-bg-label-camera"]}>
              <Camera />
            </label>
            <label className={styles["user-bg-label-cross"]}>
              <Cross onClick={() => setBackgroundUrl("")} />
            </label>
            <input
              type="file"
              className={styles["user-bg-input"]}
              id="user-bg"
              onChange={(e) => {
                handleBgFileChange(e);
              }}
            />
          </div>
          <div className={styles["user-avatar"]}>
            <div className={styles["avatar-image-wrap"]}>
              <img
                src={avatarUrl ? avatarUrl : currentUserInfo.avatar}
                alt="person-avatar"
                className={styles["avatar-image"]}
              />
            </div>
            <label
              htmlFor="user-avatar"
              className={styles["user-label-camera-avatar"]}
            >
              <Camera />
            </label>
            <input
              type="file"
              className={styles["user-avatar-input"]}
              id="user-avatar"
              onChange={(e) => {
                handleAvatarFileChange(e);
              }}
            />
          </div>
          <div className={styles["form-group"]}>
            <div className={`${styles["form-row"]} ${styles[nameError]}`}>
              <label htmlFor="name" className={styles["label-title"]}>
                名稱
              </label>
              <input
                type="text"
                placeholder="請輸入名稱"
                id="name"
                className={styles["form-input"]}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                defaultValue={currentUserInfo.name}
              />
            </div>
            <div className={styles["form-row-text"]}>
              <div className={styles["text-error-group"]}>
                {nameError ? (
                  <div className={styles["text-error"]}>字數超過上限</div>
                ) : (
                  <div></div>
                )}
                {name?.length === 0 && isSubmitting ? (
                  <div className={styles["text-error"]}>內容不可空白</div>
                ) : (
                  <div></div>
                )}
              </div>

              <div className={styles["text-length"]}>
                {name === "" ? 0 : name?.trim().length}/50
              </div>
            </div>
            <div
              className={`${styles["form-row"]} ${styles["form-row-intro"]} ${styles[introductionError]}`}
            >
              <label htmlFor="intro" className={styles["label-title"]}>
                自我介紹
              </label>
              <textarea
                type="text"
                placeholder="自我介紹"
                id="intro"
                className={`${styles["form-input"]} ${styles["form-input-intro"]}`}
                onChange={(e) => setIntroduction(e.target.value)}
                rows="7"
                defaultValue={currentUserInfo.introduction}
              />
            </div>
            <div className={styles["form-row-text"]}>
              <div className={styles["text-error-group"]}>
                {introductionError ? (
                  <div className={styles["text-error"]}>字數超過上限</div>
                ) : (
                  <div></div>
                )}
              </div>
              <div className={styles["text-length"]}>
                {introduction == null ? 0 : introduction?.trim().length}
                /160
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    ""
  );
}
export default ProfileEditModal;
