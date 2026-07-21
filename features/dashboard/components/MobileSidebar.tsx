"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UnifiedSidebar } from "./UnifiedSidebar";
import { SignOutButton } from "./SignOutButton";

interface MobileSidebarProps {
  role: string;
}

export function MobileSidebar({ role }: MobileSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        className="text-slate-600 dark:text-slate-400"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="w-5 h-5" />
        <span className="sr-only">Open Menu</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm md:hidden">
          <div className="fixed inset-y-0 left-0 w-3/4 max-w-sm bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 shadow-xl flex flex-col animate-in slide-in-from-left duration-200">
            <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200 dark:border-slate-800/50">
              <span className="font-bold tracking-tight text-lg text-slate-900 dark:text-white">
                DigitalStore
              </span>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsOpen(false)}
                className="rounded-full -mr-3"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="flex-1 overflow-auto" onClick={() => setIsOpen(false)}>
              <UnifiedSidebar role={role} />
            </div>

            <div className="p-4 border-t border-slate-200 dark:border-slate-800/50">
              <SignOutButton />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
