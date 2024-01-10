import exp from "constants";

export interface Website {
  id?: string;
  name: string;
  url: string;
  email: string;
}

export interface timeStats {
  timestamp: Date;
  status: number;
  ownerNotified: boolean;
}

export interface Notification{
  type: string,
  sentAt: Date,
  downtimeAt: string
}