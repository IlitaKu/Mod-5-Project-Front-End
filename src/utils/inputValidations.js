export const strLength = name => {
  return name.length < 3;
};

export const passwordLenght = password => {
  return password.length < 6;
};

export const emailFormat = email => {
  const validEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return !validEmailRegex.test(email);
};
