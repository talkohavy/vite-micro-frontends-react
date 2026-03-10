import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../common/constants';
import RadioTabs from '../../components/controls/RadioTabs';
import { PAGE_2_BASE } from './logic/constants';
import { getInitialTabValue } from './logic/utils/getInitialTabValue';
import styles from './Page2.module.scss';

const Tabs = {
  Tab1: '',
  Tab2: 'tab-2',
} as const;

const tabOptions = [
  {
    value: Tabs.Tab1,
    label: 'Tab 1',
  },
  {
    value: Tabs.Tab2,
    label: 'Tab 2',
  },
];

export default function Page2() {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentTabValue, setCurrentTabValue] = useState(getInitialTabValue);

  useEffect(() => {
    const newTabValue = getInitialTabValue();
    setCurrentTabValue(newTabValue);
  }, [location.pathname]);

  function handleTabChange(tabValue: string) {
    setCurrentTabValue(tabValue);

    const targetPath = `${BASE_URL}/${PAGE_2_BASE}/${tabValue}`;
    navigate(targetPath);
  }

  return (
    <div className={styles.page2}>
      <RadioTabs value={currentTabValue} setValue={handleTabChange} options={tabOptions} className={styles.radioTabs} />

      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}
