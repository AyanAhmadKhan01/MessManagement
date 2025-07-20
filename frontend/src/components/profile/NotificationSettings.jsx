import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Save, Loader } from "lucide-react";

export function NotificationSettings({ onUpdateNotifications, isUpdating }) {
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    menuUpdates: true,
    planReminders: true,
    attendanceReminders: true
  });

  const handleNotificationChange = (field, value) => {
    setNotifications(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    onUpdateNotifications(notifications);
  };

  const notificationLabels = {
    emailNotifications: {
      title: 'Email Notifications',
      description: 'Receive updates via email'
    },
    smsNotifications: {
      title: 'SMS Notifications',
      description: 'Receive SMS notifications'
    },
    menuUpdates: {
      title: 'Menu Updates',
      description: 'Daily menu notifications'
    },
    planReminders: {
      title: 'Plan Reminders',
      description: 'Plan expiry reminders'
    },
    attendanceReminders: {
      title: 'Attendance Reminders',
      description: 'Attendance reminders'
    }
  };

  return (
    <Card className="bg-[rgba(255,255,255,.04)] border-[rgba(255,255,255,.09)] backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-[#FF0049]">
          <Bell className="h-6 w-6" />
          Notification Preferences
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-3 bg-[#2a2a2a]/30 rounded-lg border border-[#ffffff0f]">
                <div>
                  <p className="text-white font-medium">
                    {notificationLabels[key]?.title}
                  </p>
                  <p className="text-sm text-gray-400">
                    {notificationLabels[key]?.description}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => handleNotificationChange(key, e.target.checked)}
                    className="sr-only peer"
                    disabled={isUpdating}
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF0049]"></div>
                </label>
              </div>
            ))}
          </div>
          <Button
            onClick={handleSave}
            disabled={isUpdating}
            className="bg-[#FF0049] hover:bg-[#FF0049]/80 text-white"
          >
            {isUpdating ? (
              <>
                <Loader className="animate-spin h-4 w-4 mr-2" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Preferences
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
