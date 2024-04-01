import {assoc} from 'ramda';
import {useCallback} from 'react';

const useHandlers = <T extends {}>(input: T): T => {
  return Object.keys(input).reduce((handlers: any, keyHandler: string) => {
    // @ts-ignore
    // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/rules-of-hooks
    return assoc(keyHandler, useCallback(input[keyHandler], []), handlers);
  }, {});
};

export {useHandlers};
