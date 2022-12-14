import styles from "./App.module.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayoutCommon from "./Components/LayoutCommon";
import HomePage from "./Pages/HomePage";
import TweetPage from "./Pages/TweetPage";
import { AuthProvider } from "./Context/AuthContext";
function App() {
  return (
    <div className={styles["App"]}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/">
              <Route index></Route>
              <Route path="login"></Route>
              <Route path="register"></Route>
              <Route path="setting"></Route>
              <Route path="home" element={<LayoutCommon />}>
                <Route index element={<HomePage />}></Route>
              </Route>
              <Route path="tweet/:id" element={<LayoutCommon />}>
                <Route index element={<TweetPage />}></Route>
              </Route>
              <Route path="/user/:username">
                <Route index></Route>
                <Route path="reply"></Route>
                <Route path="likes"></Route>
                <Route path="follower"></Route>
                <Route path="following"></Route>
              </Route>
              <Route path="admin">
                <Route index></Route>
                <Route path="tweet-list"></Route>
                <Route path="user-list"></Route>
              </Route>
            </Route>
            <Route path="*" />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
