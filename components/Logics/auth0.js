import Auth0 from 'react-native-auth0';

const AUTH0_DOMAIN = 'redion32.auth0.com';
const CLIENT_ID = 'hmmreMzqv8pId9ehY0m9ZrFIIcd81xim';

const auth0 = new Auth0({
  domain: `${AUTH0_DOMAIN}`,
  clientId: `${CLIENT_ID}` 
});

export {
  auth0,
  AUTH0_DOMAIN,
  CLIENT_ID
};