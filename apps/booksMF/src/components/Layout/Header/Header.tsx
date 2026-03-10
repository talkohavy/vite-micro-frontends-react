import LinkList from '../LinkList';

export default function Header() {
  return (
    <header className=' flex h-15 gap-4 px-3 w-full items-center justify-start bg-pink-200 shadow-sm dark:bg-gray-950 dark:shadow-dark-sm'>
      <LinkList />
    </header>
  );
}
