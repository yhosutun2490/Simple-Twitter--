import { createContext } from "react";
import { useState,useContext } from "react";
// 設定一開始context 預設值
const defaultValue = {
  userProfile: null,  //現在使用者資料
  setUserProfile: null, //更新使用者資料
}
const FollowBtnContext = createContext(defaultValue)
// useContext hook 讓子層可以調用
const useFollowBtn= () => useContext(FollowBtnContext)

function FollowBtnProvider(props) {
  // 追隨按鈕共用狀態
  const [userProfile, setUserProfile] = useState("")  // 使用者個人資料卡片
  const [selfFollowing,setSelfFollowing] = useState("") //追隨中頁面清單狀態
  const [selfFollower,setSelfFollower] = useState("")
  const [topFollower, setTopFollower] = useState("")


  return (
    <FollowBtnContext.Provider value={{
      userProfile: userProfile,
      setUserProfile: setUserProfile,
      selfFollower: selfFollower,
      setSelfFollower:setSelfFollower,
      selfFollowing:selfFollowing,
      setSelfFollowing: setSelfFollowing,
      topFollower:topFollower,
      setTopFollower: setTopFollower
    }}>
      {props.children}
    </FollowBtnContext.Provider>
  )
}

export {useFollowBtn,FollowBtnProvider}