import { useState, useEffect } from 'react';
import useThemeColor from '../../../hooks/useThemeColor';
import type { Styles } from 'react-select';
import Select from 'react-select';
import CreatableSelect, { makeCreatableSelect } from 'react-select/creatable';
import type { ThemeConfig } from 'react-select/src/theme';

interface OptionType {
  label: string;
  value: string;
}

interface SelectInputProps {
  error?: string;
  options: OptionType[];
  creatable?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

const SelectInput: React.FC<SelectInputProps> = ({
  error,
  options,
  creatable = false,
  ...props
}) => {
  const grey = useThemeColor('grey') as string;
  const lightGrey = useThemeColor('grey-light') as string;
  const red = useThemeColor('red') as string;

  const [allOptions, setAllOptions] = useState(options);
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    props.onChange(value);
  }, [value]);

  const height = '44px';

  const theme: ThemeConfig = (theme) => ({
    ...theme,
    borderRadius: 0,
    colors: {
      ...theme.colors,
      primary: grey,
      primary25: lightGrey,
      secondary: lightGrey,
    },
  });

  const styles: Partial<Styles<{ label: string; value: string }, false>> = {
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
  };

  const SelectComponent = () =>
    creatable ? (
      <CreatableSelect
        {...props}
        onCreateOption={(value) => {
          const newOption = { label: value, value };
          setAllOptions((options) => [...options, newOption]);

          setValue(value);
        }}
        onChange={(value) => {
          setValue(value?.value || null);
        }}
        value={allOptions.find((option) => option.value === value)}
        id={props.id || props.name}
        instanceId={props.id || props.name}
        placeholder={props.placeholder}
        theme={theme}
        styles={styles}
        options={allOptions}
      />
    ) : (
      <Select
        {...props}
        id={props.id || props.name}
        value={allOptions.find((option) => option.value === value)}
        instanceId={props.id || props.name}
        placeholder={props.placeholder}
        onChange={(value) => {
          setValue(value?.value || null);
        }}
        theme={theme}
        styles={styles}
        options={allOptions}
      />
    );

  return <SelectComponent />;
};

export default SelectInput;
