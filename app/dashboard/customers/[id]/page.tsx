import { getUserDetails } from "@/features/admin/queries";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow, format } from "date-fns";
import { Laptop, Smartphone, Globe, Clock, Monitor, User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function CustomerDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getUserDetails(id);

  if (!user) {
    notFound();
  }

  const activeSessions = user.deviceSessions.filter(s => s.isActive).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">Customer Details</h1>
          <p className="text-slate-500 mt-1">Viewing information for {user.name || "Customer"}</p>
        </div>
        <Link href="/dashboard/customers">
          <Button variant="outline">Back to Customers</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Info */}
        <Card className="col-span-1 md:col-span-2 border-slate-200 dark:border-slate-800/60 shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-indigo-500" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-slate-500">Name</p>
                <p className="mt-1 font-semibold text-slate-900 dark:text-slate-100">{user.name || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Email</p>
                <p className="mt-1 font-semibold text-slate-900 dark:text-slate-100">{user.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Registration Date</p>
                <p className="mt-1 font-semibold text-slate-900 dark:text-slate-100">
                  {format(new Date(user.createdAt), "MMM d, yyyy")}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Role</p>
                <Badge variant={user.role === "ADMIN" ? "default" : "secondary"} className="mt-1">
                  {user.role}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activity Summary */}
        <Card className="col-span-1 border-slate-200 dark:border-slate-800/60 shadow-none">
          <CardHeader>
            <CardTitle>Activity Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500">Total Orders</span>
              <span className="font-bold text-lg">{user._count.orders}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-500">Active Sessions</span>
              <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800">
                {activeSessions} {activeSessions === 1 ? 'Device' : 'Devices'}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Device Sessions */}
      <Card className="border-slate-200 dark:border-slate-800/60 shadow-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="h-5 w-5 text-indigo-500" />
            Login History & Devices
          </CardTitle>
        </CardHeader>
        <CardContent>
          {user.deviceSessions.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              No session history available.
            </div>
          ) : (
            <div className="space-y-4">
              {user.deviceSessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-4 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                    
                    <div className="flex items-center gap-2 w-32">
                      {session.os?.toLowerCase().includes("ios") || session.os?.toLowerCase().includes("android") ? (
                        <Smartphone className="h-4 w-4 text-slate-400" />
                      ) : (
                        <Laptop className="h-4 w-4 text-slate-400" />
                      )}
                      <div>
                        <p className="text-sm font-medium">{session.browser || "Unknown Browser"}</p>
                        <p className="text-xs text-slate-500">{session.os || "Unknown OS"}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-48">
                      <Globe className="h-4 w-4 text-slate-400" />
                      <div>
                        <p className="text-sm">{session.ipAddress}</p>
                        <p className="text-xs text-slate-500">
                          {session.city && session.region 
                            ? `${session.city}, ${session.region} (${session.country})`
                            : session.country || "Unknown Location"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-slate-400" />
                      <div>
                        <p className="text-sm">{format(new Date(session.lastLogin), "MMM d, h:mm a")}</p>
                        <p className="text-xs text-slate-500">{formatDistanceToNow(new Date(session.lastLogin))} ago</p>
                      </div>
                    </div>

                  </div>
                  
                  <div>
                    {session.isActive ? (
                      <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-200">Active</Badge>
                    ) : (
                      <Badge variant="outline" className="text-slate-500">Inactive</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
