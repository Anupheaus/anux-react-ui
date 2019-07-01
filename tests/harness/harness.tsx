import 'anux-common';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as exportedHarnesses from '../../harnesses';
import { getHarnessDetails, IHarnessDetails } from '../dist';
// import '../../src';
// import '../../src/icons';
// import '../environment';
// import './harness.pug';
import './harness.scss';

interface IHarness extends IHarnessDetails {
  type: new (...args: any[]) => React.PureComponent;
}

const harnesses: IHarness[] = [];
Object.keys(exportedHarnesses)
  .forEach(key => {
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

function loadHarness(harness: IHarness) {
  document.location.href = `?harness=${harness.name}`;
}

function renderHarnessSelector(harness: IHarness, index: number) {
  return (
    <div className="harness-selector" key={index} onClick={() => loadHarness(harness)}>
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
      <div className="harnesses">
        {harnesses.map(renderHarnessSelector)}
      </div>
    );
  }

  ReactDOM.render(render, document.querySelectorAll('page')[0],
  );

};
