import { useContext, useEffect, useState } from 'react';
import AppContext from '../AppContext';
import { profileUrl } from '../constants/endpoints';

export default function useProfile(file) {
  const { language } = useContext(AppContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    let active = true;

    fetch(profileUrl(language.value, file))
      .then((res) => res.json())
      .then((res) => {
        if (active) setData(res);
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, [file, language.value]);

  return data;
}
