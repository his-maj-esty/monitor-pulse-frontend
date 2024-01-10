import { Website, timeStats } from "@/typings";
import exp from "constants";
import { atom } from "recoil";

export const WebsiteState = atom<({ stats: timeStats[] } & Website) | null>({
  key: "websiteState",
  default: null,
});

export const StatsState = atom<{
  label: StatsLabel;
  stats: timeStats[];
} | null>({
  key: "statsState",
  default: null,
});

export const UpVsDownState = atom<{ uptime: number; downtime: number }>({
  key: "udstate",
  default: {
    uptime: 0,
    downtime: 0,
  },
});


export const isSubscribedState = atom<boolean>({
  key: "isSubscribed",
  default: undefined,
});

export const NotificationState = atom<Notification[] | []>({
  key: "notificationState",
  default: []
  
})

export enum StatsLabel {
  yearly,
  monthly,
  today,
  yesterday,
}
