import { empty, Observable } from 'rxjs';
import { AjaxResponse } from 'rxjs/ajax';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IGetBaseConfigRequestPayload {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IGetBaseConfigResponse {
    langunage: string;
}

export interface IBaseAPI {
    GetBaseConfig$: () => Observable<AjaxResponse>;
}

export class BaseAPI implements IBaseAPI {
    GetBaseConfig$ = (): Observable<AjaxResponse> => {
        return empty();
    };
}
