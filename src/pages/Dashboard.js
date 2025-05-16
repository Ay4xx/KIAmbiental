//carga de datos, estados carga/error y ruteo
//trabajare hooks, datos, el navigate para los ruteo

import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import PropTypes from 'prop-types';
import { prueba } from '../pruebas/prueba';
import { useNavigate } from 'react-router-dom';
import { 
  ResponsiveContainer, 
  BarChart, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Bar 
} from 'recharts';
import LoadingSpinner from '../components/LoadingSpinner';    // spinner de carga
import ErrorAlert from '../components/ErrorAlert';            // alerta de error
import DashboardContent from '../components/DashboardContent';// contenido principal del dashboard


// const Spincarga = () =>
// ( 
//   <div role="status" aria-label="Cargando" className="flex justify-center items-center p-4">
//   <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
//   </div>
// );
// const Alert = ({ message }) => 
// (
//     <div role="alert" className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" aria-live="assertive">
//       <strong className="font-bold">Error: </strong>
//       <span className="block sm:inline">{message}</span>
//     </div>
// );
// Alert.propTypes = { message: PropTypes.string.isRequired, }; //solo para recorda que necesita el string

// const KPICard = ({ label, value }) => 
// (
//     <div className="bg-white rounded-2xl shadow p-6 flex-1 m-2" role="region" aria-label={`${label} KPI`}>
//     <h3 className="text-gray-500 text-sm font-medium">{label}</h3>
//     <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
//     </div>
// );
// KPICard.propTypes = 
// {
//     label: PropTypes.string.isRequired,
//     value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
// };
// const BarChart = ({ data }) => 
// {
//     const max = Math.max(...data.map(d => d.waste_kg));
//     return(
//       <div className="my-8">
//         <h4 className="text-lg font-semibold mb-4">Residuos por Departamento</h4>
//         <div className="flex items-end space-x-4 h-40">
//           {data.map(({ department, waste_kg }) => 
//           (
//             <div key={department} className="flex-1 text-center">
//               <div
//                 className="mx-auto mb-2"
//                 style=
//                 {{
//                   height: `${(waste_kg / max) * 100}%`,
//                   width: '40px',
//                   backgroundColor: '#3b82f6',
//                   borderRadius: '8px',
//                 }}
//                 aria-label={`${department}: ${waste_kg} kg`}
//               />
//               <span className="block text-xs text-gray-700">{department}</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
// }; 
// BarChart.propTypes = 
// {
//     data: PropTypes.arrayOf
//     (
//       PropTypes.shape
//       ({
//         department: PropTypes.string.isRequired,
//         waste_kg: PropTypes.number.isRequired,
//       })
//     ).isRequired,
// };
//necesito 3 componente pricipales
//datos
//carga
//error
//30/04/2025
//intentare otro enfoque

