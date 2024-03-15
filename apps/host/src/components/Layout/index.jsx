import Header from './Header';
import Main from './Main';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
  return (
    <div className='h-full'>
      <Header />

      <div className='flex h-full items-center justify-center'>
        <Sidebar />

        <Main>{children}</Main>
      </div>
    </div>
  );
}
