export interface ProfileState {
  isAuthorized: boolean;
  userData: object;
  isAdmin: boolean;
}

export interface RootState {
  promises: object[];
  alerts: object[];
  userChallenges: object[];
}

export interface UserChallenge {
  id: number;
  user_id: number;
  promise_id: number;
  start_date: string;
  days_number: number;
  title: string;
  description: string;
}

export interface Promise {
  id: number;
  title: string;
}
