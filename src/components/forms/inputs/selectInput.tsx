import { useEffect, useState } from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import React from 'react';
import classNames from 'classnames';
import style from 'react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark';

import getThemeColor from '../../../lib/helpers/theme';

import type { HTMLAttributes, Ref } from 'react';
import type { StylesConfig, Props as ReactSelectProps } from 'react-select';
import type { ThemeConfig } from 'react-select/dist/declarations/src/theme';
import type StateManagedSelect from 'react-select';

export interface OptionType<T> {
  label: string;
  value: T;
}

interface SelectInputProps<T>
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className'> {
  id?: string;
  current: OptionType<T> | null;
  name?: string;
  error?: string;
  options: OptionType<T>[];
  creatable?: boolean;
  onChange?: (value: OptionType<T> | null) => void;
  placeholder?: string;
  showError?: boolean;
  theme?: string;
}

const grey = getThemeColor('grey');
const lightGrey = getThemeColor('grey-light');
const lighterGrey = getThemeColor('grey-lighter');
const red = getThemeColor('red');

const SelectInput = <T,>({
  error,
  current,
  className,
  options,
  onChange,
  creatable = false,
  ref,
  ...props
}: SelectInputProps<T> & { ref?: Ref<StateManagedSelect> }) => {
  const [allOptions, setAllOptions] = useState(options);
  const [rendered, setRendered] = useState<boolean>(false);

  useEffect(() => {
    setRendered(true);
  }, []);

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

  const getStyles = function (): StylesConfig<OptionType<T>, false> {
    if (props.theme === 'data') {
      return {
        placeholder: (provided) => ({
          ...provided,
          color: '#a1a1aa',
        }),
        control: (provided) => ({
          ...provided,
          minHeight: height,
          height,
          borderWidth: error ? 2 : 1,
          borderColor: error ? red : 'white',
          boxSizing: 'content-box',
          fontSize: '1.25rem',
          backgroundColor: 'transparent',
        }),
        valueContainer: (provided) => ({
          ...provided,
          padding: '0 6px',
        }),
        input: (provided) => ({
          ...provided,
          margin: '0px',
        }),
        dropdownIndicator: (provided, { selectProps: { menuIsOpen } }) => ({
          ...provided,
          color: lighterGrey,
          transform: menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          '&:hover': {
            color: lightGrey,
          },
          '&:active': {
            color: grey,
          },
        }),
        indicatorsContainer: (provided) => ({
          ...provided,
        }),
        menu: (provided) => ({
          ...provided,
          marginTop: 4,
          'z-index': '11',
        }),
        menuList: (provided) => ({ ...provided, padding: 0 }),
      };
    } else {
      return {
        placeholder: (provided) => ({
          ...provided,
          color: '#a1a1aa',
        }),
        control: (provided) => ({
          ...provided,
          minHeight: height,
          height,
          borderWidth: error ? 2 : 1,
          borderColor: error ? red : grey,
          boxSizing: 'content-box',
          fontSize: '1.25rem',
        }),
        valueContainer: (provided) => ({
          ...provided,
          padding: '0 6px',
        }),
        input: (provided) => ({
          ...provided,
          margin: '0px',
        }),
        dropdownIndicator: (provided, { selectProps: { menuIsOpen } }) => ({
          ...provided,
          color: lighterGrey,
          transform: menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          '&:hover': {
            color: lightGrey,
          },
          '&:active': {
            color: grey,
          },
        }),
        indicatorsContainer: (provided) => ({
          ...provided,
          backgroundColor: grey,
        }),
        menu: (provided) => ({
          ...provided,
          marginTop: 4,
          'z-index': '11',
        }),
        menuList: (provided) => ({ ...provided, padding: 0 }),
      };
    }
  };

  const classes = classNames(className, 'text-left');

  const commonProps: Partial<ReactSelectProps<OptionType<T>, false>> = {
    ...props,
    onChange,
    value: rendered ? current : undefined,
    styles: getStyles(),
    theme,
    id: props.id || props.name,
    instanceId: props.id || props.name,
    options: allOptions,
    className: classes,
    placeholder: props.placeholder,
    components: {
      IndicatorSeparator: null,
    },
  };

  const SelectComponent = () =>
    creatable ? (
      <CreatableSelect
        {...commonProps}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={ref as any}
        onCreateOption={(value) => {
          const newOption = { label: value, value: value as T };
          setAllOptions((options) => [...options, newOption]);
          onChange?.(newOption);
        }}
      />
    ) : (
      <Select
        {...commonProps}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={ref as any}
      />
    );

  return (
    <>
      <SelectComponent />
      {error && <div className="text-red">⚠ {error}</div>}
    </>
  );
};

export default SelectInput;
