import { flex } from '../styles';
import { style } from '../styles/uiStyle';

export default {

  root: style(flex.content.stack),

  content: style({
    ...flex.full.stack,
    padding: '5px',
  }),

  toolbar: {

    root: style({
      ...flex.content.wrap,
      flexWrap: 'nowrap',
      marginTop: 'auto',
    }),

    customContainer: style({
      ...flex.full.wrap,
      flexWrap: 'nowrap',
    }),

  },

};

