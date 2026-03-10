import { Link } from 'react-router-dom';
import clsx from 'clsx';

type LinkListItemProps = {
  to: string;
  text: string;
  isActive?: boolean;
};

export default function LinkListItem(props: LinkListItemProps) {
  const { to, text, isActive } = props;

  return (
    <Link
      to={to}
      className={clsx('text-lg dark:text-white! hover:text-red-500 active:text-red-400', isActive && 'font-medium')}
    >
      {text}
    </Link>
  );
}
