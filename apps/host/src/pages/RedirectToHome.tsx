import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '@src/common/constants';

export default function RedirectToHome() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(BASE_URL);
  }, [navigate]);

  return null;
}
