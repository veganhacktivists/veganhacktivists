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
const green = getThemeColor('green');
const greenDark = getThemeColor('green-dark');

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

  const styles: StylesConfig<OptionType<T>, false> = {
    control: (provided, { selectProps: { menuIsOpen } }) => ({
      ...provided,
      background:
        props.theme === 'data'
          ? 'transparent'
          : props.theme === 'greyIntoGreen'
          ? `linear-gradient(to right, ${green}, 50%, ${grey} 50%)`
          : 'white',
      backgroundPosition: menuIsOpen ? '0' : 'right',
      '&:hover': {
        backgroundPosition:
          props.theme === 'greyIntoGreen' ? '0' : provided.backgroundPosition,
      },
      backgroundSize:
        props.theme === 'greyIntoGreen' ? '250% 100%' : provided.backgroundSize,
      borderColor: error ? red : props.theme === 'data' ? 'white' : grey,
      borderLeft:
        props.theme === 'greyIntoGreen'
          ? `8px solid ${green}`
          : provided.borderLeft,
      borderWidth: error ? 2 : props.theme === 'greyIntoGreen' ? '0' : 1,
      boxShadow: props.theme === 'greyIntoGreen' ? 'none' : provided.boxShadow,
      boxSizing: 'content-box',
      fontSize: '1.25rem',
      fontWeight: props.theme === 'greyIntoGreen' ? '600' : provided.fontWeight,
      height,
      minHeight: height,
      transition: 'background-position 400ms linear',
    }),
    dropdownIndicator: (provided, { selectProps: { menuIsOpen } }) => ({
      ...provided,
      color: props.theme === 'greyIntoGreen' ? 'white' : lighterGrey,
      transform: menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
      transition: 'transform 200ms ease-in-out',
      '&:hover': {
        color: props.theme === 'greyIntoGreen' ? 'white' : lightGrey,
      },
      '&:active': {
        color: props.theme === 'greyIntoGreen' ? 'white' : grey,
      },
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      backgroundColor:
        props.theme === 'greyIntoGreen'
          ? 'transparent'
          : props.theme !== 'data'
          ? grey
          : provided.backgroundColor,
    }),
    input: (provided) => ({
      ...provided,
      color: props.theme === 'greyIntoGreen' ? 'white' : provided.color,
      margin: '0px',
    }),
    menu: (provided) => ({
      ...provided,
      background: props.theme === 'greyIntoGreen' ? green : provided.background,
      color: props.theme === 'greyIntoGreen' ? 'white' : provided.color,
      marginTop: 4,
      'z-index': '11',
    }),
    menuList: (provided) => ({
      ...provided,
      padding: 0,
    }),
    noOptionsMessage: (provided) => ({
      ...provided,
      color: props.theme === 'greyIntoGreen' ? 'white' : provided.color,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor:
        props.theme === 'greyIntoGreen'
          ? state.isFocused
            ? greenDark
            : provided.backgroundColor
          : provided.backgroundColor,
      transition: 'background-color 200ms ease-in-out',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: props.theme === 'greyIntoGreen' ? 'white' : '#a1a1aa',
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: '0 6px',
    }),
  };

  const classes = classNames(className, 'text-left');

  const commonProps: Partial<ReactSelectProps<OptionType<T>, false>> = {
    ...props,
    onChange,
    value: rendered ? current : undefined,
    styles,
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
