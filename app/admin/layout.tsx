'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { cn } from '@/lib/utils';
import { 
  Home,
  FileText,
  BarChart3,
  Settings,
  Users,
  Calendar,
  TrendingUp,
  Car
} from 'lucide-react';

const sidebarNavigation = [
  { name: 'Dashboard', href: '/admin', icon: Home },
  { name: 'Inquiries', href: '/admin/inquiries', icon: Calendar },
  { name: 'RV Fleet', href: '/admin/fleet', icon: Car },
  { name: 'Blog Dashboard', href: '/admin/blog', icon: BarChart3 },
  { name: 'Blog Posts', href: '/admin/blog/posts', icon: FileText },
  { name: 'Categories', href: '/admin/blog/categories', icon: TrendingUp },
  { name: 'Tags', href: '/admin/blog/tags', icon: TrendingUp },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-50 border-r border-gray-200">
          <nav className="p-4 space-y-1">
            {sidebarNavigation.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== '/admin' && pathname.startsWith(item.href));
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 bg-gray-50">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
