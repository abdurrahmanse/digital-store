"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button 
      onClick={() => signOut({ callbackUrl: "/" })}
      className="flex w-full items-center gap-3 px-3 py-2 text-slate-400 hover:bg-red-500/10 hover:text-red-500 rounded-lg font-medium transition-colors"
    >
      <LogOut className="w-5 h-5" /> Sign Out
    </button>
  );
}
