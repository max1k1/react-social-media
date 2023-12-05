import { instance } from './api.ts';

export type CaptchaResponseType = {
  url: string;
};

export const securityAPI = {
  getCaptchaUrl() {
    return instance.get<CaptchaResponseType>(`security/get-captcha-url`).then((res) => res.data);
  },
};
