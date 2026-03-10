import App from '../components/App';
import WithExposed from './WithExposed';

function BooksMFToExpose() {
  return <App />;
}

export default WithExposed(BooksMFToExpose);
