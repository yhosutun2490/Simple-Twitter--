import styles from "./Button.module.scss";

function Button(props) {
  const { styleName, children } = props;
  return <button className={styles[styleName]}>{children}</button>;
}

export default Button;
