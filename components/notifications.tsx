"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, X, Check, AlertCircle, Heart, Calendar, DollarSign } from "lucide-react"
import { cn } from "@/lib/utils"

interface Notification {
  id: string
  type: "donation" | "volunteer" | "event" | "system"
  title: string
  message: string
  timestamp: Date
  read: boolean
  urgent?: boolean
}

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "donation",
      title: "New Donation Received",
      message: "$250 donation from John Smith for Clean Water Initiative",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: false,
    },
    {
      id: "2",
      type: "volunteer",
      title: "Volunteer Application",
      message: "Sarah Johnson applied for Beach Cleanup event",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      read: false,
      urgent: true,
    },
    {
      id: "3",
      type: "event",
      title: "Event Milestone",
      message: "Community Garden project reached 50 volunteers",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      read: true,
    },
  ])

  const [isOpen, setIsOpen] = useState(false)
  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "donation":
        return <DollarSign className="h-4 w-4" />
      case "volunteer":
        return <Heart className="h-4 w-4" />
      case "event":
        return <Calendar className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const getIconColor = (type: string) => {
    switch (type) {
      case "donation":
        return "text-nature-600"
      case "volunteer":
        return "text-sunny-600"
      case "event":
        return "text-mint-600"
      default:
        return "text-nature-600"
    }
  }

  return (
    <div className="relative">
      <Button variant="ghost" size="sm" className="relative text-nature-600" onClick={() => setIsOpen(!isOpen)}>
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-sunny-600 text-xs">
            {unreadCount}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-96 z-50">
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-nature-800">Notifications</CardTitle>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-nature-600">
                      <Check className="h-4 w-4 mr-1" />
                      Mark all read
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="text-nature-600">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardDescription>Stay updated with the latest activities</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-96 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={cn(
                        "p-4 border-b border-nature-100 hover:bg-nature-50 transition-colors",
                        !notification.read && "bg-nature-25",
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={cn(
                            "h-8 w-8 rounded-full flex items-center justify-center",
                            notification.type === "donation" && "bg-nature-100",
                            notification.type === "volunteer" && "bg-sunny-100",
                            notification.type === "event" && "bg-mint-100",
                            notification.type === "system" && "bg-nature-100",
                          )}
                        >
                          <span className={getIconColor(notification.type)}>{getIcon(notification.type)}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-sm font-medium text-nature-800 truncate">{notification.title}</h4>
                            {notification.urgent && (
                              <Badge variant="destructive" className="text-xs">
                                Urgent
                              </Badge>
                            )}
                            {!notification.read && <div className="h-2 w-2 rounded-full bg-nature-600"></div>}
                          </div>
                          <p className="text-sm text-nature-600 mb-2">{notification.message}</p>
                          <p className="text-xs text-nature-500">
                            {notification.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                              className="h-6 w-6 p-0 text-nature-600"
                            >
                              <Check className="h-3 w-3" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeNotification(notification.id)}
                            className="h-6 w-6 p-0 text-nature-600"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-nature-600">
                    <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No notifications</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
