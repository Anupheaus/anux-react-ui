import { CustomTag } from 'anux-react-utils';
import { createHarness } from '../../tests/harness/createHarness';
import { style } from '../../tests/harness/styles';
import { flex, classNames, position } from '../styles';
import { Tooltip } from './tooltip';
import { Tooltips } from './tooltips';

style.cssRule('body', {
  overflow: 'hidden',
});

const styles = {

  root: style({
    ...flex.full,
    ...position.relative,
  }),

  customTag: style({
    ...position.absolute,
    width: '100px',
    height: '100px',
    backgroundColor: 'red',
  }),

  topLeft: style({
    top: 0,
    left: 0,
  }),

  bottomLeft: style({
    bottom: 0,
    left: 0,
  }),

  topRight: style({
    top: 0,
    right: 0,
  }),

  bottomRight: style({
    bottom: 0,
    right: 0,
  }),

};

export const tooltipHarness = createHarness({ name: 'Tooltips' }, () => {
  const reallyLongTip = 'hey, this is a really, really long tooltip';
  return (
    <Tooltips>
      <div className={styles.root}>
        <Tooltip content={reallyLongTip}>
          <CustomTag name="ui-test-button" className={classNames(styles.customTag, styles.topLeft)} />
        </Tooltip>
        <Tooltip content={reallyLongTip}>
          <CustomTag name="ui-test-button" className={classNames(styles.customTag, styles.bottomLeft)} />
        </Tooltip>
        <Tooltip content={reallyLongTip}>
          <CustomTag name="ui-test-button" className={classNames(styles.customTag, styles.topRight)} />
        </Tooltip>
        <Tooltip content={reallyLongTip}>
          <CustomTag name="ui-test-button" className={classNames(styles.customTag, styles.bottomRight)} />
        </Tooltip>
      </div>
    </Tooltips>
  );
});