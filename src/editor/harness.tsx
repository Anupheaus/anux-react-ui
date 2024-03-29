import { useBound, CustomTag } from 'anux-react-utils';
import { FunctionComponent, useState, useRef } from 'react';
import { createHarness } from '../../tests/harness/createHarness';
import styles from './harness.styles';
import { EditorToolbar } from './toolbar';
import { Editor, TextField, NumberField, DropdownField, AutocompleteField, DateTimeField, DateTimeModes, ToggleField } from './';

interface IRecord {
  name: string;
  emptyString: string;
  age: number;
  sourceId: string;
  invalidSourceId: string;
  date: number;
  switch: boolean;
}

interface ISource {
  id: string;
  name: string;
}

interface IProps {
  record: IRecord;
}

const ReportRecord: FunctionComponent<IProps> = ({ record }) => {

  const formatValue = (value: unknown) => {
    switch (typeof (value)) {
      case 'boolean':
        return value === true ? 'true' : 'false';
      default:
        return value;
    }
  };

  const renderProperty = (property: PropertyKey) => (
    <CustomTag key={property.toString()} name="record-property">
      <CustomTag name="record-property-name">{property.toString()}:</CustomTag>
      <CustomTag name="record-property-value">{formatValue(record[property])}</CustomTag>
    </CustomTag>
  );

  return (
    <CustomTag name="report-record" className={styles.reports.block}>
      {Reflect.ownKeys(record).map(renderProperty)}
    </CustomTag>
  );
};

export const editorHarness = createHarness({ name: 'Editor' }, () => {
  const [data, setData] = useState<IRecord>({
    name: 'Tony',
    emptyString: undefined,
    age: 38,
    sourceId: '123',
    invalidSourceId: '200',
    date: (new Date((new Date()).toUTCString())).valueOf(),
    switch: true,
  });
  const refreshCountRef = useRef(0);

  const sources: ISource[] = [
    { id: '124', name: 'book' },
    { id: '123', name: 'pen' },
    { id: '125', name: 'notepad' },
  ];

  const handleOnSave = useBound(async (newRecord: IRecord) => {
    setData(newRecord);
    await Promise.delay(2000);
  });

  const loadItems = useBound<() => Promise<ISource[]>>(() => new Promise(resolve => setTimeout(() => resolve(sources), 3000)));

  return (
    <Editor<IRecord>
      className={styles.editor}
      record={data}
      onSave={handleOnSave}
    >
      {({ record, update }) => {
        refreshCountRef.current++;
        return (
          <>
            <TextField
              label="Text Field"
              get={record.name}
              set={value => update({ ...record, name: value })}
              isRequired
            />
            <TextField
              label="Text Field (Read Only)"
              get={record.name}
            />
            <TextField
              get={record.emptyString}
              set={value => update({ ...record, emptyString: value })}
              hint="This is my hint!"
            />
            <TextField
              label="Text Field (shrunken label)"
              get={''}
              applyShrunkenLabel
            />
            <NumberField
              label="Number Field"
              get={record.age}
              set={age => update({ ...record, age })}
              decimalPlaces={0}
            />
            <DropdownField<ISource>
              label="Dropdown Field"
              get={record.sourceId}
              set={item => update({ ...record, sourceId: item.id })}
              items={loadItems}
            >
              {({ name }) => (
                <div>{name}</div>
              )}
            </DropdownField>
            <DropdownField<ISource>
              label="Invalid Dropdown Field"
              get={record.invalidSourceId}
              set={item => update({ ...record, invalidSourceId: item.id })}
              items={loadItems}
            >
              {({ name }) => (
                <div>{name}</div>
              )}
            </DropdownField>
            <AutocompleteField<ISource>
              label="Autocomplete Field"
              get={record.sourceId}
              set={item => update({ ...record, sourceId: item ? item.id : undefined })}
              items={loadItems}
              getTextFromItem={item => item.name}
              isRequired={true}
            >
              {({ item: { name }, text }) => (
                <div>{name} ({text})</div>
              )}
            </AutocompleteField>
            <DateTimeField
              label="Date Time Field"
              get={record.date}
              set={date => update({ ...record, date })}
            />
            <DateTimeField
              label="Date Field"
              mode={DateTimeModes.DateOnly}
              get={record.date}
              set={date => update({ ...record, date })}
            />
            <DateTimeField
              label="Time Field"
              mode={DateTimeModes.TimeOnly}
              get={record.date}
              set={date => update({ ...record, date })}
            />
            <ToggleField
              label="Switch Field"
              get={record.switch}
              set={value => update({ ...record, switch: value })}
            />
            <ToggleField
              label="Switch Field"
              applyShrunkenLabel={true}
              get={record.switch}
              set={value => update({ ...record, switch: value })}
            />
            <EditorToolbar />
            <CustomTag name="harness-reports" className={styles.reports.container}>
              <ReportRecord record={data} />
              <ReportRecord record={record} />
              <div className={styles.reports.recordCount}>Refresh Count: {refreshCountRef.current}</div>
            </CustomTag>
          </>
        );
      }}
    </Editor>
  );
});
