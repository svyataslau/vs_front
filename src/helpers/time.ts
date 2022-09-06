import { UserChallenge } from '@/store/types';

const oneDayInMiliseconds = 86400000;
const oneHourInMiliseconds = 3600000;
const oneMinuteInMiliseconds = 60000;
const oneSecondInMiliseconds = 1000;

export const dateNowIsoString = () => {
  return new Date(
    Date.now() + new Date().getTimezoneOffset() * 60000
  ).toISOString();
};

export const countMsFromDateTillNow = (isoDateString: string) => {
  return (
    Date.parse(
      new Date(
        Date.now() + new Date().getTimezoneOffset() * 60000
      ).toISOString()
    ) - Date.parse(isoDateString)
  );
};

export const generateTimerObject = (date: string) => {
  const pastMiliseconds = countMsFromDateTillNow(date);
  const countDays = Math.trunc(pastMiliseconds / oneDayInMiliseconds);
  const countHours = Math.trunc(pastMiliseconds / oneHourInMiliseconds);
  const countMinutes = Math.trunc(pastMiliseconds / oneMinuteInMiliseconds);
  const countSeconds = Math.trunc(pastMiliseconds / oneSecondInMiliseconds);
  const timeArray = [
    {
      days: countDays,
      progressMessage: `${countDays} ${countDays > 1 ? 'days' : 'day'}`,
      repeatIntervalIn: oneDayInMiliseconds,
    },
    {
      days: countHours,
      progressMessage: `${countHours} ${countHours > 1 ? 'hours' : 'hour'}`,
      repeatIntervalIn: oneHourInMiliseconds,
    },
    {
      days: countMinutes,
      progressMessage: `${countMinutes} ${
        countMinutes > 1 ? 'minutes' : 'minute'
      }`,
      repeatIntervalIn: oneMinuteInMiliseconds,
    },
    {
      days: countSeconds,
      progressMessage: `${countSeconds} ${
        countSeconds > 1 ? 'seconds' : 'second'
      }`,
      repeatIntervalIn: oneSecondInMiliseconds,
    },
  ];
  return timeArray.find((element) => element.days > 0);
};

export const calculatePercentOfСhallenge = (challenge: UserChallenge) => {
  const daysNumberInMiliseconds = challenge.daysNumber * oneDayInMiliseconds;
  return (
    100 *
    (countMsFromDateTillNow(challenge.startDate) / daysNumberInMiliseconds)
  );
};
