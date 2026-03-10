import { Link } from 'react-router-dom';

export default function Tab3() {
  return (
    <div>
      <div>Tab 3</div>
      <div style={{ marginBottom: 30 }}>I'm taking you to fruitsMF</div>

      <Link to='/base/fruits' className='text-blue-500 mt-4 border rounded p-2'>
        Go to fruitsMF
      </Link>
    </div>
  );
}
