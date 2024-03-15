export default function ErrorTitle({ error }) {
  return <pre className='text-xl font-bold text-[#ff5655]'>{error.message}</pre>;
}
