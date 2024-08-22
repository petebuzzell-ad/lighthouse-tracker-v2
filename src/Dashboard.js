import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { supabase } from './supabaseClient';
import DeviceToggle from './DeviceToggle';

const Dashboard = () => {
  const [device, setDevice] = useState('desktop');
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: reports, error } = await supabase
        .from('reports')
        .select('*')
        .eq('device_type', device)
        .order('timestamp', { ascending: true });

      if (error) console.error(error);
      setData(reports);
    };

    fetchData();
  }, [device]);

  const chartData = {
    labels: data ? data.map((report) => new Date(report.timestamp).toLocaleString()) : [],
    datasets: [
      {
        label: 'Performance',
        data: data ? data.map((report) => report.performance_score) : [],
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      },
      {
        label: 'SEO',
        data: data ? data.map((report) => report.seo_score) : [],
        borderColor: 'rgba(153,102,255,1)',
        fill: false,
      },
      {
        label: 'Accessibility',
        data: data ? data.map((report) => report.accessibility_score) : [],
        borderColor: 'rgba(255,159,64,1)',
        fill: false,
      },
    ],
  };

  return (
    <div>
      <h2>Lighthouse Scores - {device.charAt(0).toUpperCase() + device.slice(1)}</h2>
      <DeviceToggle onDeviceChange={setDevice} />
      <Line data={chartData} />
    </div>
  );
};

export default Dashboard;
