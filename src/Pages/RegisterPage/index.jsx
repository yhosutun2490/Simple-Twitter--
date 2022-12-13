function AuthInputAlert(prop) {
  const { alertMsg } = prop;
  return <div>{alertMsg}</div>;
}

function AuthInputWordCount(props) {
  const { wordLength, wordLengthLimit } = props;
  return (
    <div>
      {wordLength}/{wordLengthLimit}
    </div>
  );
}

function AuthInput(props) {
  const { label, type, placeholder } = props;
  return (
    <div>
      <label>{label}</label>
      <input type={type || "text"} placeholder={placeholder || ""} />
    </div>
  );
}
