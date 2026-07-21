"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export function SortSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const current = searchParams.get("sort") ?? "latest";

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sort = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", sort);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="inline-flex items-center space-x-2">
      <label htmlFor="sort" className="text-sm font-medium text-gray-700 dark:text-gray-300">Sort:</label>
      <select
        id="sort"
        className="rounded border bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-primary p-2 appearance-none"
        value={current}
        onChange={handleChange}
      >
        <option value="latest">Latest</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>
    </div>
  );
}
