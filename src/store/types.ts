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
  userId: number;
  promiseId: number;
  startDate: string;
  daysNumber: number;
  title: string;
  description: string;
}

export interface Promise {
  id: number;
  title: string;
}

export interface User {
  nickname: string;
  email: string;
  password: string;
}

export interface Alert {
  message: string;
}
