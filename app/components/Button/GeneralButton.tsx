import styles from "./GeneralButton.module.scss";

export default function GeneralButton() {
  return (
    <button type="submit" className={styles.button}>
      Generate
    </button>
  );
}
