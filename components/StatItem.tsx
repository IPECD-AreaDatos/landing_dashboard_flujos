// components/StatItem.tsx
interface StatItemProps {
  label: string;
  value: string;
  subValue?: string; // Para porcentajes o variaciones
  isPositive?: boolean;
}

export const StatItem = ({ label, value, subValue, isPositive }: StatItemProps) => {
  return (
    <div className="flex flex-col items-end">
      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">
        {label}
      </span>
      <div className="flex items-baseline gap-2">
        <span className="text-lg font-bold text-gray-800 tabular-nums tracking-tight">
          {value}
        </span>
        {subValue && (
          <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${
            isPositive === undefined 
              ? 'text-gray-500 bg-gray-100' // Neutro
              : isPositive 
                ? 'text-emerald-700 bg-emerald-50' // Positivo
                : 'text-red-700 bg-red-50' // Negativo
          }`}>
            {subValue}
          </span>
        )}
      </div>
    </div>
  );
};