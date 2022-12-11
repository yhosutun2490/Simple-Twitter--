import styles from "./Button.module.scss";

function Button(props) {
  const { className, children } = props;
  return <button className={className}>{children}</button>;
}

export default Button;
