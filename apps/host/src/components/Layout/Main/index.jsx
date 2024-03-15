export default function Main({ children }) {
  return (
    <main className='flex h-full flex-grow items-center justify-between overflow-auto bg-white dark:bg-[#383838]'>
      {children}
    </main>
  );
}
