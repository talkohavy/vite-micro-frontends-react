import SideBarLinkList from './SideBarLinkList';

export default function Sidebar() {
  return (
    <div className='h-full w-80 shrink-0 bg-amber-100 shadow-md dark:bg-slate-500'>
      <SideBarLinkList />
    </div>
  );
}
