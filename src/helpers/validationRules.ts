export default {
  nicknameRules: [
    (v: string) => !!v || 'Nickname is required',
    (v: string) =>
      /^[a-z0-9](?:[-_.]?[a-z0-9])*$/.test(v) ||
      'Nickname can contain lowercase letters, numbers, -_.',
  ],
  emailRules: [
    (v: string) => !!v || 'Email is required',
    (v: string) =>
      /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/.test(v) ||
      'Invalid email. The email must be valid! Example: some_email-1990@work.old.com',
  ],
  passwordRules: [
    (v: string) => !!v || 'Password is required',
    (v: string) =>
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(v) ||
      'Invalid password. The password must consist of uppercase and lowercase Latin letters and be at least 8 characters long!',
  ],
  dayTimerRules: [(v: number) => v > 0 || 'Enter a positive number'],
  description: [
    (v: string) =>
      v.length < 2048 || '\n' + 'You can enter up to 2048 characters',
  ],
};