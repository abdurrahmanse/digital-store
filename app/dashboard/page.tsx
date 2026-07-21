import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UserDashboard() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 md:space-y-10">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Welcome back, John!</h1>
        <p className="text-slate-500 mt-1">Manage your purchases and account settings.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="border-slate-200 shadow-sm rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold text-slate-500 uppercase tracking-widest">Total Purchases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-slate-900 tracking-tight">3</div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-slate-900 mb-5">Recent Purchases</h2>
        <Card className="border-slate-200 shadow-sm overflow-hidden rounded-2xl">
          <div className="divide-y divide-slate-100">
            {/* Mock Item */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 md:p-6 gap-4 bg-white hover:bg-slate-50/50 transition-colors">
              <div className="flex items-center gap-5">
                <div className="w-20 h-16 bg-slate-100 rounded-lg shrink-0 border border-slate-200"></div>
                <div>
                  <h3 className="font-semibold text-slate-900">SaaS Dashboard UI Kit</h3>
                  <p className="text-sm text-slate-500 mt-0.5">Purchased on Oct 24, 2023</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="bg-white border-slate-200 shadow-sm">
                  <Download className="w-4 h-4 mr-2" /> Download
                </Button>
                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-900">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            {/* Mock Item 2 */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 md:p-6 gap-4 bg-white hover:bg-slate-50/50 transition-colors">
              <div className="flex items-center gap-5">
                <div className="w-20 h-16 bg-slate-100 rounded-lg shrink-0 border border-slate-200"></div>
                <div>
                  <h3 className="font-semibold text-slate-900">Modern Next.js Portfolio</h3>
                  <p className="text-sm text-slate-500 mt-0.5">Purchased on Sep 12, 2023</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="bg-white border-slate-200 shadow-sm">
                  <Download className="w-4 h-4 mr-2" /> Download
                </Button>
                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-900">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
