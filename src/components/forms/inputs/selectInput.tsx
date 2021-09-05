import { useState, useEffect } from 'react';
import useThemeColor from '../../../hooks/useThemeColor';
import Select from 'react-select';
import Creatable, { makeCreatableSelect } from 'react-select/creatable';
import { firstLetterUppercase } from '../../../lib/helpers/strings';

const SelectInput: React.FC<any> = ({ error, ...props }) => {
  const grey = useThemeColor('grey');
  const lightGrey = useThemeColor('grey-light');
  const red = useThemeColor('red');

  const options = ['website', 'project', 'funding', 'advice'].map((option) => ({
    value: option,
    label: firstLetterUppercase(option),
  }));

  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    props.onChange(value);
  }, [value]);

  const height = '44px';

  return (
    <Select
      {...props}
      id={props.id || props.name}
      instanceId={props.id || props.name}
      placeholder={props.placeholder}
      onChange={(selection) => setValue(selection?.value || null)}
      value={options.find((option) => option.value === value)}
      theme={(theme) => ({
        ...theme,
        borderRadius: 0,
        colors: {
          ...theme.colors,
          primary: grey,
          primary25: lightGrey,
          secondary: lightGrey,
        },
      })}
      styles={{
        placeholder: (provided) => ({
          ...provided,
          color: '#a1a1aa',
        }),
        dropdownIndicator: (provided) => ({
          ...provided,
          backgroundColor: grey,
          height,
          verticalAlign: 'middle',
          marginTop: 'auto',
          marginBottom: 'auto',
        }),
        control: (provided) => ({
          ...provided,
          minHeight: height,
          height,
          border: error ? undefined : 0,
          borderColor: error && red,
          fontSize: '1.25rem',
        }),
        valueContainer: (provided) => ({
          ...provided,
          height,
          padding: '0 6px',
        }),
        input: (provided) => ({
          ...provided,
          margin: '0px',
        }),
        indicatorSeparator: () => ({
          display: 'none',
        }),
        indicatorsContainer: (provided) => ({
          ...provided,
          height,
        }),
      }}
      options={options}
    />
  );
};

export default SelectInput;
