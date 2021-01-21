
import React, { useState, useEffect } from 'react';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { authenticationService, userService } from '../../_services/index.js';
import { useLocation } from 'react-router-dom';


export default function ShowReport() {
  const [reportInfo, setreportInfo] = useState(null);
  const location = useLocation();

    useEffect(() => {
      // Update the document title using the browser API
    userService.getReportById(location.state.uid, location.state.assesmentid).then(report => { setreportInfo(report) });
    });

  if (reportInfo) {
    return (
      <div>
        <p>Please find the report</p>
        { reportInfo?.data && <BarChart
          width={500}
          height={300}
          data={reportInfo?.data}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Agreeableness" fill="#8884d8" />
          <Bar dataKey="Drive" fill="#82ca9d" />
          <Bar dataKey="Luck" fill="black" />
          <Bar dataKey="Openess" fill="red" />
        </BarChart>}
      </div>
    );
  }
  else return null;
   
}