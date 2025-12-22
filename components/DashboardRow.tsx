interface DashboardRowProps {
  title: string;
  date: string;
  children: React.ReactNode; // Aquí irán los datos variables
  status?: 'success' | 'warning' | 'error'; // Opcional: para colorear si el dato es viejo
}

export const DashboardRow = ({ title, date, children, status = 'success' }: DashboardRowProps) => {
  return (
    <div className="group flex flex-col md:flex-row items-center justify-between p-4 bg-white border-b border-gray-100 hover:bg-gray-50 transition-all">
      
      {/* COLUMNA 1: Nombre del Indicador */}
      <div className="w-full md:w-1/4 mb-2 md:mb-0">
        <h3 className="font-bold text-gray-800">{title}</h3>
        <span className="text-xs text-gray-400 md:hidden">Última actualización:</span>
      </div>

      {/* COLUMNA 2: Fecha (Crucial para monitoreo) */}
      <div className="w-full md:w-1/4 mb-2 md:mb-0 text-sm text-gray-600">
        <span className="hidden md:inline mr-2"></span>
        {date}
      </div>

      {/* COLUMNA 3: Los Datos (Flexible) */}
      <div className="w-full md:w-2/4 flex flex-wrap gap-2 items-center">
        {children}
      </div>

      {/* COLUMNA 4: Botón discreto (aparece al hacer hover en desktop) */}
      <div className="hidden md:block w-10 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-gray-400 hover:text-blue-600">
        ➔
      </div>
    </div>
  );
};