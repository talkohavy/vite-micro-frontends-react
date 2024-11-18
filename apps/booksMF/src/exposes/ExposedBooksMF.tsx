import App from '../components/App';

type ExposedBooksMFProps = {
  className?: string;
};

export default function ExposedBooksMF(props: ExposedBooksMFProps) {
  return <App {...props} />;
}
