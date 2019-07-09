import { ReactNode, ReactElement, FunctionComponent } from 'react';
import { Tooltip as MuiTooltip, Fade } from '@material-ui/core';

interface IProps {
  title: ReactNode;
  children: ReactElement;
}

export const Tooltip: FunctionComponent<IProps> = ({ title, children }) => {
  return (
    <MuiTooltip
      title={title}
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 600 }}
    >
      {children}
    </MuiTooltip>
  );
};
