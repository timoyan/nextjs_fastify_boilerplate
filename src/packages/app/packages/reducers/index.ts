import { BaseAPI } from '@web/apis/base';
import epics from '@web/epics';
import { IEpicDependency } from '@web/types/base';
import { isClient } from '@web/utilities/is';
import { Context, MakeStore } from 'next-redux-wrapper';
import { Action, applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { baseReducer, IBaseState } from './base';

export interface IRootState {
    base: IBaseState;
}

const rootReducer = combineReducers<IRootState>({
    base: baseReducer,
});

export const makeStore: MakeStore<IRootState> = (context: Context) => {
    const epicMiddleware = createEpicMiddleware<
        Action,
        Action,
        IRootState,
        IEpicDependency
    >({
        dependencies: {
            baseAPI: new BaseAPI(),
        },
    });

    // TODO: Here should be closed when production mode
    const composeEnhancers =
        (isClient() &&
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ((window as { [key: string]: any })[
                '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'
            ] as typeof compose)) ||
        compose;

    const store = createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(epicMiddleware))
    );

    epicMiddleware.run(epics);

    return store;
};

export default rootReducer;
