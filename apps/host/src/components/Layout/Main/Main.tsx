import { PropsWithChildren } from 'react';

type MainProps = PropsWithChildren;

export default function Main(props: MainProps) {
  const { children } = props;

  return (
    <main className='flex h-full flex-grow items-center justify-between overflow-auto bg-white dark:bg-[#383838]'>
      {children}
    </main>
  );
}
