let timeout = null;
/**
 * Email check function
 * @param emailString Email strings.
 */
export const validEmail = emailString => {
  const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
  return reg.test(emailString);
};
