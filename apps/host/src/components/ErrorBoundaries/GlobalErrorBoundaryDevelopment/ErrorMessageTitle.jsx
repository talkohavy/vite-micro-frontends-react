export default function ErrorMessageTitle({ errorMessage }) {
  return <pre className='no-scrollbar w-full overflow-x-auto text-xl font-bold text-[#ff5655]'>{errorMessage}</pre>;
}
