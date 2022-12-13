import { ReactComponent as AcLogo } from "../../assets/icons/AcLogo.svg";
import Button from "../../Components/Button";

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

function RegisterPage() {
  return (
    <div>
      <div>
        <AcLogo />
      </div>
      <h3>建立你的帳號</h3>
      {/* AuthInput group */}
      <div>
        <div>
          <AuthInput label="帳號" type="text" placeholder="請輸入帳號" />
          <div>
            <AuthInputAlert alertMsg="字數超出上限！" />
            <AuthInputWordCount wordLength={10} wordLengthLimit={50} />
          </div>
        </div>

        <div>
          <AuthInput label="名稱" type="text" placeholder="請輸入使用者名稱" />
          <div>
            <AuthInputAlert alertMsg="字數超出上限！" />
            <AuthInputWordCount wordLength={10} wordLengthLimit={50} />
          </div>
        </div>

        <div>
          <AuthInput label="Email" type="text" placeholder="請輸入Email" />
          <div>
            <AuthInputAlert alertMsg="Email格式錯誤" />
          </div>
        </div>

        <div>
          <AuthInput label="密碼" type="text" placeholder="請設定密碼" />
          <div>
            <AuthInputAlert alertMsg="密碼長度不夠！" />
          </div>
        </div>

        <div>
          <AuthInput
            label="密碼確認"
            type="text"
            placeholder="請再次輸入密碼"
          />
          <div>
            <AuthInputAlert alertMsg="密碼不正確" />
          </div>
        </div>
      </div>
      {/* Submit Button */}
      <div>
        <Button styleName="lg-bg-logo">註冊</Button>
      </div>
      <div>取消</div>
    </div>
  );
}

export default RegisterPage;
