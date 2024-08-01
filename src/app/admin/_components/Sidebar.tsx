import Link from "next/link";
import {
  Bell,
  Home,
  LineChart,
  Package,
  Package2,
  ShoppingCart,
  Users,
  Box,
  Truck,
  PackageCheck,
  Layers,
  Warehouse,
  Blocks,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

const Sidebar = () => {
  const navItems = [
    { id: 1, name: "Dashboard", href: "/admin", icon: Home },
    { id: 2, name: "Products", href: "/admin/products", icon: Layers },
    { id: 3, name: "Warehouses", href: "/admin/warehouses", icon: Warehouse },
    {
      id: 4,
      name: "Delivery Person",
      href: "/admin/delivery-person",
      icon: Truck,
    },
    { id: 5, name: "Orders", href: "/admin/orders", icon: ShoppingCart },
    {
      id: 6,
      name: "Inventories",
      href: "/admin/inventories",
      icon: Blocks,
    },
  ];

  return (
    <div>
      <div className="hidden border-r h-full  md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Image
                className="mt-1"
                src="/app-logo.svg"
                width={70}
                height={70}
                alt="App logo"
              />
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          {/* <div className="mt-auto p-4 justify-end">
            <Card x-chunk="dashboard-02-chunk-0">
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support
                  team.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Button size="sm" className="w-full">
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
