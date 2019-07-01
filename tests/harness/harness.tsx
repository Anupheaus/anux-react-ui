import 'anux-common';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as exportedHarnesses from '../../harnesses';
import { IHarnessDetails, getHarnessDetails } from './createHarness';
import styles from './styles';

interface IHarness extends IHarnessDetails {
  type: new (...args: unknown[]) => React.PureComponent;
}

const harnesses: IHarness[] = [];
Object.keys(exportedHarnesses)
  .forEach(key => {
    // eslint-disable-next-line import/namespace
    const harness = exportedHarnesses[key];
    if (typeof (harness) === 'function') {
      const details = getHarnessDetails(harness);
      if (!details) {
        // tslint:disable-next-line: no-console
        console.warn('Found a react function component being exported from a harness file without being wrapped with createHarness.');
        return;
      }
      harnesses.push({ ...details, type: harness });
    }
  });

function loadHarness(harness: IHarness): void {
  document.location.href = `?harness=${harness.name}`;
}

function renderHarnessSelector(harness: IHarness, index: number): JSX.Element {
  return (
    <div className={styles.selector} key={index} onClick={() => loadHarness(harness)}>
      {harness.name}
    </div>
  );
}

window.onload = () => {
  const params = new URLSearchParams(document.location.search);
  const harnessName = params.get('harness');
  const harness = harnesses.find(item => item.name === harnessName);
  let render: React.ReactElement = null;

  if (harness) {
    const HarnessComponent = harness.type;
    render = (
      <HarnessComponent />
    );
  } else {
    render = (
      <div className={styles.root}>
        {harnesses.map(renderHarnessSelector)}
      </div>
    );
  }

  ReactDOM.render(render, document.querySelectorAll('app')[0],
  );

};
