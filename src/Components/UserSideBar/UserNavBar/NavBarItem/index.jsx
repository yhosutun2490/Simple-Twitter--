import styles from "./NavBarItem.module.scss";
function NavBarItem(props) {
  return <div className={styles["container"]}>{props.children}</div>;
}

export default NavBarItem;
