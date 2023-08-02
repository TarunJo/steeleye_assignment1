import styles from "./ListRowCell.module.css";

const ListRowCell = ({ children,  setKey }) => {
  return <td className={styles.cell} id={setKey}>{children}</td>;
};

export default ListRowCell;
