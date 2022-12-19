import { useState, useEffect } from "react";
import { ReactComponent as AdminDeleteIcon } from "../../assets/icons/admin_delete_icon.svg";
import UserInfo from "../../Components/UserTweetBox/UserInfo";
import styles from "./AdminTweetPage.module.scss";
import { TimeFromNow } from "../../CostumHook/TransFormDate";
import { adminGetAllTweets } from "../../Api/AdminAPI";

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

  //Delete function
  //  const handleDelete = async (id) => {
  //   try {
  //     await deleteTodo(id);

  //     setTweetList((preTweetList) => {
  //       return preTweetList.filter((tweet) => tweet.id !== id);
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // };

  const handleDelete = (id) => {
    setTweetList((preTweetList) => {
      return preTweetList.filter((tweet) => tweet.id !== id);
    });
  };

  useEffect(() => {
    const getAllTweetsAsync = async () => {
      try {
        const data = await adminGetAllTweets();
        setTweetList(data);
        console.log(data)
      } catch (error) {
        console.log(error);
      }
    };
    getAllTweetsAsync();
  }, []);

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
