import { IRootState } from '@web/reducers';
import { convertObjectIntoArray } from '@web/utilities/converter';
import { combineEpics, Epic } from 'redux-observable';
import baseEpics from './base';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default combineEpics<any, any, IRootState>(
    ...convertObjectIntoArray<Epic>(baseEpics)
);
