import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

const ReportList = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      const { data, error } = await supabase
        .from('reports')
        .select('*')
        .order('timestamp', { ascending: false });

      if (error) console.error(error);
      setReports(data);
    };

    fetchReports();
  }, []);

  return (
    <div>
      <h3>Report History</h3>
      <ul>
        {reports.map((report) => (
          <li key={report.id}>
            <a href={report.report_url} target="_blank" rel="noopener noreferrer">
              {new Date(report.timestamp).toLocaleString()} - {report.device_type.toUpperCase()}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReportList;
