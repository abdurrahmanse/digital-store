import { prisma } from "@/lib/prisma";
import { formatDistanceToNow } from "date-fns";
import { Mail, Check, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { markMessageAsRead, deleteMessage } from "@/features/contact/actions/contact-dashboard";
import { revalidatePath } from "next/cache";

export const metadata = {
  title: "Messages | Dashboard",
};

export default async function ContactsPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Messages</h1>
        <p className="text-muted-foreground">View and manage contact form submissions.</p>
      </div>

      <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 bg-slate-50/50 dark:bg-slate-900/50 uppercase border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Sender</th>
                <th className="px-6 py-4 font-medium">Subject & Message</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {messages.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <Mail className="h-8 w-8 text-slate-400" />
                      <p>No messages found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                messages.map((msg) => (
                  <tr 
                    key={msg.id} 
                    className={`group transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-900/50 ${msg.status === "UNREAD" ? "bg-slate-50 dark:bg-slate-900/20" : ""}`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      {msg.status === "UNREAD" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400"></span>
                          Unread
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                          Read
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-slate-900 dark:text-white">
                          {msg.firstName} {msg.lastName}
                        </span>
                        <a href={`mailto:${msg.email}`} className="text-muted-foreground hover:text-indigo-600 transition-colors">
                          {msg.email}
                        </a>
                      </div>
                    </td>
                    <td className="px-6 py-4 min-w-[300px] max-w-[400px]">
                      <p className="font-medium text-slate-900 dark:text-white mb-1 truncate">{msg.subject}</p>
                      <p className="text-muted-foreground line-clamp-2">{msg.message}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">
                      {formatDistanceToNow(new Date(msg.createdAt), { addSuffix: true })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {msg.status === "UNREAD" && (
                          <form action={async () => {
                            "use server";
                            await markMessageAsRead(msg.id);
                          }}>
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/20" title="Mark as read">
                              <Check className="h-4 w-4" />
                            </Button>
                          </form>
                        )}
                        <form action={async () => {
                          "use server";
                          await deleteMessage(msg.id);
                        }}>
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-900/20" title="Delete message">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
