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

      <div className={styles["admin-delete-icon"]}>
        <AdminDeleteIcon />
      </div>
    </div>
  );
}

function AdminTweetPage() {
  // fake data 待後端api測試檔通過後再次查看response格式 [Get]api/admin/tweets
  // 是否該做分頁？設計稿上沒有指定
  const datas = [
    {
      id: 11,
      UserId: 2,
      description: "voluptatibus iure quidem",
      createdAt: "2020-09-20T16:41:19.000Z",
      updatedAt: "2022-05-01T01:06:44.000Z",
      userId: 2,
      User: {
        id: 2,
        account: "user1",
        name: "user1",
        avatar:
          "https://loremflickr.com/140/140/people/?random=70.97604245559303",
        cover:
          "https://loremflickr.com/639/200/image/?random=78.61165147050005",
      },
    },
    {
      id: 11,
      UserId: 2,
      description: "voluptatibus iure quidem",
      createdAt: "2020-09-20T16:41:19.000Z",
      updatedAt: "2022-05-01T01:06:44.000Z",
      userId: 2,
      User: {
        id: 2,
        account: "user1",
        name: "user1",
        avatar:
          "https://loremflickr.com/140/140/people/?random=70.97604245559303",
        cover:
          "https://loremflickr.com/639/200/image/?random=78.61165147050005",
      },
    },
    {
      id: 11,
      UserId: 2,
      description: "voluptatibus iure quidem",
      createdAt: "2020-09-20T16:41:19.000Z",
      updatedAt: "2022-05-01T01:06:44.000Z",
      userId: 2,
      User: {
        id: 2,
        account: "user1",
        name: "user1",
        avatar:
          "https://loremflickr.com/140/140/people/?random=70.97604245559303",
        cover:
          "https://loremflickr.com/639/200/image/?random=78.61165147050005",
      },
    },
  ];

  return (
    <div className={styles["container"]}>
      <div className={styles["title"]}>推文清單</div>
      <div className={styles["tweet-list"]}>
        {datas &&
          datas.map((data) => (
            <AdminTweetBox
              key={data.id}
              tweeterAccount={data.User.account}
              tweeterName={data.User.name}
              avatar={data.User.avatar}
              update={data.createdAt}
              content={data.description}
            />
          ))}
      </div>
    </div>
  );
}

export default AdminTweetPage;

