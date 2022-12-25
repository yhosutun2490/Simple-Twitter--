import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AdminUserPage.module.scss";
import { ReactComponent as TweetFeather } from "../../assets/icons/tweet_feather_icon.svg";
import { ReactComponent as LikeIcon } from "../../assets/icons/like_icon.svg";
import { adminGetAllUsers } from "../../Api/AdminAPI";
import { useAuth } from "../../Context/AuthContext";
import { ToastFail } from "../../assets/sweetalert"; //引入Toast樣式

function AdminUserCard(props) {
  const {
    coverImg,
    avatar,
    account,
    userName,
    tweetNum,
    likedNum,
    followingNum,
    followerNum,
  } = props;

  return (
    <div className={styles["user-card-container"]}>
      <div className={styles["cover-img-container"]}>
        <img src={coverImg} className={styles["cover-img"]} alt="user-cover" />
      </div>
      <div className={styles["avatar-img-container"]}>
        <img src={avatar} className={styles["avatar-img"]} alt="user-avatar" />
      </div>
      <div className={styles["user-info"]}>
        <p className={styles["user-info-name"]}>
          {userName.length > 18 ? userName.slice(0, 18) + "..." : userName}
        </p>
        <p className={styles["user-info-account"]}>
          @{account.length > 18 ? account.slice(0, 18) + "..." : account}
        </p>
      </div>
      <div className={styles["user-tweet-data"]}>
        <div className={styles["user-tweet-num"]}>
          <TweetFeather className={styles["tweet-feather"]} />
          <p>{tweetNum}</p>
        </div>
        <div className={styles["user-tweet-liked-num"]}>
          <LikeIcon className={styles["like-icon"]} />
          <p>{likedNum}</p>
        </div>
      </div>
      <div className={styles["user-follow-info"]}>
        <p>
          {followingNum} 個<span>跟隨中</span>
        </p>
        <p>
          {followerNum} 位<span>跟隨者</span>
        </p>
      </div>
    </div>
  );
}

function AdminUserPage() {
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();

  //if user is not authenticated, navigate to admin login page
  useEffect(() => {
    if (!isAuthenticated) {
      ToastFail.fire({
        title: "帳號不存在！",
      });
      navigate("/admin");
      return;
    }
  }, [navigate, isAuthenticated]);

  useEffect(() => {
    const getAllUsersAsync = async () => {
      try {
        const res = await adminGetAllUsers();
        setUserList(res.filter((data) => data.role !== "admin"));
      } catch (error) {
        console.log(error);
      }
    };
    getAllUsersAsync();
  }, []);

  return (
    <div className={styles["container"]}>
      <div className={styles["title"]}>使用者列表</div>
      <div className={styles["user-list"]}>
        {userList.map((user) => (
          <AdminUserCard
            key={user.id}
            user={user}
            coverImg={user.cover}
            avatar={user.avatar}
            account={user.account}
            userName={user.name}
            tweetNum={user.tweetCount}
            likedNum={user.likeCount}
            followingNum={user.followingCount}
            followerNum={user.followerCount}
          />
        ))}
      </div>
    </div>
  );
}

export default AdminUserPage;
