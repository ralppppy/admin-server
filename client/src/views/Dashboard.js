import React, { Suspense } from "react";

import { StudentChartShit } from "../components/dashboard";

function Dashboard() {
  return (
    <div>
      <Suspense fallback={<h1>LOADING</h1>}>
        <StudentChartShit />
      </Suspense>
    </div>
  );
}

export default Dashboard;
