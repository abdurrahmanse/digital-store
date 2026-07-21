interface FilterTabsProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  formatLabel?: (tab: string) => string;
}

export function FilterTabs({ tabs, activeTab, onTabChange, formatLabel }: FilterTabsProps) {
  const defaultFormat = (tab: string) => {
    if (tab === "ALL") return "All";
    return tab.charAt(0) + tab.slice(1).toLowerCase();
  };

  const getLabel = formatLabel || defaultFormat;

  return (
    <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg overflow-x-auto max-w-full">
      {tabs.map((tab) => (
        <button 
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
            activeTab === tab 
              ? "bg-white dark:bg-slate-950 text-slate-900 dark:text-white shadow-sm" 
              : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:text-slate-300"
          }`}
        >
          {getLabel(tab)}
        </button>
      ))}
    </div>
  );
}
