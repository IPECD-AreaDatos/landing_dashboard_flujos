# Dashboard Flujos ETL - IPECD

## Objetivo del Proyecto

Este proyecto es un dashboard web desarrollado con Next.js que permite monitorear en tiempo real los últimos datos disponibles de múltiples flujos ETL (Extract, Transform, Load). El dashboard proporciona una interfaz visual moderna y responsiva para visualizar información actualizada de diversos indicadores económicos y estadísticos, incluyendo:

- **ANAC**: Datos de aeropuertos
- **CBA-CBT**: Canastas Básicas Alimentarias y Totales
- **DNRPA**: Datos de vehículos por provincia
- **EMAE**: Estimador Mensual de Actividad Económica
- **IPC**: Índice de Precios al Consumidor
- **IERIC**: Índice de Empleo Regional Industrial y de la Construcción
- **IPI**: Índice de Producción Industrial (Nación)
- **IPICORR**: Índice de Producción Industrial de Corrientes
- **OEDE**: Ocupación y Empleo Departamental
- **REM**: Remuneración
- **RIPTE**: Remuneración Imponible Promedio de los Trabajadores Estables
- **SIPA**: Sistema Integrado Previsional Argentino

El dashboard se actualiza automáticamente cada 30 segundos para mantener la información siempre actualizada.

## Instalación

### Requisitos Previos

- **Node.js**: Versión 18.0.0 o superior
- **npm**: Versión 9.0.0 o superior (incluido con Node.js)

### Pasos de Instalación

1. **Clonar el repositorio** (si aplica):
   ```bash
   git clone <url-del-repositorio>
   cd landing_dashboard_flujos
   ```

2. **Instalar las dependencias**:
   ```bash
   npm install
   ```

3. **Configurar las variables de entorno**:
   - Crear un archivo `.env.local` en la raíz del proyecto
   - Agregar la variable de entorno necesaria (ver sección de Variables de Entorno)

4. **Iniciar el servidor de desarrollo**:
   ```bash
   npm run dev
   ```

5. **Abrir en el navegador**:
   - Navegar a `http://localhost:3000`

## Dependencias

### Dependencias de Producción

- **react** (^18.2.0): Biblioteca de JavaScript para construir interfaces de usuario
- **react-dom** (^18.2.0): Renderizador de React para el DOM
- **next** (^14.0.0): Framework de React para producción con renderizado del lado del servidor

### Dependencias de Desarrollo

- **@types/node** (^20.0.0): Tipos de TypeScript para Node.js
- **@types/react** (^18.2.0): Tipos de TypeScript para React
- **@types/react-dom** (^18.2.0): Tipos de TypeScript para React DOM
- **autoprefixer** (^10.4.16): Plugin de PostCSS para agregar prefijos de vendedores a CSS
- **postcss** (^8.4.31): Herramienta para transformar CSS con plugins
- **tailwindcss** (^3.3.5): Framework de CSS utility-first
- **typescript** (^5.2.2): Superset tipado de JavaScript

## Variables de Entorno

El proyecto utiliza variables de entorno para configurar la conexión con la API backend. Estas variables deben definirse en un archivo `.env.local` en la raíz del proyecto.

### Variables Requeridas

| Variable | Descripción | Valor por Defecto | Ejemplo |
|----------|-------------|-------------------|---------|
| `NEXT_PUBLIC_API_DATOS` | URL base de la API backend que proporciona los datos de los flujos ETL | `http://localhost:8000/api` | `https://api.ejemplo.com/api` |

### Configuración

Crear un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_API_DATOS=http://localhost:8000/api
```

**Nota**: Las variables que comienzan con `NEXT_PUBLIC_` son expuestas al navegador y pueden ser accedidas desde el código del cliente.

## Scripts Principales

El proyecto incluye los siguientes scripts npm definidos en `package.json`:

| Script | Comando | Descripción |
|--------|---------|-------------|
| **dev** | `npm run dev` | Inicia el servidor de desarrollo de Next.js en modo desarrollo. La aplicación estará disponible en `http://localhost:3000` y se recargará automáticamente al detectar cambios. |
| **build** | `npm run build` | Compila la aplicación para producción. Genera una versión optimizada en la carpeta `.next`. |
| **start** | `npm start` | Inicia el servidor de producción. Requiere ejecutar `npm run build` primero. |
| **lint** | `npm run lint` | Ejecuta el linter de Next.js para detectar problemas de código y estilo. |

## Árbol de Carpetas

