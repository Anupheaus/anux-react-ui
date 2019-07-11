import { useContext, ReactInstance, ReactElement, useMemo, cloneElement, useRef, ReactNode, useState } from 'react';
import { CustomTag, useOnUnmount } from 'anux-react-utils';
import { findDOMNode } from 'react-dom';
import { Fade, Popper } from '@material-ui/core';
import { anuxUIFunctionComponent } from '../utils';
import { classNames } from '../styles';
import { CurrentHost } from './private.models';
import { TooltipsContext } from './context';
import styles from './styles';

const visibleEvents = ['mouseover', 'mouseenter'];
const invisibleEvents = ['mouseout', 'mouseleave'];

interface IProps {
  hostId?: string;
  className?: string;
  content: ReactNode;
  children: ReactElement;
}

export const Tooltip = anuxUIFunctionComponent<IProps>('Tooltip', ({
  hostId,
  className,
  content,
  children,
}) => {
  const contexts = useContext(TooltipsContext);
  const targetRef = useRef<HTMLElement>();
  const [isVisible, setVisible] = useState(false);
  const timeoutRef = useRef(undefined);

  hostId = hostId || (contexts[CurrentHost as unknown as string] as unknown as string);
  const { hostElementRef, delay, animationDuration } = contexts[hostId];
  if (!hostElementRef) {
    throw new Error('Unable to retrieve a host for this tooltip from the context, please ensure that there is a Toolips component higher than this component.');
  }

  const showTooltip = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      clearTimeout(timeoutRef.current);
      setVisible(true)
    }, delay);
  };

  const hideTooltip = () => {
    clearTimeout(timeoutRef.current);
    setVisible(false);
  };

  const hookEvents = () => {
    visibleEvents.forEach(event => targetRef.current.addEventListener(event, showTooltip));
    invisibleEvents.forEach(event => targetRef.current.addEventListener(event, hideTooltip));
  };

  const unhookEvents = () => {
    visibleEvents.forEach(event => targetRef.current.removeEventListener(event, showTooltip));
    invisibleEvents.forEach(event => targetRef.current.removeEventListener(event, hideTooltip));
  };

  const handleRef = (instance: ReactInstance) => {
    if (children.props['ref']) { children.props.ref(instance); }

    if (instance) {
      // eslint-disable-next-line react/no-find-dom-node
      targetRef.current = findDOMNode(instance) as HTMLElement;
      hookEvents();
    } else {
      unhookEvents();
      targetRef.current = null;
    }
  };

  useOnUnmount(() => {
    unhookEvents();
    hideTooltip();
  });

  const childElement = useMemo(() => cloneElement(children, { ref: handleRef }), [children]);

  return (
    <>
      {childElement}
      <Popper
        open={isVisible}
        anchorEl={targetRef.current}
        container={hostElementRef.current}
        keepMounted
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={animationDuration}>
            <CustomTag name="ui-tooltip-content" className={classNames(styles.tooltip, className)}>
              {content}
            </CustomTag>
          </Fade>
        )}
      </Popper>
    </>
  );
});
