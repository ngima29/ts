import { UserInterface } from '.';

export interface ContextInterface {
  user: UserInterface | undefined;
  token: string | undefined;
}
