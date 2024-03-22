'use client';

import { useState } from 'react';

import useOnce from './useOnce';

/**
 * Interface expressing the queries used to check the user's device.
 */
interface DeviceDetect {
  /** Function returning whether the device is a mobile one or not. */
  isMobile: boolean;
  /** Function returning whether the device is a desktop pc or not. */
  isDesktop: boolean;
  /** Function returning whether the device is an Android smartphone or not. */
  isAndroid: boolean;
  /** Function returning whether the device is an IOS one or not. */
  isIos: boolean;
  /** Function returning whether the device is a server or not. */
  isSsr: boolean;
  isReady: boolean;
}

/**
 * Function returning a series of functions to query the type of device of the user.
 * @param userAgent {string} The user-agent header sent by the user's browser to the server.
 *
 * @return {DeviceDetect} Object containing the functions to query which kind of device the user is utilizing.
 */
const getDeviceQueries = (userAgent?: NavigatorID['userAgent']) => {
  if (userAgent === undefined) {
    return {
      isMobile: false,
      isDesktop: false,
      isAndroid: false,
      isIos: false,
      isSsr: true,
    };
  }
  const mobileOsRegExp =
    /BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/i;
  const isAndroid = /Android/i.test(userAgent);
  const isIos = /iP(hone|od|ad)/i.test(userAgent);
  const isMobile =
    /Mobile/i.test(userAgent) ||
    isAndroid ||
    isIos ||
    mobileOsRegExp.test(userAgent);
  const isDesktop = !isMobile;

  return {
    isMobile,
    isDesktop,
    isAndroid,
    isIos,
    isSsr: false,
  };
};

/**
 * Hook that returns a series of function to query the kind of device of the user.
 * @return Object containing the functions to query which kind of device the user is utilizing.
 */
const useDeviceDetect: () => DeviceDetect = () => {
  const [deviceDetect, setDeviceDetect] = useState<DeviceDetect>({
    isMobile: false,
    isDesktop: false,
    isAndroid: false,
    isIos: false,
    isSsr: typeof window === 'undefined',
    isReady: false,
  });

  useOnce(() => {
    const userAgent = navigator?.userAgent;
    setDeviceDetect({ ...getDeviceQueries(userAgent), isReady: true });
  });

  return deviceDetect;
};

export default useDeviceDetect;
