# Alphitter 
Alphitter為一款簡易版社交平台，使用者可以註冊帳號在此平台上透過發布動態等與其他使用者互動。  
詳細功能請參閱「[主要功能](#主要功能)」。
  
  
**👉登入頁面（網站入口）**
![image](https://user-images.githubusercontent.com/71853581/209472837-f1e3da51-8ab1-49d7-a69f-f06118644001.png)

**👉註冊頁面（可註冊成為Alphitter的一員）**
![image](https://user-images.githubusercontent.com/71853581/209473021-df5aed9b-cc45-4d95-b172-aba15ae62ec9.png)

**👉登入後的平台首頁（可瀏覽發布在平台上的貼文）**
  
<img width="886" alt="首頁tweet" src="https://user-images.githubusercontent.com/71853581/209473004-1ae50fbb-820a-464e-9725-ce3bd055e98e.png">

**👉個人頁面（可瀏覽使用者的個人資料與相關動態）**
![image](https://user-images.githubusercontent.com/71853581/209473049-ad151eda-fd86-4968-bb94-02d793858a1e.png)


## 主要功能
【前台】
- 使用者可以註冊新帳號或是登入已註冊帳號進入首頁
- 使用者可以在首頁瀏覽發布在平台上的貼文
- 使用者可以發布推文
- 使用者可以喜歡／取消喜歡的推文
- 使用者可以回覆推文
- 使用者可以點擊推文瀏覽該推文的詳細內容與回文
- 使用者可以瀏覽右方「推薦跟隨」欄中跟隨者數量前10名的用戶
- 使用者可以點擊其他用戶的頭像或名稱瀏覽該用戶個人頁面
- 使用者可以追隨／取消跟隨其他用戶
- 使用者可以在自己的個人頁面瀏覽以及編輯自己的頭像、背景圖、名稱、與自我介紹，也可以在設定頁面更改帳號密碼等資料

【後台】
- 管理員可以瀏覽所有平台上的推文以及所有使用者資訊
- 管理員可以刪除推文

## 測試帳號

【前台預設帳號】
- 帳號: user1
- 密碼: 12345678  

【後台預設帳號】
- 帳號: root
- 密碼: 12345678

## 安裝流程

1. 開啟終端機(Terminal)，並確認已安裝 node.js 與 npm 
2. 在終端機輸入以下指令，將本專案 clone 到本機電腦

```
git clone https://github.com/yhosutun2490/Simple-Twitter-Natsu.git
```

3. 透過終端機進入存放此專案的資料夾後，輸入以下指令安裝 npm 套件

```
npm install
```

4. 安裝完畢後請輸入以下指令執行專案

```
npm start
```

6. 打開瀏覽器輸入以下網址即可開始使用本專案

```
http://localhost:3000/Simple-Twitter-Natsu/
```

7. 如欲退出專案可使用以下快捷鍵

```
ctrl + C
```

## 開發工具

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

- Node.js 14.18.1
- axios 0.27.2
- React Router 6.4.5
- SweetAlert2 11.6.4
- Moment.js 2.29.4

## 開發人員

- [Rafael](https://github.com/yhosutun2490)
- [Natsu](https://github.com/NatsuTW)
