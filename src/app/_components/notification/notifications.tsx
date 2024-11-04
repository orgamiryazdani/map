"use client";
import { useNotificationStore } from "@/stores/notification.store";
import { NotificationToast } from "./notification-toast";

export const Notifications: React.FC = () => {
  const notifications = useNotificationStore((state) => state.notifications);
  if (notifications.length < 1) return null;

  return (
    <div className="fixed flex flex-col-reverse bottom-3 right-3 gap-3 z-50">
      {notifications.map((p) => {
        return (
          <NotificationToast key={`notification-${p.id}`} notification={p} />
        );
      })}
    </div>
  );
};