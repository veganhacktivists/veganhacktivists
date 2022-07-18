import { useEffect, useState } from 'react';

/**
 * Interface expressing the queries used to check the user's device.
 */
interface DeviceDetect {
  /** Function returning whether the device is a mobile one or not. */
  isMobile: () => boolean;
  /** Function returning whether the device is a desktop pc or not. */
  isDesktop: () => boolean;
  /** Function returning whether the device is an Android smartphone or not. */
  isAndroid: () => boolean;
  /** Function returning whether the device is an IOS one or not. */
  isIos: () => boolean;
  /** Function returning whether the device is a server or not. */
  isSsr: () => boolean;
}

/**
 * Function to return the queries
 * @param userAgent {string} The user-agent header sent by the user's browser to the server.
 *
 * @return {DeviceDetect} Object containing the functions to query which kind of device the user is utilizing.
 */
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

/**
 * Hook that returns a series of function to query the kind of device of the user.
 * @return {DeviceDetect} Object containing the functions to query which kind of device the user is utilizing.
 */
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
