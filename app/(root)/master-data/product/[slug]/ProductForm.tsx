"use client";

import { useState } from "react";
import { Input } from "@wijaya/ui";

type ProductData = {
  uuid: string;
  name: string;
  category: string;
  stok: number;
};

interface ProductFormProps {
  initialData?: ProductData;
}

export default function ProductForm({ initialData }: ProductFormProps) {
  const [data, setData] = useState<ProductData>({
    uuid: initialData?.uuid ?? "",
    name: initialData?.name ?? "",
    category: initialData?.category ?? "",
    stok: initialData?.stok ?? 0,
  });

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-slate-800">Edit Produk</h1>

          <p className="mt-1 text-sm text-slate-500">
            Perbarui informasi produk.
          </p>
        </div>

        <div className="grid gap-5">
          <Input
            id="name"
            label="Nama Produk"
            className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/10"
            replaceClassName
            value={data.name}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            placeholder="Masukkan nama produk"
          />

          <Input
            id="category"
            label="Kategori"
            className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/10"
            replaceClassName
            value={data.category}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                category: e.target.value,
              }))
            }
            placeholder="Masukkan kategori produk"
          />

          <Input
            id="stok"
            label="Stok"
            type="number"
            className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/10"
            replaceClassName
            value={data.stok}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                stok: Number(e.target.value),
              }))
            }
            placeholder="Masukkan jumlah stok"
          />
        </div>
      </div>
    </div>
  );
}