const Dashboard = () => 
{
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    //hook para lacargadedatos

    //para vavegar a home
    const navigate = useNavigate();

    useEffect(() => {
      const timer = setTimeout(() => {
        try {
          if (Math.random() < 0.2) throw new Error('no se pudieron cargar los datos de residuos');
          setData(prueba);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }, 1500);
      return () => clearTimeout(timer);
    }, []);
  
    //KPIS calc
    const totalWaste = data.reduce((sum, item) => sum + item.waste_kg, 0);
    const avgWaste   = data.length ? (totalWaste / data.length).toFixed(2) : 0;


  //   useEffect(() => 
  //   {
  //     // pra el spin
  //     const timer = setTimeout(() => 
  //     {
  //       try 
  //       {
  //         // para ver como seria un error en la carga de los dash pongo uno que puede o no ocurri (2/10 ocurre)
  //         const fail = Math.random() < 0.2;
  //         if (fail) throw new Error('no se pudieron cargar los datos de residuos');
  //         setData(prueba);//cargamos daos
  //       } 
  //       catch (err) 
  //       {
  //         setError(err.message);//set (dame el error y guardalo)
  //       } 
  //       finally 
  //       {
  //         setLoading(false);//terminamos de cargar
  //       }
  //     }, 1500);
  
  //     return () => clearTimeout(timer);
  //   }, []);
  
  //   // calculos de kpis
  //   const totalWaste = data.reduce((sum, item) => sum + item.waste_kg, 0); //suma tt
  //   const avgWaste = data.length ? (totalWaste / data.length).toFixed(2) : 0; //promedio 
  
  //   return(
  //     <main 
  //      className="container mx-auto p-4"
  //      aria-labelledby="dashboard-title"
  //      style={{ position: 'relative' }}
  //     >
  //       {/*  men tres puntos */}
  //       <button
  //         onClick={() => navigate('/home')}
  //         style={{ position: 'absolute', top: 16, right: 16, background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}
  //         aria-label="Home"
  //       >
  //         ⋮
  //         <ul style=
  //          {{
  //           position: 'absolute', 
  //           top: '1.5rem', right: 0, 
  //           listStyle: 'none', 
  //           margin: 0, 
  //           padding: '0.5rem', 
  //           background: '#fff', 
  //           boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
  //          }}
  //         >
  //           <li>
  //             <button onClick={() => navigate('/home')}>Ir a Home</button>
  //           </li>
  //         </ul>
  //       </button>

  //       <h1 id="dashboard-title" className="text-2xl font-semibold mb-6">Dashboard de Residuos</h1>
  //       {/*pa que se vea el spin er*/}
  //       {loading && <Spincarga />}
  //       {/*mostramos el error si lo hubo*/}
  //       {error && <Alert message={error} />}
  //       {/* solo si no hay carga ni eror alguno */}
  //       {!loading && !error && 
  //       (
  //         <>
  //           {/* kpi cards */}
  //           <section className="flex flex-wrap mb-8" aria-label="kpi de residuos">
  //             <KPICard label="total (kg)" value={totalWaste} />
  //             <KPICard label="promedio (kg)" value={avgWaste} />
  //           </section>
  
  //           {/* tabla de datos */}
  //           <section className="bg-white rounded-2xl shadow p-6 mb-8" aria-label="tabla de residuos">
  //             {data.length ? 
  //             (
  //               <table className="min-w-full divide-y divide-gray-200">
  //                 <caption className="sr-only">residuos generados por departamento</caption>
  //                 <thead className="bg-gray-50">
  //                   <tr>
  //                     <th
  //                       scope="col"
  //                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
  //                     >
  //                       departamento
  //                     </th>
  //                     <th
  //                       scope="col"
  //                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
  //                     >
  //                       Residuos (kg)
  //                     </th>
  //                   </tr>
  //                 </thead>
  //                 <tbody className="bg-white divide-y divide-gray-200">
  //                   {data.map(({ department, waste_kg }) => 
  //                   (
  //                     <tr key={department}>
  //                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{department}</td>
  //                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{waste_kg}</td>
  //                     </tr>
  //                   ))}
  //                 </tbody>
  //               </table>
  //             ) : 
  //             (
  //               <p className="text-center text-gray-500">no hay datos de residuos disponibles.</p>
  //             )}
  //           </section>
  
  //           <section aria-label="gráfico de residuos">
              
  
  //             {/* g de barras */}
  //             <h4 className="text-lg font-semibold mb-4">Residuos por Departamento</h4>
  //             <ResponsiveContainer width="100%" height={300}>
  //               <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
  //                 <CartesianGrid strokeDasharray="3 3" />
  //                 <XAxis dataKey="department" />
  //                 <YAxis />
  //                 <Tooltip />
  //                 <Bar dataKey="waste_kg" fill="#3b82f6" />
  //               </BarChart>
  //             </ResponsiveContainer>
  
  
  
  //             </section>
  //         </>
  //       )}
  //     </main>
  //   );
  return (
    <main className="container mx-auto p-4" style={{ position: 'relative' }}>
      {/* boton ⋮ */}
      <button
        onClick={() => navigate('/home')}
        style={{
          position: 'absolute', top: 16, right: 16,
          background: 'transparent', border: 'none',
          fontSize: '1.5rem', cursor: 'pointer'
        }}
        aria-label="Home"
      >
        ⋮
      </button>

      <h1 id="dashboard-title" className="text-2xl font-semibold mb-6">
        dashboard de Residuos
      </h1>

      {/* condicional del ren*/}
      {loading && <LoadingSpinner />}
      {error   && <ErrorAlert message={error} />}
      {!loading && !error && (
        <DashboardContent 
          data={data} 
          totalWaste={totalWaste} 
          avgWaste={avgWaste} 
        />
      )}
    </main>
  );
  
   };
  
  export default Dashboard;
