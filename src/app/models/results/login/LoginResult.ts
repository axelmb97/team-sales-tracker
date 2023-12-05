import { BaseResult } from '../BaseResult';

export interface LoginResult extends BaseResult {
  token: string;
}
