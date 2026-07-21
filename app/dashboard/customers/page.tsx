import { getAllUsers } from "@/features/admin/queries";
import { UsersTable } from "@/features/admin/components/UsersTable";

export default async function AdminUsersPage({
  searchParams
}: {
  searchParams: { page?: string }
}) {
  const page = parseInt(searchParams.page || "1", 10);
  const users = await getAllUsers({ page, limit: 10 });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <UsersTable 
        users={users.data} 
        currentPage={users.currentPage}
        totalPages={users.totalPages}
      />
    </div>
  );
}
