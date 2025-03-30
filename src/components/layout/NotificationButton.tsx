"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { notifications } from "@/data/notifications/notifications";

export function NotificationButton() {
  const [unreadCount, setUnreadCount] = useState(0);
  const [readNotifications, setReadNotifications] = useState<number[]>([]);

  useEffect(() => {
    // Load read notifications from localStorage (only once on mount)
    const storedReadNotifications = localStorage.getItem('readNotifications');
    if (storedReadNotifications) {
      setReadNotifications(JSON.parse(storedReadNotifications));
    }
  }, []); // Empty dependency array means this runs once on mount

  useEffect(() => {
    // Update unread count whenever readNotifications changes
    const count = notifications.filter(
      (notification) => !readNotifications.includes(notification.id)
    ).length;
    setUnreadCount(count);
  }, [readNotifications]); // Only run when readNotifications changes

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-full hover:bg-accent/50 transition-colors focus:outline-none focus-visible:outline-none focus:ring-0"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
              {unreadCount}
            </span>
          )}
          <span className="sr-only">Notifikasi</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4 border-b border-border/40">
          <h3 className="font-semibold">Notifikasi</h3>
        </div>
        <div className="max-h-[300px] overflow-y-auto">
          {notifications.length > 0 ? (
            <div className="divide-y divide-border/40">
              {(() => {
                const unreadNotifications = notifications.filter(
                  (notification) => !readNotifications.includes(notification.id)
                );
                return unreadNotifications.length > 0 ? (
                  unreadNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="p-4 bg-accent/30 cursor-pointer hover:bg-accent/50"
                      onClick={() => {
                        const newReadNotifications = [...readNotifications, notification.id];
                        setReadNotifications(newReadNotifications);
                        localStorage.setItem('readNotifications', JSON.stringify(newReadNotifications));
                      }}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-medium text-sm">{notification.title}</h4>
                        <span className="text-xs text-muted-foreground">
                          {notification.date}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {notification.message}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-muted-foreground">
                    Kosong
                  </div>
                );
              })()} 
            </div>
          ) : (
            <div className="p-4 text-center text-muted-foreground">
              Tidak ada notifikasi
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}