import { useState } from 'react';
import Box from '../../../components/Box';
import Button from '../../../components/Button';
import InputFloat from '../../../components/InputFloat';
import InputPassword from '../../../components/InputPassword';
import LogoCircle from '../../../components/LogoCircle';
import Background from './Background';

// import { useDispatch } from 'react-redux';
// import { login } from '../../../store/slices/user/actions';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const dispatch = useDispatch();

  // const handleLogin = () => dispatch(login());
  const handleLogin = () => console.log('hi');

  return (
    <Background>
      <LogoCircle />

      <h1 className='mb-20 text-3xl'>Welcome to the Login Screen</h1>

      <Box className='min-w-md space-y-4'>
        <div>
          <label className='mb-2 inline-block font-bold'>Username</label>
          <InputFloat type='text' value={username} setValue={setUsername} />
        </div>

        <div>
          <label className='mb-2 inline-block font-bold'>Password</label>
          <InputPassword value={password} setValue={setPassword} />
        </div>

        <div className='flex w-full items-center justify-start'>
          <Button isPrimary label='Login' onClick={handleLogin} />
        </div>
      </Box>
    </Background>
  );
}
