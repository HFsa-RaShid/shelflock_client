// data/usersPermissions.ts

export type Role = "Owner" | "Admin" | "Staff";
export type Status = "Active" | "Pending" | "Inactive";

export interface RoleSummary {
  role: Role;
  count: number;
  description: string;
}

export interface TeamUser {
  id: string;
  name: string;
  subRole: string;
  email: string;
  phone?: string;
  status: Status;
  role: Role;
  lastActive: string;
  avatar?: string;
  initials: string;
  avatarColor: string;
}

export interface PermissionRow {
  feature: string;
  owner: boolean;
  admin: boolean;
  staff: boolean;
}

export interface PermissionGroup {
  group: string;
  rows: PermissionRow[];
}

export const roleSummaries: RoleSummary[] = [
  {
    role: "Owner",
    count: 1,
    description:
      "Full access to billing, settings, team management and all features.",
  },
  {
    role: "Admin",
    count: 1,
    description:
      "Manage orders, products, customers, analytics, offers and courier.",
  },
  {
    role: "Staff",
    count: 6,
    description: "Process orders and access limited features.",
  },
];

export const teamUsers: TeamUser[] = [
  {
    id: "1",
    name: "Abdullah Al Nur",
    subRole: "Owner",
    email: "abdullah@gmail.com",
    status: "Active",
    role: "Owner",
    lastActive: "2 min ago",
    initials: "AN",
    avatarColor: "#f97316",
  },
  {
      id: "2",
      name: "Karim Hasan",
      subRole: "Administrator",
      phone: "01711XXXXXX",
      status: "Active",
      role: "Admin",
      lastActive: "5 min ago",
      initials: "KH",
      avatarColor: "#6366f1",
      email: ""
  },
  {
    id: "3",
    name: "Sanjida Noor",
    subRole: "Staff",
    email: "sanjida@email.com",
    status: "Pending",
    role: "Staff",
    lastActive: "3 days ago",
    initials: "SN",
    avatarColor: "#ec4899",
  },
];

export const permissionGroups: PermissionGroup[] = [
  {
    group: "ORDERS",
    rows: [
      { feature: "View Orders", owner: true, admin: true, staff: true },
      { feature: "Update Order Status", owner: true, admin: true, staff: true },
      { feature: "Cancel Order", owner: true, admin: true, staff: false },
      { feature: "Export Orders", owner: true, admin: true, staff: false },
    ],
  },
  {
    group: "PRODUCTS",
    rows: [
      { feature: "View Products", owner: true, admin: true, staff: false },
      {
        feature: "Add / Edit Products",
        owner: true,
        admin: true,
        staff: false,
      },
      { feature: "Delete Product", owner: true, admin: true, staff: false },
      { feature: "Update Inventory", owner: true, admin: true, staff: false },
      { feature: "Manage Categories", owner: true, admin: true, staff: false },
    ],
  },
  {
    group: "CUSTOMERS",
    rows: [
      { feature: "View Customer List", owner: true, admin: true, staff: false },
      {
        feature: "View Customer Details",
        owner: true,
        admin: true,
        staff: false,
      },
      { feature: "Export Customers", owner: true, admin: true, staff: false },
    ],
  },
  {
    group: "ANALYTICS, OFFERS, DELIVERY",
    rows: [
      { feature: "View Analytics", owner: true, admin: true, staff: false },
      { feature: "Manage Offers", owner: true, admin: true, staff: false },
      {
        feature: "Manage Delivery Zones",
        owner: true,
        admin: true,
        staff: false,
      },
      { feature: "Courier Settings", owner: true, admin: true, staff: false },
    ],
  },
  {
    group: "STORE SETTINGS",
    rows: [
      {
        feature: "Manage Team (Invite/Remove)",
        owner: true,
        admin: true,
        staff: false,
      },
      { feature: "Domain Settings", owner: true, admin: false, staff: false },
      {
        feature: "Subscription / Billing",
        owner: true,
        admin: false,
        staff: false,
      },
      {
        feature: "Delete / Deactivate Store",
        owner: true,
        admin: false,
        staff: false,
      },
    ],
  },
];
