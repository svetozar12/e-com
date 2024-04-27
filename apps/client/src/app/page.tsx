import styles from './page.module.css';

export default function Index(props) {
  console.log(props);
  return <div className={styles.page}>hello</div>;
}
