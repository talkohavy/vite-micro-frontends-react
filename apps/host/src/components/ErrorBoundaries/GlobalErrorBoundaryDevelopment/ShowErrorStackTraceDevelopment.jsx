import Modal from '../../Modal';
import ErrorStackTrace from './ErrorStackTrace';
import ErrorTitle from './ErrorTitle';
import LineSeparator from './LineSeparator';
import TopRedRibbon from './TopRedRibbon';

export default function ShowErrorStackTraceDevelopment({ error }) {
  return (
    <Modal id='error-modal' className='bg-[#030303] bg-opacity-100 p-6'>
      <div
        className='relative top-1/2 flex h-auto w-full max-w-5xl -translate-y-1/2 animate-appear flex-col items-start justify-between gap-6 overflow-x-hidden rounded-xl bg-[#181818] p-10 text-center'
        style={{ direction: 'ltr' }}
      >
        <TopRedRibbon />

        <ErrorTitle error={error} />

        <LineSeparator />

        <ErrorStackTrace stackTrace={error.stack} />
      </div>
    </Modal>
  );
}
