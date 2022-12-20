import styles from "./ProfileEditModal.module.scss";
import { useState, useRef } from "react";
// import initialBackground from "../../assets/icons/background.svg";
import { ReactComponent as Camera } from "../../assets/icons/camera_icon.svg";
import { ReactComponent as Cross } from "../../assets/icons/cross_white.svg";
import { ReactComponent as CrossOrange } from "../../assets/icons/cross_orange.svg";
import { useAuth } from "../../Context/AuthContext"; //傳入登入使用者個人資料
import Swal from "sweetalert2";

function ProfileEditModal(props) {
  // 目前登入者資料
  const currentUserInfo = useAuth().currentUser;
  // 要帶入資料庫使用者的帳戶、名稱、自介、大頭貼和背景圖
  const { trigger, closeEvent } = props;
  //上傳資料儲存狀態
  const [background, setBackgroundUrl] = useState(currentUserInfo.cover);
  const [avatarUrl, setAvatarUrl] = useState(currentUserInfo.avatar);
  const [name, setName] = useState(currentUserInfo.name);
  const [introduction, setIntroduction] = useState(
    currentUserInfo.introduction
  );
  const [photoData, setPhotoData] = useState({ bgImage: "", avatar: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 字數錯誤參數
  const nameError = name?.trim().length > 50 ? "error" : "";
  const introductionError = introduction?.trim().length > 160 ? "error" : "";
  // handlBgeFileChange 取出上傳圖片物件
  function handleBgFileChange(e) {
    const { files } = e.target;
    if (files.length === 0) {
      // 使用者沒有選擇上傳的檔案
      return;
    }
    // 否則產生預覽圖
    const imageURL = window.URL.createObjectURL(files[0]);
    setBackgroundUrl(imageURL);
    setPhotoData({ ...photoData, bgImage: files[0] });
  }
  function handleAvatarFileChange(e) {
    const { files } = e.target;
    if (files.length === 0) {
      // 使用者沒有選擇上傳的檔案
      return;
    }
    // 否則產生預覽圖
    const imageURL = window.URL.createObjectURL(files[0]);
    setAvatarUrl(imageURL);
    setPhotoData({ ...photoData, avatar: files[0] });
  }
  // 表單資料提交，字數超過上限不能提交(表單不送出)、資料如果是空白傳回預設值
  function handleSubmit() {
    // 如果自介或名稱內容是空白(defult)，顯示錯誤再輸入欄底下
    if (name.length === 0 || introduction.length === 0) {
      setIsSubmitting(true);
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
      return;
    }
    const api = async () => {
      try {
        console.log(photoData);
        console.log(name);
        console.log(introduction);
        // 修改成功訊息
        await Swal.fire({
          position: "top",
          title: "成功更新！",
          timer: 2000,
          icon: "success",
          showConfirmButton: false,
        });
        resetModalStatus();
        closeEvent(false); //api回傳成功關閉彈窗
      } catch (error) {
        console.error("[API failed]: ", error);
        await Swal.fire({
          position: "top",
          title: "修改失敗！(伺服器連線問題)",
          timer: 1000,
          icon: "error",
          showConfirmButton: false,
        });
      }
    };
    api();
  }
  // function 關掉視窗後重置狀態(DOM tree在同樣位置)
  function resetModalStatus() {
    // setBackgroundUrl(currentUserInfo.cover);
    // setAvatarUrl("");
    // setName(currentUserInfo.name);
    // setIntroduction("");
    // setPhotoData("");
    setIsSubmitting(false);
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
          <button
            className={styles["btn-save"]}
            type="submit"
            onClick={handleSubmit}
            // disabled={isSubmitting ? true : false}
          >
            儲存
          </button>
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
                {introduction?.length === 0 && isSubmitting ? (
                  <div className={styles["text-error"]}>內容不可空白</div>
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
