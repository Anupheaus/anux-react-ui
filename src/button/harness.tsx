import DeleteIcon from '@material-ui/icons/Delete';
import { useBound } from 'anux-react-utils';
import { Tooltips, Tooltip } from '../tooltip';
import { flex } from '../styles';
import { createHarness } from '../../tests/harness/createHarness';
import { style } from '../../tests/harness/styles';
import { Button } from './button';
import { ButtonBadge } from './badge';
import { ButtonItem } from './item';

const styles = {

  root: style({
    ...flex.content.wrap,
    alignItems: 'self-start',
    padding: '20px',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',

    $nest: {
      '&>*': {
        marginRight: '10px',
        marginBottom: '10px',
      },
    },
  }),

};

export const buttonHarness = createHarness({ name: 'Buttons' }, () => {
  const handleClick = useBound(async () => {
    await Promise.delay(10000);
  });

  return (
    <Tooltips>
      <div className={styles.root}>
        <Button onClick={handleClick}>Flat Button</Button>
        <Button
          appearance="outlined"
          variant="secondary"
          onClick={handleClick}
        >Outlined Button</Button>
        <Button
          appearance="filled"
          variant="primary"
          onClick={handleClick}
        >Filled Button</Button>
        <Button
          badge={12}
          variant="secondary"
          onClick={handleClick}
        >Badge (number direct)</Button>
        <Tooltip content="With tooltip">
          <Button
            badge={<span>18</span>}
            onClick={handleClick}
          >Badge (content direct)</Button>
        </Tooltip>
        <Button
          badge={<ButtonBadge><span>15</span></ButtonBadge>}
          appearance="filled"
          variant="secondary"
          onClick={handleClick}
        >Badge with Content</Button>
        <Button
          badge={<ButtonBadge max={99} variant="secondary">100</ButtonBadge>}
          size="small"
          appearance="outlined"
          onClick={handleClick}
        >Badge with Value</Button>
        <Button
          badge={<ButtonBadge variant="error">!</ButtonBadge>}
          size="large"
          appearance="filled"
          onClick={handleClick}
        >Badge with Error</Button>
        <Button
          badge={true}
          appearance="filled"
          onClick={handleClick}
        >Badge as dot</Button>
        <Button
          badge={false}
          appearance="filled"
          onClick={handleClick}
        >Badge as dot 2</Button>
        <Button
          appearance="filled"
          size="small"
          onClick={handleClick}
        >Small</Button>
        <Button
          appearance="outlined"
          size="large"
          variant="primary"
          onClick={handleClick}
        >Large</Button>
        <Button
          icon={<DeleteIcon />}
          onClick={handleClick}
        >With Icon</Button>
        <Button
          icon={<DeleteIcon />}
          iconPosition="right"
          appearance="outlined"
          variant="primary"
          onClick={handleClick}
        >With Icon</Button>
        <Button
          size="small"
          onClick={handleClick}
        ><DeleteIcon /></Button>
        <Button
          onClick={handleClick}
        ><DeleteIcon /></Button>
        <Button
          size="large"
          onClick={handleClick}
        ><DeleteIcon /></Button>
        <Button
          appearance="filled"
          size="small"
          onClick={handleClick}
        ><DeleteIcon /></Button>
        <Button
          appearance="filled"
          variant="secondary"
          onClick={handleClick}
        ><DeleteIcon /></Button>
        <Button
          badge={<ButtonBadge variant="secondary">12</ButtonBadge>}
          appearance="filled"
          variant="primary"
          size="large"
          onClick={handleClick}
        ><DeleteIcon /></Button>
        <Button
          appearance="filled"
          variant="primary"
          items={[
            <ButtonItem key="1" onClick={handleClick}>Choice 1</ButtonItem>,
            <ButtonItem key="2" onClick={handleClick}>Choice 2</ButtonItem>,
          ]}
          onClick={handleClick}
        >Choices!</Button>
        <Button
          appearance="filled"
          variant="primary"
          items={[
            <ButtonItem key="1" onClick={handleClick} icon={<DeleteIcon />}>Choice 1</ButtonItem>,
            <ButtonItem key="2" onClick={handleClick} icon={<DeleteIcon />}>Choice 2</ButtonItem>,
          ]}
          onClick={handleClick}
        ><DeleteIcon /></Button>
      </div>
    </Tooltips>
  );
});
