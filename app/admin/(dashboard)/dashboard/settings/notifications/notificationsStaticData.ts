import type { NotificationPreferencesData } from "./notifications.types";

export const NOTIFICATIONS_STATIC_DATA: NotificationPreferencesData = {
  items: [
    {
      id: "new-order",
      title: "New Order",
      description: "Get notified when a new order is placed",
      icon: "new-order",
      channels: { sms: true, email: true, push: false },
    },
    {
      id: "order-cancelled",
      title: "Order Cancelled",
      description: "Get notified when an order is cancelled",
      icon: "order-cancelled",
      channels: { sms: false, email: true, push: true },
    },
    {
      id: "low-stock",
      title: "Low Stock Alert",
      description: "Get notified when a product goes below stock threshold.",
      icon: "low-stock",
      channels: { sms: true, email: false, push: false },
    },
    {
      id: "payment",
      title: "Payment Confirmation",
      description: "Get notified for bKash/Nagad payment confirmation.",
      icon: "payment",
      channels: { sms: true, email: false, push: true },
    },
    {
      id: "subscription",
      title: "Subscription Renewal",
      description: "Get notified before your subscription expires.",
      icon: "subscription",
      channels: { sms: true, email: true, push: false },
    },
    {
      id: "marketing",
      title: "Marketing & Updates",
      description: "Receive news, tips and important updates.",
      icon: "marketing",
      channels: { sms: true, email: false, push: true },
    },
  ],
};
