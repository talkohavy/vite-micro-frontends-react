import DarkModeToggle from '../../DarkModeToggle';

export default function Header() {
  return (
    <header className='z-20 flex h-12 w-full shrink-0 items-center justify-start bg-pink-300 shadow-sm dark:bg-gray-800 dark:shadow-dark-sm'>
      <DarkModeToggle size={20} />
    </header>
  );
}
