import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { User, Edit3, Save, X, Loader } from "lucide-react";

export function ProfileInformation({ user, onUpdate, isUpdating }) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    dateOfBirth: user?.dateOfBirth || '',
    bio: user?.bio || '',
    emergencyContact: user?.emergencyContact || '',
    emergencyPhone: user?.emergencyPhone || ''
  });

  const handleChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    if (!profileData.name || !profileData.email) {
      return;
    }
    
    await onUpdate(profileData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setProfileData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
      dateOfBirth: user?.dateOfBirth || '',
      bio: user?.bio || '',
      emergencyContact: user?.emergencyContact || '',
      emergencyPhone: user?.emergencyPhone || ''
    });
    setIsEditing(false);
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-[#FF0049]/5 to-[#FF336F]/5 rounded-xl blur-xl" />
      <Card className="relative bg-gradient-to-r from-[#1a1a1a]/90 to-[#2a2a2a]/90 backdrop-blur-xl border-[#ffffff0f]">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-[#FF0049] text-2xl">
              <User className="h-8 w-8" />
              Profile Information
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
              disabled={isUpdating}
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
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-300">Full Name</Label>
                {isEditing ? (
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="bg-[#2a2a2a]/50 border-[#ffffff0f] text-white"
                    required
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
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="bg-[#2a2a2a]/50 border-[#ffffff0f] text-white"
                    required
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
                    onChange={(e) => handleChange('phone', e.target.value)}
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
                    onChange={(e) => handleChange('dateOfBirth', e.target.value)}
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
                  onChange={(e) => handleChange('address', e.target.value)}
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
                  onChange={(e) => handleChange('bio', e.target.value)}
                  placeholder="Tell us about yourself..."
                  className="bg-[#2a2a2a]/50 border-[#ffffff0f] text-white min-h-[100px]"
                />
              ) : (
                <p className="text-white bg-[#2a2a2a]/30 p-3 rounded-md border border-[#ffffff0f] min-h-[100px]">
                  {profileData.bio || 'No bio provided'}
                </p>
              )}
            </div>

            {/* Emergency Contact Section */}
            <div className="pt-6 border-t border-[#ffffff0f]">
              <h5 className="text-lg font-semibold text-white mb-4">Emergency Contact</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="emergencyContact" className="text-gray-300">Contact Name</Label>
                  {isEditing ? (
                    <Input
                      id="emergencyContact"
                      value={profileData.emergencyContact}
                      onChange={(e) => handleChange('emergencyContact', e.target.value)}
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
                      onChange={(e) => handleChange('emergencyPhone', e.target.value)}
                      className="bg-[#2a2a2a]/50 border-[#ffffff0f] text-white"
                    />
                  ) : (
                    <p className="text-white bg-[#2a2a2a]/30 p-3 rounded-md border border-[#ffffff0f]">
                      {profileData.emergencyPhone || 'Not provided'}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="flex gap-4 pt-4">
                <Button
                  onClick={handleSave}
                  disabled={isUpdating || !profileData.name || !profileData.email}
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
                      Save Changes
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isUpdating}
                  className="bg-[#1a1a1a]/50 border-[#ffffff0f] text-white hover:bg-[#2a2a2a]/50"
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
