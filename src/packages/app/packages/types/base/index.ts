import { IBaseAPI } from '@web/apis/base';

export interface IEpicDependency {
    baseAPI: IBaseAPI;
}

export interface IServerRuntimeConfig {
    basePath: string;
    [key: string]: string;
}

export type PlatformType = 'DESKTOP' | 'MOBILE';

export interface IBasePageProps {
    baseObject: Record<string, unknown> & { isFromBase: boolean };
}
