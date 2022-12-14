import styles from "./AuthInput.module.scss";

function AuthInput(props) {
  const { label, type, value, placeholder, onChange, isAlert } = props;
  return (
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
  );
}

// Input related message
function AuthInputAlert(prop) {
  const { alertMsg } = prop;
  return <div className={styles["authinput-alertmsg"]}>{alertMsg}</div>;
}

function AuthInputWordCount(props) {
  const { wordLength, wordLengthLimit } = props;
  return (
    <div>
      {wordLength}/{wordLengthLimit}
    </div>
  );
}

export {
  AuthInput,
  AuthInputAlert,
  AuthInputWordCount,
};
