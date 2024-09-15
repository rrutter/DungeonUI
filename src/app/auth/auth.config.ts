import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',  // This matches the discovery document issuer
  clientId: '1003176228232-afv50bp7ju9sut6rjnap1trq5527ai5i.apps.googleusercontent.com',  // Google Client ID
  redirectUri: 'http://localhost:4200',  // Make sure this is correctly configured for your app
  scope: 'openid profile email',  // Request basic profile and email
  responseType: 'token id_token',  // Ensure both token and id_token are returned
  showDebugInformation: true,  // Enable debugging info
  strictDiscoveryDocumentValidation: false,  // Disable strict validation to avoid endpoint mismatch issues
  loginUrl: 'https://accounts.google.com/o/oauth2/v2/auth',  // Google's authorization endpoint
  tokenEndpoint: 'https://oauth2.googleapis.com/token',  // Google's token endpoint
  userinfoEndpoint: 'https://openidconnect.googleapis.com/v1/userinfo'  // Google's userinfo endpoint
};
