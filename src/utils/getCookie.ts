export const getCookie = (name: string): string => {
  const value = `; ${document.cookie}`;
  const [, cookie] = value.split(`; ${name}=`);

  if (cookie) return cookie.split(';')[0];

  return '';
};
