import getThemeColor from '../../../lib/helpers/theme';

export const getButtonFillStyle: (
  from: string,
  to: string
) => React.CSSProperties = (from, to) => {
  return {
    backgroundImage: `linear-gradient(to right, ${getThemeColor(
      to
    )},  50%, ${getThemeColor(from)} 50%)`,
    backgroundSize: '250% 100%',
    backgroundPosition: 'right',
  };
};
