export interface ProfileData {
  fullName: string;
  username: string;
  address: string;
  dateOfBirth: string;
  gender: string;
  country: string;
  email: string;
  phone: string;
  avatarUrl: string;
  twoFactorEnabled: boolean;
}

export interface ProfileFormValues {
  fullName: string;
  username: string;
  address: string;
  dateOfBirth: string;
  gender: string;
  country: string;
}
