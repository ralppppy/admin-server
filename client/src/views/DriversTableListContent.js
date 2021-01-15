import React, { Suspense } from "react";
import { DriversTableList } from "../components/DriversTableList";
function DriversTableListContent() {
  return (
    <div>
      <Suspense fallback={<h1>LOADING</h1>}>
        <DriversTableList />
      </Suspense>
    </div>
  );
}

export default DriversTableListContent;
