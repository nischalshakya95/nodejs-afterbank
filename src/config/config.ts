import dotenv from 'dotenv';

dotenv.config();

export const config = {
  app: {
    name: process.env.NAME || 'Server',
    port: process.env.PORT || 8080,
    host: process.env.HOST || '0.0.0.0'
  },
  afterBank: {
    baseUrl: process.env.AFTERBANK_BASEURL,
    serviceKey: process.env.SERVICE_KEY,
    service: process.env.SERVICE,
    grantType: process.env.GRANT_TYPE,
    validUntil: process.env.VALID_UNTIL,
    consentCallBackUrl: process.env.CONSENT_CALL_BACK
  }
};
