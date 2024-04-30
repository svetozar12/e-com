import styles from './page.module.css';

export default function Index() {
  console.log(typeof window, 'HELLO');
  return <div className={styles.page}>hello</div>;
}
