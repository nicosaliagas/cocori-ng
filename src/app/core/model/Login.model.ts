export enum UserRole {
  None = 0,
  Visitor = 1,
  Moderator = 2,
  Admin = 3,
  SuperAdmin = 99,
}

export interface LoginModel {
  email: string;
  password: string;
}

export interface TokensLoginModel {
  accessToken?: string;
  refreshToken?: string;
}

export interface CheckAccessTokensModel {
  accessToken: string;
}

export interface PasswordModel {
  email: string;
}

export interface VerifyEmailModel {
  token: string;
}

export interface ForgotPasswordModel {
  token: string;
  password: string;
}

export interface UserProfiles {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  city: string;
  age: string;
  hasSubscribedNewsletter: boolean;
  hasAcceptedTermsOfUse: boolean;
  lastDegreeId: string;
  reasonForVisitId: string;
  orientationId: string;
}
