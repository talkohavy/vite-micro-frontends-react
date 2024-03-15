export default function ErrorTitle({ error }) {
  return <pre className='no-scrollbar w-full overflow-x-auto text-xl font-bold text-[#ff5655]'>{error.message}</pre>;
}
