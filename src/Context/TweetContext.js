import { createContext } from "react";
import { useState,useContext } from "react";
// 設定一開始context 預設值
const defaultValue = {
  currentTweetList: null,  //現在使用者資料
  setCurrentTweetList: null, //更新使用者資料
}
const TweetListContext = createContext(defaultValue)
// useContext hook 讓子層可以調用
const useTweetList = () => useContext(TweetListContext)

function TweetListProvider(props) {
  // 先放一個狀態，主要是(HOME page)左邊推文視窗和右邊主頁推文列表需要共用的狀態
  const [allTweetSData, setAllTweetSData] = useState("")
  // 個人推文資料傳遞用
  const [selfTweetList, setSelfTweetList] = useState("");
  // 個人回覆推文
  const [selfReplyData, setSelfReplyData] = useState("");
  // 個人喜歡的貼文 
  const [selfLikeData, setSelfLikeData] = useState(""); 

  return (
    <TweetListContext.Provider value={{
      allTweetList: allTweetSData,
      setAllTweetList: setAllTweetSData,
      selfTweetList: selfTweetList,
      setSelfTweetList: setSelfTweetList,
      selfReplyData: selfReplyData,
      setSelfReplyData: setSelfReplyData,
      selfLikeData:selfLikeData,
      setSelfLikeData:setSelfLikeData
    }}>
      {props.children}
    </TweetListContext.Provider>
  )
}

export {useTweetList,TweetListProvider}