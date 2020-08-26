/** Common */

export const isServer = (): boolean => typeof window === 'undefined';

export const isClient = (): boolean => !isServer();

/** Custom  */

export const isDebug = (): boolean => process.env['S_DEBUG'] === 'TRUE';
