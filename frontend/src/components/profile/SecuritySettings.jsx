import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Shield, Key, Eye, EyeOff, Loader } from "lucide-react";

export function SecuritySettings({ onChangePassword, isChangingPassword }) {
  const [showPasswordSection, setShowPasswordSection] = useState(false);
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

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSubmit = async () => {
    await onChangePassword(passwordData);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setShowPasswordSection(false);
  };

  const isFormValid = passwordData.currentPassword && 
                     passwordData.newPassword && 
                     passwordData.confirmPassword;

  return (
    <Card className="bg-[rgba(255,255,255,.04)] border-[rgba(255,255,255,.09)] backdrop-blur-xl">
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
                    disabled={isChangingPassword}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0 hover:bg-transparent"
                    onClick={() => togglePasswordVisibility('current')}
                    disabled={isChangingPassword}
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
                    disabled={isChangingPassword}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0 hover:bg-transparent"
                    onClick={() => togglePasswordVisibility('new')}
                    disabled={isChangingPassword}
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
                    disabled={isChangingPassword}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0 hover:bg-transparent"
                    onClick={() => togglePasswordVisibility('confirm')}
                    disabled={isChangingPassword}
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
                onClick={handleSubmit}
                disabled={isChangingPassword || !isFormValid}
                className="bg-[#FF0049] hover:bg-[#FF0049]/80 text-white"
              >
                {isChangingPassword ? (
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
    </Card>
  );
}
