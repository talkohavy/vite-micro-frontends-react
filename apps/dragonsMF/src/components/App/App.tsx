import Button from '../Button';

type AppProps = {
  className?: string;
};

export default function App(props: AppProps) {
  const { className } = props;

  return (
    <div className={className}>
      <div className='p-4 border rounded-md text-2xl'>I am a Dragon</div>

      <Button />
    </div>
  );
}
