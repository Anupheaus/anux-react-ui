import { useRef } from 'react';
import { useToggleState, useBound } from 'anux-react-utils';
import { Button } from '../button';
import { createHarness } from '../../tests/harness/createHarness';
import { createStyle, classNames } from './style';
import { flex } from './flex';

const style = createStyle({ name: 'anux-react-ui-styles', priority: 4, importedFonts: ['https://fonts.googleapis.com/css?family=Barriecito&display=swap'] })

const styles = {

  root: style({
    ...flex.full.wrap,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  }),

  test: style({
    ...flex.content.stack,
    margin: '20px',
    padding: '10px',
    borderRadius: '10px',
    backgroundColor: '#00000033',
  }),

  fontTest: style({
    fontFamily: 'Barriecito, sans serif',
    fontSize: '1.2em',
  }),

};

export const stylesHarness = createHarness({ name: 'Styles' }, () => {
  const headStyleTagToggle = useToggleState(false);
  const headStyleTagRef = useRef(document.createElement('style'));

  headStyleTagToggle.onChange(isToggled => {
    if (isToggled) {
      document.head.insertBefore(headStyleTagRef.current, document.head.children.item(0));
    } else {
      document.head.removeChild(headStyleTagRef.current);
    }
  });

  const toggleHeadStyleTag = useBound(() => {
    headStyleTagToggle.current = !headStyleTagToggle.current;
  });

  return (
    <div className={styles.root}>
      <div className={classNames(styles.test, styles.fontTest)}>
        Hey there everyone!
        <Button onClick={toggleHeadStyleTag}>Toggle Head Style Tag</Button>
      </div>
    </div>
  );
});