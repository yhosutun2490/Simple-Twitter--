import styles from "./App.module.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayoutCommon from "./Components/LayoutCommon";
import LayoutAdmin from "./Components/LayoutAdmin";
import { AuthProvider } from "./Context/AuthContext"; //引入驗證用AuthProvider
import { TweetListProvider } from "./Context/TweetContext"; // 引入推文頁面(layout)共享狀態provider
import { FollowBtnProvider } from "./Context/ProfileContext"; //引入追隨按鈕共用狀態
import HomePage from "./Pages/HomePage";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import TweetPage from "./Pages/TweetPage";
import ProfilePage from "./Pages/ProfilePage";
import ProfileReplyPage from "./Pages/ProfileReplyPage";
import ProfileLikePage from "./Pages/ProfileLikePage";
import FollowerListPage from "./Pages/FollowerListPage";
import FolloweringListPage from "./Pages/FolloweringListPage";
import EnterPage from "./Pages/EnterPage";
import NotFoundPage from "./Pages/NotFoundPage";
import AdminLoginPage from "./Pages/AdminLoginPage";
import SettingPage from "./Pages/SettingPage";
import AdminTweetPage from "./Pages/AdminTweetPage";
import AdminUserPage from "./Pages/AdminUserPage";

const basename = process.env.PUBLIC_URL;
function App() {
  return (
    <div className={styles["App"]}>
      <BrowserRouter basename={basename}>
        <AuthProvider>
          <TweetListProvider>
            <FollowBtnProvider>
              <Routes>
                <Route path="/">
                  <Route index element={<EnterPage />}></Route>
                  <Route path="*" element={<NotFoundPage />} />
                  <Route path="login" element={<LoginPage />}></Route>
                  <Route path="register" element={<RegisterPage />}></Route>
                  <Route path="setting" element={<SettingPage />}></Route>
                  <Route path="home" element={<LayoutCommon />}>
                    <Route index element={<HomePage />}></Route>
                  </Route>
                  <Route path="tweet/:id" element={<LayoutCommon />}>
                    <Route index element={<TweetPage />}></Route>
                  </Route>
                  <Route path="/user/:username" element={<LayoutCommon />}>
                    <Route index element={<ProfilePage />}></Route>
                    <Route path="reply" element={<ProfileReplyPage />}></Route>
                    <Route path="likes" element={<ProfileLikePage />}></Route>
                    <Route
                      path="follower"
                      element={<FollowerListPage />}
                    ></Route>
                    <Route
                      path="following"
                      element={<FolloweringListPage />}
                    ></Route>
                  </Route>
                  <Route path="admin" element={<AdminLoginPage />}></Route>
                  <Route path="admin/tweetlist" element={<LayoutAdmin />}>
                    <Route index element={<AdminTweetPage />}></Route>
                  </Route>
                  <Route path="admin/userlist" element={<LayoutAdmin />}>
                    <Route index element={<AdminUserPage />}></Route>
                  </Route>
                </Route>
              </Routes>
            </FollowBtnProvider>
          </TweetListProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
