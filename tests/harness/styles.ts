import { style, flex, shadows } from '../../src/styles';

export default {
  root: style({
    ...flex.content,
    padding: '10px',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  }),

  selector: style({
    ...flex.content,
    ...shadows.box.ambient(2),
    padding: '10px',
    margin: '10px',
    border: 'solid 1px #00000030',
    cursor: 'pointer',

    $nest: {
      '&:hover': {
        backgroundColor: '#0075ff30',
      },
    },
  }),
}