import App from '../components/App';
import { useFixPathnameWithAsterisk } from '../hooks/useFixPathnameWithAsterisk';
import WithExposed from './WithExposed';

function BooksMFToExpose() {
  useFixPathnameWithAsterisk();

  return <App />;
}

export default WithExposed(BooksMFToExpose);
