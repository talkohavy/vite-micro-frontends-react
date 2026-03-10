import { ComponentType, StrictMode, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import SuspenseUntilReady from '@src/components/SuspenseUntilReady';
import '../../index.css';

export type UserDetails = {
  lastName: string;
  firstName: string;
  email: string;
  userId: string;
  phone?: string;
};

export type ExposeProps = {
  Loader?: ComponentType;
};

const WithExposed = <TProps,>(Component: ComponentType<TProps>) =>
  function Exposed(props: TProps & ExposeProps) {
    const { Loader } = props;

    return (
      <StrictMode>
        <Suspense fallback={Loader ? <Loader /> : null}>
          <SuspenseUntilReady
            asyncFn={async () => {
              console.log('App is running!');
            }}
          >
            <BrowserRouter>
              <Component {...(props as typeof props)} />
            </BrowserRouter>
          </SuspenseUntilReady>
        </Suspense>
      </StrictMode>
    );
  };

export default WithExposed;
