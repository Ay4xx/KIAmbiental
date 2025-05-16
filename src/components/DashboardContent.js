import React from 'react';
import PropTypes from 'prop-types';
import KPICard from './KPICard';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from 'recharts';

const DashboardContent = ({ data, totalWaste, avgWaste }) => (
  <>
    {/* KPI */}
    <section className="flex flex-wrap gap-6 mb-8">
      <KPICard label="total (kg)"   value={totalWaste} />
      <KPICard label="promedio (kg)" value={avgWaste} />
    </section>

    {/* tabla */}
    <section className="section-card mb-8" aria-label="tabla de residuos">
      {data.length ? (
        <table>…</table>
      ) : (
        <p>sin datos de residuos disponibles.</p>
      )}
    </section>

    {/* chart */}
    <section className="section-card" aria-label="grafico de residuos">
      <h4 className="text-lg font-semibold mb-4">residuos por depto</h4>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>…</BarChart>
      </ResponsiveContainer>
    </section>
  </>
);

DashboardContent.propTypes = {
  data: PropTypes.array.isRequired,
  totalWaste: PropTypes.number.isRequired,
  avgWaste: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default DashboardContent;
