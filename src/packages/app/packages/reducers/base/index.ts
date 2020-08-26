import { IGetBaseConfigResponse } from '@web/apis/base';
import { createAction, createReducer } from 'redux-act';

export const baseConfigAction = {
    Fetch: {
        Start: createAction('[BaseConfig][Fetch][Start]'),
        Done: createAction(
            '[BaseConfig][Fetch][Done]',
            (payload: IGetBaseConfigResponse) => payload
        ),
        Error: createAction('[BaseConfig][Fetch][Error]'),
    },
};

export interface IBaseState {
    language: string;
}

export const baseReducer = createReducer<IBaseState>(
    {
        [baseConfigAction.Fetch.Start.getType()]: (state) => {
            return {
                ...state,
                language: '',
            };
        },
        [baseConfigAction.Fetch.Done.getType()]: (
            state,
            payload: Parameters<typeof baseConfigAction.Fetch.Done>[0]
        ) => {
            return { ...state, language: payload.langunage };
        },
    },
    { language: '' }
);
