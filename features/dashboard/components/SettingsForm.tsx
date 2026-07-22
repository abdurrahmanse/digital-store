"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface SettingsFormProps {
  user: {
    name: string | null;
    email: string;
  };
}

export function SettingsForm({ user }: SettingsFormProps) {
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const password = formData.get("password") as string;
    
    try {
      const response = await fetch("/api/users/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password })
      });
      
      const result = await response.json();

      if (!response.ok) {
        toast.error(result.error || "Failed to update profile");
      } else {
        toast.success("Profile updated successfully");
        const passwordInput = document.getElementById("password") as HTMLInputElement;
        if (passwordInput) {
          passwordInput.value = "";
        }
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Profile Section */}
      <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
        <div className="border-b border-slate-100 dark:border-slate-800 px-6 py-4">
          <h2 className="text-base font-semibold text-slate-900 dark:text-white">Profile Details</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage your public profile information.</p>
        </div>
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-700 dark:text-slate-300">Email Address</Label>
            <Input 
              id="email" 
              name="email" 
              type="email" 
              defaultValue={user.email} 
              disabled 
              className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400"
            />
            <p className="text-xs text-slate-500 dark:text-slate-400">Your email address is used for login and cannot be changed.</p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-700 dark:text-slate-300">Display Name</Label>
            <Input 
              id="name" 
              name="name" 
              type="text" 
              defaultValue={user.name || ""} 
              placeholder="Enter your name"
              className="border-slate-200 dark:border-slate-800 focus-visible:ring-slate-400"
            />
          </div>
        </div>
      </div>

      {/* Security Section */}
      <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
        <div className="border-b border-slate-100 dark:border-slate-800 px-6 py-4">
          <h2 className="text-base font-semibold text-slate-900 dark:text-white">Security</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Update your password to keep your account secure.</p>
        </div>
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-700 dark:text-slate-300">New Password</Label>
            <Input 
              id="password" 
              name="password" 
              type="password" 
              placeholder="Leave blank to keep current password"
              className="border-slate-200 dark:border-slate-800 focus-visible:ring-slate-400"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button 
          type="submit" 
          disabled={isPending}
          className="bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-200 dark:text-slate-900 rounded-full px-8"
        >
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
