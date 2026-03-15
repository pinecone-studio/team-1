import {
  createNotification,
  markNotificationAsRead,
} from "@/db/notifications";

export const notificationMutations = {
  sendNotification: (_: unknown, args: { input: any }) =>
    createNotification(args.input),
  markNotificationAsRead: (_: unknown, args: { id: string }) => {
    markNotificationAsRead(args.id);
    return true;
  },
};
