import { ReactComponent as AdminDeleteIcon } from "../../assets/icons/admin_delete_icon.svg"
import UserInfo from "../../Components/UserTweetBox/UserInfo";
import styles from "./AdminTweetPage.module.scss";
import { TimeFromNow } from "../../CostumHook/TransFormDate";

function AdminTweetBox(props) {
  //須從後端傳入的資料
  const { tweeterAccount, tweeterName, avatar, update, content } = props;
  //日期資料轉換
  const date = TimeFromNow(update);

  return (
    <div className={styles["tweet-box-container"]}>
      <div>
        <img src={avatar} className={styles["avatar-img"]} alt="user-avatar" />
      </div>
      <UserInfo account={tweeterAccount} userName={tweeterName} update={date} />
      <div>{content}</div>
      <div><AdminDeleteIcon /></div>
    </div>
  );
}

