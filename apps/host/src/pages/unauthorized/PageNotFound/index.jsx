export default function PageNotFound() {
  return (
    <div className='mx-auto p-8 dark:text-white'>
      <div className='mx-auto flex flex-col items-start justify-start gap-8 rounded-xl border bg-black p-8'>
        <div className='flex w-90/100 flex-col items-center justify-center gap-8 self-center rounded-2xl bg-yellow-100 p-4'>
          <h1 className='self-center text-4xl font-bold text-red-500'>Error 404</h1>

          <h2 className='self-center text-xl font-bold text-red-500'>Page Not Found</h2>
        </div>

        <p className='font-bold'>Oops... this is embarrassing...</p>

        <p>
          It seems like you've requested a page that doesn't exist. If you're positive that the page had once existed,
          please contact our support team to seek help.
        </p>
      </div>
    </div>
  );
}
