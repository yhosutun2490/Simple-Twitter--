import styles from "./TweetSubmitButton.module.scss";
import Button from "../../Button";
function TweetSubmitButton() {
  return (
    <div className={styles["container"]}>
      <Button styleName={"bg-logo"}>推文</Button>
    </div>
  );
}

export default TweetSubmitButton;
