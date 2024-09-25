import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  clientId: '1003176228232-afv50bp7ju9sut6rjnap1trq5527ai5i.apps.googleusercontent.com',
  redirectUri: window.location.origin, // or specify the route if needed
  scope: 'openid profile email',
  responseType: 'token id_token',
  showDebugInformation: true,
  oidc: true,
  useSilentRefresh: true,
  silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
  strictDiscoveryDocumentValidation: false, // Set to true for production
};
