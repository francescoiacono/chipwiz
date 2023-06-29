import Link from 'next/link';
import styles from './callToAction.module.css';
interface CallToActionProps {
  children: React.ReactNode;
  href: string;
}

const CallToAction = ({ children, href }: CallToActionProps) => {
  return (
    <Link href={href} className={styles.callToAction}>
      {children}
    </Link>
  );
};

export default CallToAction;
