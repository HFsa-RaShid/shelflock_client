export interface SecuritySettings {
  twoFactorEnabled: boolean;
  newDeviceLoginAlert: boolean;
  sessionTimeout: boolean;
}

export type ActivityDeviceType = "laptop" | "desktop" | "mobile" | "unknown";

export type ActivityStatus = "this-device" | "active" | "logged-out";

export interface RecentActivity {
  id: string;
  deviceName: string;
  deviceMeta: string;
  deviceType: ActivityDeviceType;
  location: string;
  countryCode: string;
  ipAddress: string;
  lastActive: string;
  lastActiveHighlight?: boolean;
  status: ActivityStatus;
  showActions: boolean;
}

export interface SecurityPageData {
  settings: SecuritySettings;
  activities: RecentActivity[];
}
