import type { TableColumn } from "@/my-package/wijaya-ui";

export const productColumns: TableColumn<ProductData>[] = [
  {
    key: "name",
    label: "Nama",
    minWidth: 100,
  },
  {
    key: "category",
    label: "Kategori",
    minWidth: 100,
  },
  {
    key: "stok",
    label: "Stok",
    minWidth: 100,
  },
];

export type ProductData = {
  uuid: string;
  name: string;
  category: string;
  stok: number;
};

export const dummyProducts: ProductData[] = [
  {
    uuid: "abc-1",
    name: "Laptop ASUS Vivobook",
    category: "Elektronik",
    stok: 12,
  },
  {
    uuid: "abc-2",
    name: "Mouse Logitech M331",
    category: "Aksesoris Komputer",
    stok: 35,
  },
  {
    uuid: "abc-3",
    name: "Keyboard Mechanical",
    category: "Aksesoris Komputer",
    stok: 20,
  },
  {
    uuid: "abc-4",
    name: "Monitor LG 24 Inch",
    category: "Elektronik",
    stok: 8,
  },
  {
    uuid: "abc-5",
    name: "Headset JBL Tune",
    category: "Audio",
    stok: 15,
  },
];
