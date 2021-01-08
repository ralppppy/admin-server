import React, { Suspense } from "react";

import { BarangayChartShit } from "../components/dashboard3";

function BarangayDashboard() {
    return (
        <div>
            <Suspense fallback={<h1>LOADING</h1>}>
                <BarangayChartShit />
            </Suspense>
        </div>
    )
}

export default BarangayDashboard
