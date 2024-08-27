import styles from './Information.module.scss';
export const Information = ({
  count,
  mistakes,
}: {
  count: number;
  mistakes: string;
}) => {
  return (
    <div className={styles.info}>
      <div className={`${styles['info-item']} ${styles.steps}`}>
        <h4 className={styles.counter}>Tries ({count}/5):</h4>
        <span
          className={
            count >= 1 ? `${styles.circle} ${styles.active}` : styles.circle
          }
        ></span>
        <span
          className={
            count >= 2 ? `${styles.circle} ${styles.active}` : styles.circle
          }
        ></span>
        <span
          className={
            count >= 3 ? `${styles.circle} ${styles.active}` : styles.circle
          }
        ></span>
        <span
          className={
            count >= 4 ? `${styles.circle} ${styles.active}` : styles.circle
          }
        ></span>
        <span
          className={
            count >= 5 ? `${styles.circle} ${styles.active}` : styles.circle
          }
        ></span>
      </div>
      <div className={`${styles['info-item']} ${styles.mistakes}`}>
        <h4>Mistakes: {mistakes}</h4>
        <span></span>
      </div>
    </div>
  );
};
