import {useRef} from 'react';

export const useDataToRef = <T extends {}>(data: T) => {
  const ref = useRef(data);
  ref.current = data;

  return ref;
};