```
landing_dashboard_flujos/
│
├── app/                          # Directorio de la aplicación Next.js (App Router)
│   ├── globals.css              # Estilos globales de la aplicación
│   ├── layout.tsx               # Layout raíz de la aplicación
│   └── page.tsx                 # Página principal del dashboard
│
├── components/                   # Componentes React reutilizables
│   ├── CbaCbtCard.tsx          # Componente para mostrar datos CBA-CBT
│   ├── DnrpaCard.tsx           # Componente para mostrar datos DNRPA
│   ├── EmaeCard.tsx            # Componente para mostrar datos EMAE
│   ├── FlujoCard.tsx           # Componente genérico para flujos (usado por ANAC)
│   ├── IericCard.tsx           # Componente para mostrar datos IERIC
│   ├── IpcCard.tsx             # Componente para mostrar datos IPC
│   ├── IpiCard.tsx             # Componente para mostrar datos IPI
│   ├── IpicorrCard.tsx         # Componente para mostrar datos IPICORR
│   ├── OedeCard.tsx            # Componente para mostrar datos OEDE
│   ├── RemCard.tsx             # Componente para mostrar datos REM
│   ├── RipteCard.tsx           # Componente para mostrar datos RIPTE
│   └── SipaCard.tsx            # Componente para mostrar datos SIPA
│
├── lib/                          # Utilidades y funciones auxiliares
│   └── api.ts                   # Funciones para realizar llamadas a la API
│
├── types/                        # Definiciones de tipos TypeScript
│   └── index.ts                 # Interfaces y tipos para los datos de los flujos
│
├── .env                          # Variables de entorno (no versionar)
├── .env.local                    # Variables de entorno locales (no versionar)
├── next.config.js               # Configuración de Next.js
├── next-env.d.ts                # Tipos de Next.js (generado automáticamente)
├── package.json                 # Dependencias y scripts del proyecto
├── package-lock.json            # Lock file de npm
├── postcss.config.js            # Configuración de PostCSS
├── tailwind.config.js           # Configuración de Tailwind CSS
├── tsconfig.json                # Configuración de TypeScript
└── README.md                    # Este archivo
```

## Flujo de Ejecución

### Desarrollo

1. **Instalar dependencias** (solo la primera vez):
   ```bash
   npm install
   ```

2. **Configurar variables de entorno**:
   - Crear archivo `.env.local` con la variable `NEXT_PUBLIC_API_DATOS`

3. **Iniciar servidor de desarrollo**:
   ```bash
   npm run dev
   ```

4. **Acceder a la aplicación**:
   - Abrir el navegador en `http://localhost:3000`
   - El dashboard cargará automáticamente los datos de todos los flujos
   - Los datos se actualizarán cada 30 segundos automáticamente

### Producción

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Configurar variables de entorno**:
   - Configurar las variables de entorno en el servidor de producción

3. **Compilar la aplicación**:
   ```bash
   npm run build
   ```

4. **Iniciar servidor de producción**:
   ```bash
   npm start
   ```

5. **Acceder a la aplicación**:
   - La aplicación estará disponible en el puerto configurado (por defecto 3000)

### Flujo de Datos

1. **Carga inicial**: Al cargar la página, se ejecuta `useEffect` que llama a todas las funciones de API en paralelo
2. **Obtención de datos**: Cada función en `lib/api.ts` realiza una petición GET a los endpoints correspondientes de la API backend
3. **Renderizado**: Los datos obtenidos se almacenan en el estado de React y se renderizan en los componentes Card correspondientes
4. **Actualización automática**: Cada 30 segundos se vuelven a ejecutar las peticiones para mantener los datos actualizados
5. **Manejo de errores**: Si alguna petición falla, se muestra un mensaje de error en la interfaz

## Cómo Contribuir

Las contribuciones son bienvenidas. Para contribuir al proyecto:

1. **Fork el repositorio** (si aplica)

2. **Crear una rama para tu feature**:
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```

3. **Realizar los cambios**:
   - Seguir las convenciones de código existentes
   - Asegurarse de que el código esté tipado correctamente (TypeScript)
   - Mantener el estilo consistente con el resto del proyecto

4. **Probar los cambios**:
   ```bash
   npm run dev
   npm run lint
   ```

5. **Commit de los cambios**:
   ```bash
   git commit -m "Descripción de los cambios"
   ```

6. **Push a la rama**:
   ```bash
   git push origin feature/nueva-funcionalidad
   ```

7. **Crear un Pull Request** con una descripción clara de los cambios realizados

### Guías de Estilo

- Usar TypeScript para todo el código
- Seguir las convenciones de nomenclatura de React (PascalCase para componentes)
- Mantener los componentes pequeños y reutilizables
- Usar Tailwind CSS para los estilos
- Documentar funciones y componentes complejos

### Reportar Issues

Si encuentras un bug o tienes una sugerencia, por favor crea un issue en el repositorio con:
- Descripción clara del problema o sugerencia
- Pasos para reproducir (si aplica)
- Comportamiento esperado vs comportamiento actual
- Información del entorno (navegador, versión de Node.js, etc.)

---

**Desarrollado para IPECD** - Instituto Provincial de Estadística y Censos de Corrientes
