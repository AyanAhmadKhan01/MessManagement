import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Camera, Loader } from "lucide-react";

export function ProfileHeader({ user, onUploadPicture, isUploading }) {
  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      onUploadPicture(file);
    }
  };

  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold mb-4 text-[rgba(255,255,255,.6)]">
        My Profile
      </h1>
      <p className="text-gray-400">Manage your personal information and preferences</p>
      
      <div className="flex flex-col items-center space-y-4 mt-8">
        <div className="relative">
          <Avatar className="w-32 h-32 bg-gradient-to-r from-[#FF0049] to-[#FF336F] flex items-center justify-center">
            {user?.profilePicture ? (
              <img 
                src={user.profilePicture} 
                alt="Profile" 
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User className="w-16 h-16 text-white" />
            )}
          </Avatar>
          <div className="absolute bottom-0 right-0">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              id="profile-picture-upload"
              disabled={isUploading}
            />
            <label htmlFor="profile-picture-upload">
              <Button
                as="span"
                size="sm"
                disabled={isUploading}
                className="rounded-full w-10 h-10 bg-[#FF0049] hover:bg-[#FF0049]/80 cursor-pointer"
              >
                {isUploading ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <Camera className="w-4 h-4" />
                )}
              </Button>
            </label>
          </div>
        </div>
        <div className="text-center">
          <h3 className="text-xl font-semibold text-white">{user?.name || 'Loading...'}</h3>
          <p className="text-gray-400">{user?.email || 'Loading...'}</p>
          <Badge className="mt-2" variant="outline">
            {user?.role === 2 ? 'Admin' : 'User'}
          </Badge>
        </div>
      </div>
    </div>
  );
}
