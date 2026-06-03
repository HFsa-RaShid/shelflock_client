export type NotificationChannel = "sms" | "email" | "push";

export interface NotificationChannelPreferences {
  sms: boolean;
  email: boolean;
  push: boolean;
}

export interface NotificationPreferenceItem {
  id: string;
  title: string;
  description: string;
  icon: "new-order" | "order-cancelled" | "low-stock" | "payment" | "subscription" | "marketing";
  channels: NotificationChannelPreferences;
}

export interface NotificationPreferencesData {
  items: NotificationPreferenceItem[];
}

export interface UpdateNotificationPreferencePayload {
  id: string;
  channel: NotificationChannel;
  enabled: boolean;
}
