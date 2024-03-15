import Button from 'mf_remote/Button';

// const myButton = React.lazy(() => import('remote/myButton')) // <--- or use a dynamic import. The above is a static import.

export default function HomePage() {
  return (
    <div>
      <div>Main</div>
      <Button />
      <div>window</div>
    </div>
  );
}
