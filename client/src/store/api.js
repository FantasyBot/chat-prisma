import { createAction } from '@reduxjs/toolkit';

export const apiCallBegin = createAction('callBegin');
export const apiCallSuccess = createAction('callSuccess');
export const apiCallFailed = createAction('callFailed');
