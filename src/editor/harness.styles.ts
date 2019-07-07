import { flex, position, shadows } from '../styles';
import { style } from '../../tests/harness/styles';

export default {

  editor: style({
    margin: '30px',
    width: '350px',
    padding: '5px',
    backgroundColor: '#eee',
    border: 'solid 1px #aaa',
    ...shadows.box.ambient(2),
    fontSize: '12pt',
    minHeight: '800px',
  }),

  reports: {

    container: style({
      ...flex.content.stack,
      ...position.absolute,
      top: '30px',
      left: '410px',
      width: '250px',
    }),

    block: style({
      ...flex.content.stack,
      ...shadows.box.ambient(2),
      backgroundColor: '#eee',
      padding: '5px',
      border: 'solid 1px #aaa',
      // boxShadow: '0 0 2px 1px #aaaaaa66',
      marginBottom: '20px',

      $nest: {
        '&>record-property': {
          ...flex.content,

          $nest: {
            '&>record-property-name': {
              width: '50%',
            },
          },
        },
      },
    }),

  },

};
