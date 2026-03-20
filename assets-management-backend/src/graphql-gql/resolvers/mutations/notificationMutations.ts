import {
  createNotification,
  markNotificationAsRead,
  type CreateNotificationInput,
} from "@/db/notifications";

export const notificationMutations = {
  sendNotification: (_: unknown, args: { input: CreateNotificationInput }) =>
    createNotification(args.input),
  markNotificationAsRead: async (_: unknown, args: { id: string }) => {
    await markNotificationAsRead(args.id);
    return true;
  },
};
