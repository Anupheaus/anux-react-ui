import { CustomTag, useBound } from 'anux-react-utils';
import { useContext, useMemo, useRef } from 'react';
import { anuxUIFunctionComponent } from '../utils';
import { TooltipsContext, ITooltipsContext } from './context';
import { CurrentHost } from './private.models';
import styles from './styles';

interface IProps {
  id?: string;
  delay?: number;
  animationDuration?: number;
}

export const Tooltips = anuxUIFunctionComponent<IProps>('Tooltips', ({
  id,
  delay = 500,
  animationDuration = 300,
  children,
}, ref) => {
  const hostId = useMemo(() => id || Math.uniqueId(), [id]);
  const hostElement = useRef<HTMLElement>();
  const currentContexts = useContext(TooltipsContext);

  const handleRef = useBound((instance: HTMLElement) => {
    if (ref) { ref(instance); }
    hostElement.current = instance;
  });

  const context = useMemo<ITooltipsContext>(() => ({
    ...currentContexts,
    [hostId]: {
      hostElementRef: hostElement,
      delay,
      animationDuration,
    },
    ...({
      [CurrentHost]: hostId,
    }),
  }), [currentContexts, delay, animationDuration]);

  return (
    <>
      <TooltipsContext.Provider value={context}>
        {children}
      </TooltipsContext.Provider>
      <CustomTag name="ui-tooltips" ref={handleRef} className={styles.root} />
    </>
  );

});
