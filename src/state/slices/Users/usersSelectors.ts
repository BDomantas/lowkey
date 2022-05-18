import {RootState} from '@State/store';
import {usersSelector} from './UsersSlice';

export const userById = (state: RootState, id: string) =>
  usersSelector.selectById(state, id);
