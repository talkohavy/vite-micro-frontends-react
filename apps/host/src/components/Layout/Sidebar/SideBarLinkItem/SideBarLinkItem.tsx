import { Link } from 'react-router-dom';
import clsx from 'clsx';
import styles from './SideBarLinkItem.module.scss';

type SideBarLinkItemProps = {
  to: string;
  text: string;
  isActive: boolean;
};

export default function SideBarLinkItem(props: SideBarLinkItemProps) {
  const { to, text, isActive } = props;

  return (
    <Link to={to} className={clsx(styles.sideBarLinkItem, isActive && styles.isActive)}>
      {text}
    </Link>
  );
}
