import App from '../components/App';

type ExposedFruitsMFProps = {
  className?: string;
};

export default function ExposedFruitsMF(props: ExposedFruitsMFProps) {
  return <App {...props} />;
}
