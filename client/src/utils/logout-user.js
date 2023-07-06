import Cookies from 'js-cookie';

const logoutUser = (logout, setAccountData, returnTo) => {
  localStorage.removeItem('diagram');
  Cookies.remove('accountData');
  logout({ returnTo });
  setAccountData(null);
};

export default logoutUser;
