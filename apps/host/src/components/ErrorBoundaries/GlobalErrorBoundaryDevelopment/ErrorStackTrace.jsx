export default function ErrorStackTrace({ stackTrace }) {
  return (
    <pre className='w-full overflow-auto text-start font-thin text-neutral-200' style={{ lineHeight: 2 }}>
      {stackTrace}
    </pre>
  );
}
