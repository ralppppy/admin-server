import React, { Suspense } from "react";
import { BarangaysTableList } from "../components/BarangaysTableList";

function BarangaysTableListContent() {
  return (
    <div>
      <Suspense fallback={<h1>LOADING</h1>}>
        <BarangaysTableList />
      </Suspense>
    </div>
  );
}

export default BarangaysTableListContent;
