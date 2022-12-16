import styles from "./ProfileEditModal.module.scss";
import { useState } from "react";
import backgroundUrl from "../../assets/icons/background.svg";
import { ReactComponent as Camera } from "../../assets/icons/camera_icon.svg";
import { ReactComponent as Cross } from "../../assets/icons/cross_white.svg";
import { ReactComponent as CrossOrange } from "../../assets/icons/cross_orange.svg";

function ProfileEditModal(props) {
  const { trigger, closeEvent } = props;
  // 上傳資料儲存狀態
  const [background, setBackground] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [name, setName] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [photoData, setPhotoData] = useState({ bgImage: "", avatar: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  // 字數錯誤參數
  const nameError = name.trim().length > 50 ? "error" : "";
  const introducitonError = introduction.trim().length > 160 ? "error" : "";
  // handleFileChange 取出上傳圖片物件
  function hadleBgFileChange(e) {
    const { files } = e.target;
    if (files.length === 0) {
      // 使用者沒有選擇上傳的檔案
      return;
    }
    // 否則產生預覽圖
    const imageURL = window.URL.createObjectURL(files[0]);
    setBackground(imageURL);
    setPhotoData({ ...photoData, bgImage: files[0] });
  }
  function hadleAvatarFileChange(e) {
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
  // 表單資料提交
  function handleSubmit() {
    console.log(photoData);
    console.log(name);
    console.log(introduction);
    const api = async () => {
      await setTimeout(() => {
        alert("Delayed for 2 second.");
      }, 2000);
    };
    setIsSubmitting(true);
    api();
    setIsSubmitting(false);
  }
  // 如果trigger是 True 打開元件
  return trigger ? (
    <>
      <div
        className={styles["popup-backdrop"]}
        onClick={() => {
          closeEvent(false);
          setName("");
          setIntroduction("");
        }}
      ></div>
      <div className={styles["popup-main-window"]}>
        <div className={styles["popup-head"]}>
          <CrossOrange
            className={styles["btn-cancel"]}
            onClick={() => {
              closeEvent(false);
              setName("");
              setIntroduction("");
            }}
          />
          <p className={styles["popup-title"]}>編輯個人資料</p>
          <button
            className={styles["btn-save"]}
            type="submit"
            onClick={handleSubmit}
            disabled={true}
          >
            儲存
          </button>
        </div>
        <div className={styles["popup-body"]}>
          <div className={styles["user-bg"]}>
            <img
              src={background ? background : backgroundUrl}
              alt="bg-img"
              className={styles["bg-image"]}
            />
            <label htmlFor="user-bg" className={styles["user-bg-label-camera"]}>
              <Camera />
            </label>
            <label className={styles["user-bg-label-cross"]}>
              <Cross onClick={() => setBackground("")} />
            </label>
            <input
              type="file"
              className={styles["user-bg-input"]}
              id="user-bg"
              onChange={(e) => {
                hadleBgFileChange(e);
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
                hadleAvatarFileChange(e);
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
                <div className={styles["text-error"]}>名稱字數超過上限</div>
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
                <div className={styles["text-error"]}>自介字數超過上限</div>
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
