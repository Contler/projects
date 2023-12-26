import { createAction, props } from '@ngrx/store';

export const loadUser = createAction('[Config/API] Load User', props<{ id: string }>());
export const serUser = createAction('[Config/API] Set User', props<{ user: any }>());
