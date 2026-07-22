import Form from "next/form";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  placeholder?: string;
  defaultValue?: string;
  className?: string;
}

export function SearchBar({ placeholder = "Search products...", defaultValue = "", className = "" }: SearchBarProps) {
  return (
    <Form action="/products" className={`w-full relative ${className}`}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
      <Input
        type="search"
        name="q"
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full bg-muted border-border pl-9 rounded-full focus-visible:ring-primary/20 h-10 text-sm shadow-inner"
      />
    </Form>
  );
}
