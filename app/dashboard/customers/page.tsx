import { getAllUsers } from "@/features/admin/queries";
import { UsersTable } from "@/features/admin/components/UsersTable";

export default async function AdminUsersPage() {
  const users = await getAllUsers();

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <UsersTable users={users.data} />
    </div>
  );
}
