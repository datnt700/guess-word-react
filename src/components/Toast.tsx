import styles from './Toast.module.scss';
import { forwardRef, useImperativeHandle, useState } from 'react';

// Forward the ref and define the component
const Toast = forwardRef<
  { showToast: (msg: string) => void },
  { timeout?: number; src: string }
>(({ timeout = 15000, src }, ref) => {
  const [show, setShow] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  // Use the ref to expose showToast to the parent component
  useImperativeHandle(ref, () => ({
    showToast(msg = '') {
      setShow(true);
      setToastMsg(msg);
      setTimeout(() => {
        setShow(false);
      }, timeout);
    },
  }));

  return (
    <div className={`${styles.container} ${show ? styles.show : ''}`}>
      <img className={styles.icon} src={src} alt="" />
      {toastMsg}
    </div>
  );
});

export default Toast;
