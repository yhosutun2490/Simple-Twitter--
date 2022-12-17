import styles from "./AdminUserPage.module.scss"
import { ReactComponent as TweetFeather } from "../../assets/icons/tweet_feather_icon.svg";
import { ReactComponent as LikeIcon } from "../../assets/icons/like_icon.svg";


function AdminUserCard(props) {
  //須從後端取得的資料
  const { coverImg, avatar, account, userName, tweetNum, likedNum, followingNum, followerNum } = props;

  return (
    <div className={styles["tweet-box-container"]}>
      <div className={styles["cover-img-container"]}>
        <img src={coverImg} className={styles["cover-img"]} alt="user-cover" />
      </div>
      <div className={styles["avatar-img-container"]}>
        <img src={avatar} className={styles["avatar-img"]} alt="user-avatar" />
      </div>
      <div className={styles["user-info"]}>
        <p className={styles["user-info-name"]}>{userName}</p>
        <p className={styles["user-info-account"]}>@{account}</p>
      </div>
      <div className={styles["user-social-info"]}>
        <div>
          <TweetFeather />
          <p>{tweetNum}</p>
        </div>
        <div>
          <LikeIcon />
          <p>{likedNum}</p>
        </div>
      </div>
      <div className={styles["user-follow-info"]}>
        <p>{followingNum}跟隨中</p>
        <p>{followerNum}跟隨者</p>
      </div>
    </div>
  );
}

function AdminUserPage() {
  // fake data 待後端api測試檔通過後再次查看response格式 [Get]api/admin/users
  // 是否該做分頁待討論，設計稿上沒有指定
  const fakeUserList = [
    {
      id: 1,
      account: "Rafael",
      email: "Javon_Gutmann@gmail.com",
      name: "Rafael Captain",
      avatar:
        "https://loremflickr.com/140/140/people/?random=27.075767759341794",
      introduction:
        "Vitae quasi fuga odio ut accusamus qui.\nQui consequatur soluta consequatur.\nEum dolor quia sed corporis assumenda veniam dicta veniam.",
      cover: "https://loremflickr.com/639/200/image?random=20.808405107494043",
      role: "0",
      createdAt: "2020-11-27T00:01:30.000Z",
      updatedAt: "2022-01-16T02:32:34.000Z",
      tweetsCount: 1,
      likeCount: 798,
      followerCount: 100,
      followingCount: 1,
    },
    {
      id: 2,
      account: "Ann",
      email: "Javon_Gutmann@gmail.com",
      name: "Ann Kawasaki",
      avatar:
        "https://loremflickr.com/140/140/people/?random=27.075767759341794",
      introduction:
        "Vitae quasi fuga odio ut accusamus qui.\nQui consequatur soluta consequatur.\nEum dolor quia sed corporis assumenda veniam dicta veniam.",
      cover: "https://loremflickr.com/639/200/image?random=20.808405107494043",
      role: "0",
      createdAt: "2020-11-27T00:01:30.000Z",
      updatedAt: "2022-01-16T02:32:34.000Z",
      tweetsCount: 56,
      likeCount: 23,
      followerCount: 120,
      followingCount: 56,
    },
    {
      id: 3,
      account: "Gina",
      email: "Javon_Gutmann@gmail.com",
      name: "Gina Koboyashi",
      avatar:
        "https://loremflickr.com/140/140/people/?random=27.075767759341794",
      introduction:
        "Vitae quasi fuga odio ut accusamus qui.\nQui consequatur soluta consequatur.\nEum dolor quia sed corporis assumenda veniam dicta veniam.",
      cover: "https://loremflickr.com/639/200/image?random=20.808405107494043",
      role: "0",
      createdAt: "2020-11-27T00:01:30.000Z",
      updatedAt: "2022-01-16T02:32:34.000Z",
      tweetsCount: 0,
      likeCount: 0,
      followerCount: 3,
      followingCount: 112,
    },
  ];

  return (
    <div className={styles["container"]}>
      <div className={styles["title"]}>使用者列表</div>
      <div className={styles["user-list"]}>
        {fakeUserList.map((user) => (
          <AdminUserCard
            key={user.id}
            user={user}
            coverImg={user.cover}
            avatar={user.avatar}
            account={user.account}
            userName={user.name}
            tweetNum={user.tweetsCount}
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