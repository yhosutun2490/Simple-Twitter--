import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as AdminDeleteIcon } from "../../assets/icons/admin_delete_icon.svg";
import UserInfo from "../../Components/UserTweetBox/UserInfo";
import styles from "./AdminTweetPage.module.scss";
import { TimeFromNow } from "../../CostumHook/TransFormDate";
import { adminDeleteTweet, adminGetAllTweets } from "../../Api/AdminAPI";
import { useAuth } from "../../Context/AuthContext";
import { ToastSuccess, ToastFail } from "../../assets/sweetalert"; //引入Toast樣式

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
        {/* 超過50字的部分以"..."代替 */}
        <div className={styles["tweet-content"]}>
          {content.length > 50 ? content.slice(0, 50) + "..." : content}
        </div>
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
  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();

  const getAllTweetsAsync = async () => {
    try {
      const data = await adminGetAllTweets();
      setTweetList(data);
      setDeleteTrigger(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await adminDeleteTweet(id);
      setDeleteTrigger(true);
      ToastSuccess.fire({
        title: "刪除成功",
      });
    } catch (error) {
      console.error(error);
      ToastFail.fire({
        title: "刪除失敗...",
      });
    }
  };

  //if user is not authenticated, navigate to login page
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin");
    }
  }, [navigate, isAuthenticated]);

  useEffect(() => {
    getAllTweetsAsync();
  }, []);

  //如果delete function被觸發，再次向後端重新請求tweet list
  if (deleteTrigger) {
    getAllTweetsAsync();
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
