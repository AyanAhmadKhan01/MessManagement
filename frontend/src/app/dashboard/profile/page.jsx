"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Edit3, 
  Save, 
  X, 
  Camera,
  Shield,
  Key,
  Bell,
  Settings,
  Loader,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff
} from "lucide-react";
import withAuth from "@/components/withAuth";
import { useEffect, useState } from "react";
import { authService } from "@/utils/authService";
import { BASE } from "@/utils/baseURL";
import { toast } from 'react-toastify';

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    bio: '',
    emergencyContact: '',
    emergencyPhone: ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    menuUpdates: true,
    planReminders: true,
    attendanceReminders: true
  });

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      setProfileData({
        name: currentUser.name || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
        address: currentUser.address || '',
        dateOfBirth: currentUser.dateOfBirth || '',
        bio: currentUser.bio || '',
        emergencyContact: currentUser.emergencyContact || '',
        emergencyPhone: currentUser.emergencyPhone || ''
      });
    }
    setLoading(false);
  }, []);

  const handleProfileChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationChange = (field, value) => {
    setNotifications(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const saveProfile = async () => {
    setSaving(true);
    try {

      if (!profileData.name || !profileData.email) {
        toast.error("Name and email are required", {
          position: "top-right",
          autoClose: 3000,
          style: {
            background: 'rgba(15, 15, 15, 0.9)',
            border: '1px solid rgba(255, 0, 73, 0.3)',
            color: '#ffffff',
            backdropFilter: 'blur(10px)',
          },
        });
        return;
      }

      await new Promise(resolve => setTimeout(resolve, 1000));

      const updatedUser = { ...user, ...profileData };
      authService.updateCurrentUser(updatedUser);
      setUser(updatedUser);

      toast.success("Profile updated successfully!", {
        position: "top-right",
        autoClose: 3000,
        style: {
          background: 'rgba(15, 15, 15, 0.9)',
          border: '1px solid rgba(255, 0, 73, 0.3)',
          color: '#ffffff',
          backdropFilter: 'blur(10px)',
        },
      });

      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update profile", {
        position: "top-right",
        autoClose: 3000,
        style: {
          background: 'rgba(15, 15, 15, 0.9)',
          border: '1px solid rgba(255, 0, 73, 0.3)',
          color: '#ffffff',
          backdropFilter: 'blur(10px)',
        },
      });
    } finally {
      setSaving(false);
    }
  };

  const changePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords don't match", {
        position: "top-right",
        autoClose: 3000,
        style: {
          background: 'rgba(15, 15, 15, 0.9)',
          border: '1px solid rgba(255, 0, 73, 0.3)',
          color: '#ffffff',
          backdropFilter: 'blur(10px)',
        },
      });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters", {
        position: "top-right",
        autoClose: 3000,
        style: {
          background: 'rgba(15, 15, 15, 0.9)',
          border: '1px solid rgba(255, 0, 73, 0.3)',
          color: '#ffffff',
          backdropFilter: 'blur(10px)',
        },
      });
      return;
    }

    setSaving(true);
    try {

      await new Promise(resolve => setTimeout(resolve, 1000));

      toast.success("Password changed successfully!", {
        position: "top-right",
        autoClose: 3000,
        style: {
          background: 'rgba(15, 15, 15, 0.9)',
          border: '1px solid rgba(255, 0, 73, 0.3)',
          color: '#ffffff',
          backdropFilter: 'blur(10px)',
        },
      });

      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setShowPasswordSection(false);
    } catch (error) {
      toast.error("Failed to change password", {
        position: "top-right",
        autoClose: 3000,
        style: {
          background: 'rgba(15, 15, 15, 0.9)',
          border: '1px solid rgba(255, 0, 73, 0.3)',
          color: '#ffffff',
          backdropFilter: 'blur(10px)',
        },
      });
    } finally {
      setSaving(false);
    }
  };

  const saveNotifications = async () => {
    setSaving(true);
    try {

      await new Promise(resolve => setTimeout(resolve, 500));

      toast.success("Notification preferences saved!", {
        position: "top-right",
        autoClose: 3000,
        style: {
          background: 'rgba(15, 15, 15, 0.9)',
          border: '1px solid rgba(255, 0, 73, 0.3)',
          color: '#ffffff',
          backdropFilter: 'blur(10px)',
        },
      });
    } catch (error) {
      toast.error("Failed to save preferences", {
        position: "top-right",
        autoClose: 3000,
        style: {
          background: 'rgba(15, 15, 15, 0.9)',
          border: '1px solid rgba(255, 0, 73, 0.3)',
          color: '#ffffff',
          backdropFilter: 'blur(10px)',
        },
      });
    } finally {
      setSaving(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center">
        <div className="text-center">
          <Loader className="animate-spin h-12 w-12 text-[#FF0049] mx-auto mb-4" />
          <p className="text-lg text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white p-6">
      <div className="max-w-4xl mx-auto space-y-8"><div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-[rgba(255,255,255,.6)]">
            My Profile
          </h1>
          <p className="text-gray-400">Manage your personal information and preferences</p>
        </div><div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#FF0049]/5 to-[#FF336F]/5 rounded-xl blur-xl" />
          <Card className="relative bg-gradient-to-r from-[#1a1a1a]/90 to-[#2a2a2a]/90 backdrop-blur-xl border-[#ffffff0f]">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-[#FF0049] text-2xl">
                <User className="h-8 w-8" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-8"><div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <Avatar className="w-32 h-32 bg-gradient-to-r from-[#FF0049] to-[#FF336F] flex items-center justify-center">
                      <User className="w-16 h-16 text-white" />
                    </Avatar>
                    <Button
                      size="sm"
                      className="absolute bottom-0 right-0 rounded-full w-10 h-10 bg-[#FF0049] hover:bg-[#FF0049]/80"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-white">{user?.name}</h3>
                    <p className="text-gray-400">{user?.email}</p>
                    <Badge className="mt-2" variant="outline">
                      {user?.role === 2 ? 'Admin' : 'User'}
                    </Badge>
                  </div>
                </div><div className="flex-1 space-y-6">
                  <div className="flex justify-between items-center">
                    <h4 className="text-lg font-semibold text-white">Personal Details</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(!isEditing)}
                      className="bg-[#1a1a1a]/50 border-[#ffffff0f] text-white hover:bg-[#2a2a2a]/50"
                    >
                      {isEditing ? (
                        <>
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </>
                      ) : (
                        <>
                          <Edit3 className="w-4 h-4 mr-2" />
                          Edit
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-300">Full Name</Label>
                      {isEditing ? (
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) => handleProfileChange('name', e.target.value)}
                          className="bg-[#2a2a2a]/50 border-[#ffffff0f] text-white"
                        />
                      ) : (
                        <p className="text-white bg-[#2a2a2a]/30 p-3 rounded-md border border-[#ffffff0f]">
                          {profileData.name || 'Not provided'}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-300">Email Address</Label>
                      {isEditing ? (
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => handleProfileChange('email', e.target.value)}
                          className="bg-[#2a2a2a]/50 border-[#ffffff0f] text-white"
                        />
                      ) : (
                        <p className="text-white bg-[#2a2a2a]/30 p-3 rounded-md border border-[#ffffff0f]">
                          {profileData.email || 'Not provided'}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-gray-300">Phone Number</Label>
                      {isEditing ? (
                        <Input
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) => handleProfileChange('phone', e.target.value)}
                          className="bg-[#2a2a2a]/50 border-[#ffffff0f] text-white"
                        />
                      ) : (
                        <p className="text-white bg-[#2a2a2a]/30 p-3 rounded-md border border-[#ffffff0f]">
                          {profileData.phone || 'Not provided'}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth" className="text-gray-300">Date of Birth</Label>
                      {isEditing ? (
                        <Input
                          id="dateOfBirth"
                          type="date"
                          value={profileData.dateOfBirth}
                          onChange={(e) => handleProfileChange('dateOfBirth', e.target.value)}
                          className="bg-[#2a2a2a]/50 border-[#ffffff0f] text-white"
                        />
                      ) : (
                        <p className="text-white bg-[#2a2a2a]/30 p-3 rounded-md border border-[#ffffff0f]">
                          {profileData.dateOfBirth || 'Not provided'}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-gray-300">Address</Label>
                    {isEditing ? (
                      <Textarea
                        id="address"
                        value={profileData.address}
                        onChange={(e) => handleProfileChange('address', e.target.value)}
                        className="bg-[#2a2a2a]/50 border-[#ffffff0f] text-white min-h-[80px]"
                      />
                    ) : (
                      <p className="text-white bg-[#2a2a2a]/30 p-3 rounded-md border border-[#ffffff0f] min-h-[80px]">
                        {profileData.address || 'Not provided'}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio" className="text-gray-300">Bio</Label>
                    {isEditing ? (
                      <Textarea
                        id="bio"
                        value={profileData.bio}
                        onChange={(e) => handleProfileChange('bio', e.target.value)}
                        placeholder="Tell us about yourself..."
                        className="bg-[#2a2a2a]/50 border-[#ffffff0f] text-white min-h-[100px]"
                      />
                    ) : (
                      <p className="text-white bg-[#2a2a2a]/30 p-3 rounded-md border border-[#ffffff0f] min-h-[100px]">
                        {profileData.bio || 'No bio provided'}
                      </p>
                    )}
                  </div>

                  {isEditing && (
                    <div className="flex gap-4 pt-4">
                      <Button
                        onClick={saveProfile}
                        disabled={saving}
                        className="bg-[#FF0049] hover:bg-[#FF0049]/80 text-white"
                      >
                        {saving ? (
                          <>
                            <Loader className="animate-spin h-4 w-4 mr-2" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div><Card className="bg-[rgba(255,255,255,.04)] border-[rgba(255,255,255,.09)] backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-[#FF0049]">
              <Phone className="h-6 w-6" />
              Emergency Contact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="emergencyContact" className="text-gray-300">Contact Name</Label>
                {isEditing ? (
                  <Input
                    id="emergencyContact"
                    value={profileData.emergencyContact}
                    onChange={(e) => handleProfileChange('emergencyContact', e.target.value)}
                    className="bg-[#2a2a2a]/50 border-[#ffffff0f] text-white"
                  />
                ) : (
                  <p className="text-white bg-[#2a2a2a]/30 p-3 rounded-md border border-[#ffffff0f]">
                    {profileData.emergencyContact || 'Not provided'}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyPhone" className="text-gray-300">Contact Phone</Label>
                {isEditing ? (
                  <Input
                    id="emergencyPhone"
                    value={profileData.emergencyPhone}
                    onChange={(e) => handleProfileChange('emergencyPhone', e.target.value)}
                    className="bg-[#2a2a2a]/50 border-[#ffffff0f] text-white"
                  />
                ) : (
                  <p className="text-white bg-[#2a2a2a]/30 p-3 rounded-md border border-[#ffffff0f]">
                    {profileData.emergencyPhone || 'Not provided'}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card><Card className="bg-[rgba(255,255,255,.04)] border-[rgba(255,255,255,.09)] backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-[#FF0049]">
              <Shield className="h-6 w-6" />
              Security Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button
                variant="outline"
                onClick={() => setShowPasswordSection(!showPasswordSection)}
                className="bg-[#1a1a1a]/50 border-[#ffffff0f] text-white hover:bg-[#2a2a2a]/50"
              >
                <Key className="w-4 h-4 mr-2" />
                Change Password
              </Button>

              {showPasswordSection && (
                <div className="space-y-4 p-4 bg-[#2a2a2a]/30 rounded-lg border border-[#ffffff0f]">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword" className="text-gray-300">Current Password</Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={showPasswords.current ? "text" : "password"}
                        value={passwordData.currentPassword}
                        onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                        className="bg-[#2a2a2a]/50 border-[#ffffff0f] text-white pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0 hover:bg-transparent"
                        onClick={() => togglePasswordVisibility('current')}
                      >
                        {showPasswords.current ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword" className="text-gray-300">New Password</Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showPasswords.new ? "text" : "password"}
                        value={passwordData.newPassword}
                        onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                        className="bg-[#2a2a2a]/50 border-[#ffffff0f] text-white pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0 hover:bg-transparent"
                        onClick={() => togglePasswordVisibility('new')}
                      >
                        {showPasswords.new ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-gray-300">Confirm New Password</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showPasswords.confirm ? "text" : "password"}
                        value={passwordData.confirmPassword}
                        onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                        className="bg-[#2a2a2a]/50 border-[#ffffff0f] text-white pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0 hover:bg-transparent"
                        onClick={() => togglePasswordVisibility('confirm')}
                      >
                        {showPasswords.confirm ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <Button
                    onClick={changePassword}
                    disabled={saving || !passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                    className="bg-[#FF0049] hover:bg-[#FF0049]/80 text-white"
                  >
                    {saving ? (
                      <>
                        <Loader className="animate-spin h-4 w-4 mr-2" />
                        Changing...
                      </>
                    ) : (
                      'Change Password'
                    )}
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card><Card className="bg-[rgba(255,255,255,.04)] border-[rgba(255,255,255,.09)] backdrop-blur-xl">
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
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </p>
                      <p className="text-sm text-gray-400">
                        {key === 'emailNotifications' && 'Receive updates via email'}
                        {key === 'smsNotifications' && 'Receive SMS notifications'}
                        {key === 'menuUpdates' && 'Daily menu notifications'}
                        {key === 'planReminders' && 'Plan expiry reminders'}
                        {key === 'attendanceReminders' && 'Attendance reminders'}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => handleNotificationChange(key, e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF0049]"></div>
                    </label>
                  </div>
                ))}
              </div>
              <Button
                onClick={saveNotifications}
                disabled={saving}
                className="bg-[#FF0049] hover:bg-[#FF0049]/80 text-white"
              >
                {saving ? (
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
      </div>
    </div>
  );
}

export default withAuth(ProfilePage);
