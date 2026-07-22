"use client";

import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export function HeaderLogout() {
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="text-muted-foreground hover:text-foreground hover:bg-muted rounded-full" 
      title="Logout"
      onClick={() => signOut({ callbackUrl: `${window.location.origin}/login` })}
    >
      <LogOut className="h-5 w-5" />
      <span className="sr-only">Logout</span>
    </Button>
  );
}
