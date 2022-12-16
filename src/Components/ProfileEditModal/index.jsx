import styles from "./ProfileEditModal.module.scss";
import { useState } from "react";
import initialBackground from "../../assets/icons/background.svg";
import { ReactComponent as Camera } from "../../assets/icons/camera_icon.svg";
import { ReactComponent as Cross } from "../../assets/icons/cross_white.svg";
import { ReactComponent as CrossOrange } from "../../assets/icons/cross_orange.svg";
import Swal from "sweetalert2";

function ProfileEditModal(props) {
  // 要帶入資料庫使用者的帳戶、名稱、自介、大頭貼和背景圖
  const { trigger, closeEvent, userIntro, userName, userAvatr, userBgAatar } =
    props;
  // 上傳資料儲存狀態
  const [background, setBackgroundUrl] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [name, setName] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [photoData, setPhotoData] = useState({ bgImage: "", avatar: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  // 字數錯誤參數
  const nameError = name.trim().length > 50 ? "error" : "";
  const introducitonError = introduction.trim().length > 160 ? "error" : "";
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
    // 如果內容是空白，傳回預設資料
    const submitEditData = {
      name: name ? name : userName,
      introduction: introduction ? introduction : userIntro,
      bgImage: photoData.bgImage ? photoData.bgImage : userBgAatar,
      avatar: photoData.avatar ? photoData.avatar : userAvatr,
    };

    // 超過字數上限表單不作事、跳出錯誤
    if (nameError === "error" || introducitonError === "error") {
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
        // 修改成功訊息
        await Swal.fire({
          position: "top",
          title: "修改成功！",
          timer: 2000,
          icon: "success",
          showConfirmButton: false,
        });
        setIsSubmitting(false);
        closeEditModal(); //api回傳成功關閉彈窗
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
  // 關掉視窗時自己的所有狀態要歸零(因為元件在同一位置)
  function closeEditModal() {
    setAvatarUrl("");
    setBackgroundUrl("");
    setName("");
    setIntroduction("");
    setPhotoData("");
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
          closeEditModal();
          closeEvent(false);
        }}
      ></div>
      <div className={styles["popup-main-window"]}>
        <div className={styles["popup-head"]}>
          <CrossOrange
            className={styles["btn-cross-orange"]}
            onClick={() => {
              closeEditModal();
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
              src={background ? background : initialBackground}
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
                src={avatarUrl ? avatarUrl : "https://picsum.photos/50/50"}
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
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className={styles["form-row-text"]}>
              {nameError ? (
                <div className={styles["text-error"]}>字數超過上限</div>
              ) : (
                <div></div>
              )}
              <div>{name.trim().length}/50</div>
            </div>

            <div
              className={`${styles["form-row"]} ${styles["form-row-intro"]} ${styles[introducitonError]}`}
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
              />
            </div>
            <div className={styles["form-row-text"]}>
              {introducitonError ? (
                <div className={styles["text-error"]}>字數超過上限</div>
              ) : (
                <div></div>
              )}
              {introduction.trim().length}/160
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
