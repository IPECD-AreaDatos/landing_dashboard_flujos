// components/StatItem.tsx
interface StatItemProps {
  label: string;
  value: string;
  subValue?: string; // Para porcentajes o variaciones
  isPositive?: boolean;
}

export const StatItem = ({ label, value, subValue, isPositive }: StatItemProps) => {
  return (
    <div className="flex flex-col items-end bg-gradient-to-br from-ipecd-light/40 to-ipecd-light/20 rounded-lg px-3 py-2.5 border border-ipecd-light/60 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105">
      <span className="text-[10px] font-bold text-ipecd-dark/70 uppercase tracking-wider mb-1.5">
        {label}
      </span>
      <div className="flex items-baseline gap-2">
        <span className="text-lg font-bold text-ipecd-dark tabular-nums tracking-tight">
          {value}
        </span>
        {subValue && (
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-md transition-all duration-200 ${
            isPositive === undefined 
              ? 'text-gray-700 bg-gray-100' // Neutro
              : isPositive 
                ? 'text-ipecd-dark bg-ipecd-primary/30' // Positivo
                : 'text-red-700 bg-red-100' // Negativo
          }`}>
            {subValue}
          </span>
        )}
      </div>
    </div>
  );
};