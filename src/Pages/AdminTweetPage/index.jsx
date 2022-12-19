import { useState, useEffect } from "react";
import { ReactComponent as AdminDeleteIcon } from "../../assets/icons/admin_delete_icon.svg";
import UserInfo from "../../Components/UserTweetBox/UserInfo";
import styles from "./AdminTweetPage.module.scss";
import { TimeFromNow } from "../../CostumHook/TransFormDate";
import { adminDeleteTweet, adminGetAllTweets } from "../../Api/AdminAPI";
import Swal from "sweetalert2";

function AdminTweetBox(props) {
  //須從後端傳入的資料
  const {
    tweet,
    tweeterAccount,
    tweeterName,
    avatar,
    update,
    content,
    onDelete,
  } = props;
  //日期資料轉換
  const date = TimeFromNow(update);

  return (
    <div className={styles["tweet-box-container"]}>
      <div className={styles["avatar-img-container"]}>
        <img src={avatar} className={styles["avatar-img"]} alt="user-avatar" />
      </div>
      <div className={styles["tweet-detail"]}>
        <UserInfo
          account={tweeterAccount}
          userName={tweeterName}
          update={date}
        />
        <div className={styles["tweet-content"]}>{content}</div>
      </div>

      <div
        className={styles["admin-delete-icon"]}
        onClick={() => onDelete?.(tweet.id)}
      >
        <AdminDeleteIcon />
      </div>
    </div>
  );
}

function AdminTweetPage() {
  const [tweetList, setTweetList] = useState([]);
  const [deleteTrigger, setDeleteTrigger] = useState(false); //delete function是否被觸發

  const getAllTweetsAsync = async () => {
    try {
      const data = await adminGetAllTweets();
      setTweetList(data);
      setDeleteTrigger(false);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await adminDeleteTweet(id);
      setDeleteTrigger(true);
      Swal.fire({
        title: "刪除成功",
        icon: "success",
        showConfirmButton: false,
        timer: 1000,
        position: "top",
      }); 
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllTweetsAsync();
  }, []);

  //如果delete function被觸發，再次向後端重新請求tweet list
  if(deleteTrigger) {
    getAllTweetsAsync()
  }

  return (
    <div className={styles["container"]}>
      <div className={styles["title"]}>推文清單</div>
      <div className={styles["tweet-list"]}>
        {tweetList.map((tweet) => (
          <AdminTweetBox
            key={tweet.id}
            tweet={tweet}
            tweeterAccount={tweet.User.account}
            tweeterName={tweet.User.name}
            avatar={tweet.User.avatar}
            update={tweet.createdAt}
            content={tweet.description}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default AdminTweetPage;
