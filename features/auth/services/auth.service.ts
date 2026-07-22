import { 
  registerUser, 
  generateAndSendRegistrationOTP, 
  verifyRegistrationOTP 
} from "./auth.registration.service";

import { loginUser } from "./auth.login.service";

import { 
  generateAndSendOTP, 
  verifyOTPAndResetPassword 
} from "./auth.password.service";

import { updateProfile } from "./auth.profile.service";

export const authService = {
  registerUser,
  generateAndSendRegistrationOTP,
  verifyRegistrationOTP,
  loginUser,
  generateAndSendOTP,
  verifyOTPAndResetPassword,
  updateProfile
};
