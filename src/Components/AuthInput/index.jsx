import styles from "./AuthInput.module.scss";

function AuthInput(props) {
  const {
    label,
    type,
    value,
    placeholder,
    onChange,
    isAlert,
    alertMsg,
    isWordCount,
    wordLength,
    wordLengthLimit,
  } = props;
  return (
    <div className={["authinput-container"]}>
      <div
        className={[
          `${styles["authinput-box"]}`,
          isAlert ? `${styles["error"]}` : ``,
        ].join(" ")}
      >
        <label className={styles["authinput-label"]}>{label}</label>
        <input
          className={styles["authinput"]}
          type={type || "text"}
          value={value || ""}
          placeholder={placeholder || ""}
          onChange={(e) => onChange?.(e.target.value)}
        />
      </div>
      <div className={styles["authinput-msg-box"]}>
        <div className={styles["authinput-alertmsg"]}>{alertMsg}</div>
        {isWordCount ? (
          <div>
            {wordLength}/{wordLengthLimit}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default AuthInput;
