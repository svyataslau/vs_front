export default {
  nicknameRules: [
    (v: string) => !!v || 'Nickname is required',
    (v: string) =>
      /^[\w\d](?:[-_.]?[\w\d])*$/.test(v) ||
      'Nickname can contain latin letters, numbers, -_.',
  ],
  emailRules: [
    (v: string) => !!v || 'Email is required',
    (v: string) =>
      /^([\w\d_\-.]+)@([\w\d_\-.]+)\.([\w]{2,5})$/.test(v) ||
      'Invalid email. The email must be valid! Example: some_email-1990@work.old.com',
  ],
  passwordRules: [
    (v: string) => !!v || 'Password is required',
    (v: string) =>
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\w\d]{8,}$/.test(v) ||
      'Invalid password. The password must consist of uppercase and lowercase Latin letters and be at least 8 characters long!',
  ],
  dayTimerRules: [(v: number) => v > 0 || 'Enter a positive number'],
  titleRules: [
    (v: string) => !!v || 'Title is required',
    (v: string) => v?.length < 128 || 'You can enter up to 128 characters',
    (v: string) =>
      /^[\w\d\s](?:[-_.]?[\w\d\s])*$/.test(v) ||
      'Title can contain latin letters, numbers, space -_.',
  ],
  descriptionRules: [
    (v: string) => !!v || 'Description is required',
    (v: string) => v?.length < 2048 || 'You can enter up to 2048 characters',
  ],
};
