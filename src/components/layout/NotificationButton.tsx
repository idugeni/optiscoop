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
      <PopoverContent className="w-[320px] p-0 shadow-lg animate-in fade-in-0 zoom-in-95" align="end">
        <div className="px-4 py-3 border-b border-border/40 flex items-center justify-between">
          <h3 className="font-semibold text-base">Notifikasi</h3>
          {unreadCount > 0 && (
            <span className="text-xs text-muted-foreground font-medium">
              {unreadCount} baru
            </span>
          )}
        </div>
        <div className="max-h-[360px] overflow-y-auto scrollbar-thin scrollbar-thumb-accent scrollbar-track-transparent">
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
                      className="p-4 bg-accent/20 cursor-pointer hover:bg-accent/30 transition-colors duration-200 relative group"
                      onClick={() => {
                        const newReadNotifications = [...readNotifications, notification.id];
                        setReadNotifications(newReadNotifications);
                        localStorage.setItem('readNotifications', JSON.stringify(newReadNotifications));
                      }}
                    >
                      <div className="flex justify-between items-start gap-4 mb-2">
                        <h4 className="font-medium text-sm leading-tight group-hover:text-primary transition-colors duration-200">
                          {notification.title}
                        </h4>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {notification.date}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {notification.message}
                      </p>
                      <div className="absolute left-0 top-0 w-1 h-full bg-primary/50 group-hover:bg-primary transition-colors duration-200" />
                    </div>
                  ))
                ) : (
                  <div className="py-8 text-center text-muted-foreground">
                    <span className="block mb-1 text-lg">✨</span>
                    Semua notifikasi telah dibaca
                  </div>
                );
              })()} 
            </div>
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              <span className="block mb-1 text-lg">📭</span>
              Tidak ada notifikasi
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}