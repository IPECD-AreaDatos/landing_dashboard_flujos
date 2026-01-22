interface DashboardRowProps {
  title: string;
  date: string;
  children: React.ReactNode;
  fechaDato?: Date; // Fecha del dato para calcular antigüedad
}

export const DashboardRow = ({ title, date, children, fechaDato }: DashboardRowProps) => {
  // Calcular días desde la última actualización
  const getDiasDesdeActualizacion = (): number | null => {
    if (!fechaDato) return null;
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const fecha = new Date(fechaDato);
    fecha.setHours(0, 0, 0, 0);
    const diffTime = hoy.getTime() - fecha.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const diasDesdeActualizacion = getDiasDesdeActualizacion();
  
  // Determinar el color del badge según la antigüedad
  const getBadgeColor = (dias: number | null) => {
    if (dias === null) return 'bg-gray-100 text-gray-600';
    if (dias === 0) return 'bg-ipecd-primary/30 text-ipecd-dark border-ipecd-primary/50';
    if (dias <= 7) return 'bg-ipecd-light/50 text-ipecd-dark border-ipecd-primary/30';
    if (dias <= 30) return 'bg-amber-100 text-amber-800 border-amber-300';
    return 'bg-red-100 text-red-800 border-red-300';
  };

  const getBadgeText = (dias: number | null) => {
    if (dias === null) return 'Sin fecha';
    if (dias === 0) return 'Hoy';
    if (dias === 1) return 'Ayer';
    if (dias < 30) return `Hace ${dias} días`;
    if (dias < 365) {
      const meses = Math.floor(dias / 30);
      return `Hace ${meses} ${meses === 1 ? 'mes' : 'meses'}`;
    }
    const años = Math.floor(dias / 365);
    return `Hace ${años} ${años === 1 ? 'año' : 'años'}`;
  };

  return (
    <div className="group flex flex-col md:flex-row items-center justify-between py-5 px-6 bg-white even:bg-ipecd-light/5 hover:bg-gradient-to-r hover:from-ipecd-light/30 hover:to-white transition-all duration-300 border-l-4 border-transparent hover:border-ipecd-primary hover:shadow-md animate-fadeIn">
      
      {/* COLUMNA 1: Indicador */}
      <div className="w-full md:w-1/4 mb-3 md:mb-0 flex justify-center">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-ipecd-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-125"></div>
          <h3 className="font-bold text-ipecd-dark text-base group-hover:text-ipecd-primary transition-colors duration-200">{title}</h3>
        </div>
      </div>

      {/* COLUMNA 2: Fecha */}
      <div className="w-full md:w-1/4 mb-3 md:mb-0 flex justify-center">
        <div className="flex flex-col gap-2 items-center">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-ipecd-primary group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm font-semibold text-gray-700 group-hover:text-ipecd-dark transition-colors duration-200">{date}</span>
          </div>
          {diasDesdeActualizacion !== null && (
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg border transition-all duration-200 group-hover:scale-105 ${getBadgeColor(diasDesdeActualizacion)}`}>
              {getBadgeText(diasDesdeActualizacion)}
            </span>
          )}
        </div>
      </div>

      {/* COLUMNA 3: Datos */}
      <div className="w-full md:flex-1 flex flex-wrap gap-6 items-center justify-center">
        {children}
      </div>
    </div>
  );
};