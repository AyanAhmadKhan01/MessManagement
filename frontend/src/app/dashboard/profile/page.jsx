"use client";

import { Loader } from "lucide-react";
import withAuth from "@/components/withAuth";
import { 
  useProfile, 
  useUpdateProfile, 
  useChangePassword, 
  useUpdateNotifications,
  useUploadProfilePicture 
} from "@/hooks/useProfile";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileInformation } from "@/components/profile/ProfileInformation";
import { SecuritySettings } from "@/components/profile/SecuritySettings";
import { NotificationSettings } from "@/components/profile/NotificationSettings";

function ProfilePage() {
  // TanStack Query hooks
  const { data: user, isLoading, error } = useProfile();
  const updateProfileMutation = useUpdateProfile();
  const changePasswordMutation = useChangePassword();
  const updateNotificationsMutation = useUpdateNotifications();
  const uploadPictureMutation = useUploadProfilePicture();

  // Handler functions
  const handleUpdateProfile = async (profileData) => {
    await updateProfileMutation.mutateAsync(profileData);
  };

  const handleChangePassword = async (passwordData) => {
    await changePasswordMutation.mutateAsync(passwordData);
  };

  const handleUpdateNotifications = async (notificationData) => {
    await updateNotificationsMutation.mutateAsync(notificationData);
  };

  const handleUploadPicture = async (file) => {
    await uploadPictureMutation.mutateAsync(file);
  };

  // Loading state
  if (!isLoading) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center">
        <div className="text-center">
          <Loader className="animate-spin h-12 w-12 text-[#FF0049] mx-auto mb-4" />
          <p className="text-lg text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-red-400 mb-4">Error loading profile</p>
          <p className="text-gray-400">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Header */}
        <ProfileHeader 
          user={user}
          onUploadPicture={handleUploadPicture}
          isUploading={uploadPictureMutation.isPending}
        />

        {/* Profile Information */}
        <ProfileInformation
          user={user}
          onUpdate={handleUpdateProfile}
          isUpdating={updateProfileMutation.isPending}
        />

        {/* Security Settings */}
        <SecuritySettings
          onChangePassword={handleChangePassword}
          isChangingPassword={changePasswordMutation.isPending}
        />

        {/* Notification Settings */}
        <NotificationSettings
          onUpdateNotifications={handleUpdateNotifications}
          isUpdating={updateNotificationsMutation.isPending}
        />
      </div>
    </div>
  );
}

export default withAuth(ProfilePage);
