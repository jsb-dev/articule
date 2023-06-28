import getAccountByEmail from './get-account-by-email';
import generateUserId from './generate-user-id';

export const fetchAccountData = async (userEmail, apiUrl) => {
  try {
    const data = await getAccountByEmail(userEmail, apiUrl);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getSurveyUrl = async () => {
  try {
    const _id = await generateUserId();
    return `/introduction?_id=${_id}`;
  } catch (error) {
    throw error;
  }
};

export const getDashboardUrl = async (accountData, setAccountData) => {
  setAccountData(accountData);
  return `/dashboard?_id=${accountData._id}`;
};
