import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";

const ProductPage = () => {
  return (
    <div>
      <DataTable
        columns={columns}
        data={[
          {
            id: 1,
            name: "Product 1",
            price: 100,
            image: "https://picsum.photos/id/1/200/300",
          },
          {
            id: 2,
            name: "Product 2",
            price: 200,
            image: "https://picsum.photos/id/2/200/300",
          },
        ]}
      />
    </div>
  );
};

export default ProductPage;
