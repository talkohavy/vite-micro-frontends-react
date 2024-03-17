import { useState } from 'react';
import EyeIcon from '../../utils/svgs/EyeIcon';
import LockIcon from '../../utils/svgs/LockIcon';
import InputFloat from '../InputFloat';

const defaultDontChangeRule = (_e, newValue) => ({ change: true, newValue });

function EyeRender({ handleMouseDown, handleMouseUp, isPasswordVisible }) {
  return (
    <div className='absolute right-3 top-0 flex h-full items-center justify-center rounded-e'>
      <button type='button' onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} className='group/button'>
        <EyeIcon
          size={18}
          isPasswordHidden={!isPasswordVisible}
          className='fill-neutral-700 stroke-neutral-700 group-hover/button:fill-black group-hover/button:stroke-black'
        />
      </button>
    </div>
  );
}

/** @param { import('../types').InputPasswordProps } props */
export default function InputPassword(props) {
  const updatedProps = { dontChangeRule: defaultDontChangeRule, ...props };

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <InputFloat
      type={isPasswordVisible ? 'text' : 'password'}
      isAlwaysFloating
      inputStyle={{ direction: 'ltr' }}
      {...updatedProps}
      rendererLeft={() => <LockIcon className='absolute left-0 top-1/2 mx-3 size-5 -translate-y-1/2' />}
      rendererRight={() => (
        <EyeRender
          isPasswordVisible={isPasswordVisible}
          handleMouseDown={() => setIsPasswordVisible(true)}
          handleMouseUp={() => setIsPasswordVisible(false)}
        />
      )}
    />
  );
}
