import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useCSRFToken } from '../services/authentication';

const CSRFToken = () => {
  const [CSRFToken, setCSRFToken] = useState<string | undefined>(undefined);

  useCSRFToken();

  useEffect(() => {
    const cookie = Cookies.get('csrftoken');

    if (cookie) {
      setCSRFToken(cookie);
    }
  }, []);

  return <input type="hidden" name="csrfmiddlewaretoken" value={CSRFToken} />;
};

export default CSRFToken;
