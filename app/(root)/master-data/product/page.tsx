"use client";
import { useEffect, useState } from "react";
import { ProductData, dummyProducts, productColumns } from "./type";
import { Table } from "@/my-package/wijaya-ui";

export default function ProductPage() {
  const [data, setData] = useState<ProductData[]>([]);

  useEffect(() => {
    setData(dummyProducts);
  }, []);

  const handleRowClick = (row: ProductData) => {
    window.open(
      `/master-data/product/${row.uuid}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <div>
      <Table
        columns={productColumns}
        variant="primary"
        size="lg"
        data={data}
        onRowDoubleClick={handleRowClick}
      />
    </div>
  );
}
