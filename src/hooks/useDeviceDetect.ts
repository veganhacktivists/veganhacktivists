import { useEffect, useState } from 'react';

interface DeviceDetect {
  isMobile: () => boolean;
  isDesktop: () => boolean;
  isAndroid: () => boolean;
  isIos: () => boolean;
  isSsr: () => boolean;
}

const getDeviceQueries = (userAgent: NavigatorID['userAgent']) => {
  const mobileOsRegExp = new RegExp(
    'BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|' +
      'Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune',
    'i'
  );

  const isAndroid = () => !!userAgent.match(/Android/i);
  const isIos = () => !!userAgent.match(/iP(hone|od|ad)/i);
  const isSsr = () => !!userAgent.match(/SSR/i);
  const isMobile = () =>
    !!userAgent.match(/Mobile/i) ||
    isAndroid() ||
    isIos() ||
    !!userAgent.match(mobileOsRegExp);
  const isDesktop = () => !isMobile() && !isSsr();

  return {
    isMobile,
    isDesktop,
    isAndroid,
    isIos,
    isSsr,
  };
};

const useDeviceDetect: () => DeviceDetect = () => {
  const [deviceDetect, setDeviceDetect] = useState<DeviceDetect>({
    isMobile: () => false,
    isDesktop: () => false,
    isAndroid: () => false,
    isIos: () => false,
    isSsr: () => false,
  });

  useEffect(() => {
    const userAgent = navigator === undefined ? 'SSR' : navigator.userAgent;
    setDeviceDetect(getDeviceQueries(userAgent));
  }, []);

  return deviceDetect;
};

export default useDeviceDetect;
