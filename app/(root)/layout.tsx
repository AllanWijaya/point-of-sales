"use client";

import { Sidebar, SidebarMenuItem } from "@wijaya/ui";
import { usePathname, useRouter } from "next/navigation";
import { type ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const activeSection = pathname.split("/")[2] ?? pathname.split("/")[1];

  const menu: SidebarMenuItem[] = [
    {
      key: "dashboard",
      label: "",
      icon: "lucide:layout-dashboard",
      children: [
        {
          key: "dashboard",
          label: "Dashboard",
          icon: "lucide:layout-dashboard",
          href: "/dashboard",
        },
      ],
    },
    {
      key: "core-item",
      label: "CORE ITEM",
      icon: "lucide:hard-drive",
      children: [
        {
          key: "product",
          label: "Product",
          icon: "lucide:bell",
          href: "/master-data/product",
        },
      ],
    },
  ];

  const handleSidebarClick = (key: string) => {
    const href = menu.find((_item) =>
      _item.children?.find((_itemsub) => _itemsub.key === key),
    )?.href;
    router.push(href || "");
  };

  return (
    <main className="min-h-screen">
      <div className="flex">
        <div className="px-2 border border-slate-200 min-h-screen">
          <Sidebar
            header={
              <div className="text-center">
                <h1>
                  <strong>Point of Sales</strong>
                </h1>
              </div>
            }
            menu={menu}
            activeMenuKey={activeSection}
            activeSection={activeSection}
            onSelectSection={(_id) => handleSidebarClick(_id)}
          />
        </div>
        <div className="p-2">{children}</div>
      </div>
    </main>
  );
}
