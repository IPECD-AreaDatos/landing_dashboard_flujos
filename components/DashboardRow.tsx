interface DashboardRowProps {
  title: string;
  date: string;
  children: React.ReactNode;
}

export const DashboardRow = ({ title, date, children }: DashboardRowProps) => {
  return (
    <div className="group flex flex-col md:flex-row items-center justify-between py-5 px-6 bg-white border-b border-gray-100 hover:bg-emerald-50/30 transition-all duration-300">
      
      {/* COLUMNA 1: Indicador (Minimalista) */}
      <div className="w-full md:w-1/4 mb-2 md:mb-0">
        <h3 className="font-semibold text-gray-900 text-base">{title}</h3>
      </div>

      {/* COLUMNA 2: Fecha (Gris suave y pequeña) */}
      <div className="w-full md:w-1/4 mb-2 md:mb-0">
        <div className="text-xs font-medium text-gray-400 uppercase tracking-wide">
          {date}
        </div>
      </div>

      {/* COLUMNA 3: Datos (Alineados y limpios) */}
      <div className="w-full md:w-2/4 flex flex-wrap gap-6 items-center justify-start md:justify-end">
        {children}
      </div>
    </div>
  );
};