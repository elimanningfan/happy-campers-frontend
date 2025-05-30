'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Home,
  FileText,
  BarChart3,
  Settings,
  Calendar,
  TrendingUp,
  Car,
  Menu,
  X,
  User,
  LogOut,
  Shield,
  ChevronRight,
  Bell,
  Search,
  Image,
  Sparkles,
  Layers
} from 'lucide-react';

const sidebarNavigation = [
  { 
    name: 'Dashboard', 
    href: '/admin', 
    icon: Home,
    description: 'Overview and analytics'
  },
  { 
    name: 'Inquiries', 
    href: '/admin/inquiries', 
    icon: Calendar,
    description: 'Customer inquiries'
  },
  { 
    name: 'Media Library', 
    href: '/admin/media', 
    icon: Image,
    description: 'Media management'
  },
  { 
    name: 'RV Fleet', 
    href: '/admin/fleet', 
    icon: Car,
    description: 'Manage RV inventory',
    subItems: [
      { name: 'All RVs', href: '/admin/fleet/rvs' },
    ]
  },
  { 
    name: 'Pages', 
    href: '/admin/pages', 
    icon: Layers,
    description: 'Static page management',
    subItems: [
      { name: 'All Pages', href: '/admin/pages' },
      { name: 'Create Page', href: '/admin/pages/new' },
      { name: 'Templates', href: '/admin/pages/templates' }
    ]
  },
  { 
    name: 'Blog', 
    href: '/admin/blog', 
    icon: FileText,
    description: 'Content management',
    subItems: [
      { name: 'Dashboard', href: '/admin/blog' },
      { name: 'Posts', href: '/admin/blog/posts' },
      { name: 'Generate with AI', href: '/admin/blog/generate' },
      { name: 'Categories', href: '/admin/blog/categories' },
      { name: 'Tags', href: '/admin/blog/tags' }
    ]
  },
  { 
    name: 'Analytics', 
    href: '/admin/analytics', 
    icon: BarChart3,
    description: 'Performance metrics'
  },
  { 
    name: 'Settings', 
    href: '/admin/settings', 
    icon: Settings,
    description: 'System configuration'
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (itemName: string) => {
    setExpandedItems(prev => 
      prev.includes(itemName) 
        ? prev.filter(name => name !== itemName)
        : [...prev, itemName]
    );
  };

  const isItemActive = (item: typeof sidebarNavigation[0]) => {
    if (pathname === item.href) return true;
    if (item.subItems) {
      return item.subItems.some(subItem => pathname.startsWith(subItem.href));
    }
    return item.href !== '/admin' && pathname.startsWith(item.href);
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Admin Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
        <div className="flex h-16 items-center px-4">
          {/* Mobile menu button */}
          <button
            className="lg:hidden mr-4 p-2 hover:bg-gray-100 rounded-md"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Logo */}
          <Link href="/admin" className="flex items-center gap-2">
            <div className="bg-forest-green text-white p-2 rounded-md font-bold text-sm">
              HC
            </div>
            <span className="font-heading font-semibold text-lg text-dark-gray">
              Happy Campers
            </span>
            <span className="text-sm text-muted-foreground ml-2 hidden sm:inline">
              Admin Panel
            </span>
          </Link>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Admin toolbar */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-5 w-5" />
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-primary-orange rounded-full" />
            </Button>

            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 px-3">
                  <div className="h-8 w-8 rounded-full bg-forest-green text-white flex items-center justify-center">
                    <User className="h-4 w-4" />
                  </div>
                  <span className="hidden md:inline font-medium">Admin User</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Shield className="mr-2 h-4 w-4" />
                  <span>Admin Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <aside className={cn(
          "fixed inset-y-16 left-0 z-40 w-64 transform bg-white border-r transition-transform lg:relative lg:inset-y-0 lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <nav className="h-full overflow-y-auto p-4">
            <div className="space-y-1">
              {sidebarNavigation.map((item) => {
                const isActive = isItemActive(item);
                const isExpanded = expandedItems.includes(item.name);
                
                return (
                  <div key={item.name}>
                    <button
                      onClick={() => {
                        if (item.subItems) {
                          toggleExpanded(item.name);
                        } else {
                          window.location.href = item.href;
                        }
                      }}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200",
                        isActive
                          ? "bg-forest-green text-white shadow-sm"
                          : "text-dark-gray hover:bg-gray-50 hover:text-forest-green"
                      )}
                    >
                      <item.icon className={cn(
                        "h-5 w-5 flex-shrink-0",
                        isActive ? "text-white" : "text-gray-500"
                      )} />
                      <div className="flex-1 text-left">
                        <div>{item.name}</div>
                        {item.description && (
                          <div className={cn(
                            "text-xs mt-0.5",
                            isActive ? "text-white/80" : "text-gray-500"
                          )}>
                            {item.description}
                          </div>
                        )}
                      </div>
                      {item.subItems && (
                        <ChevronRight className={cn(
                          "h-4 w-4 transition-transform",
                          isExpanded ? "rotate-90" : ""
                        )} />
                      )}
                    </button>
                    
                    {/* Sub-navigation */}
                    {item.subItems && isExpanded && (
                      <div className="mt-1 ml-8 space-y-1">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className={cn(
                              "block px-3 py-2 rounded-md text-sm transition-colors",
                              pathname === subItem.href
                                ? "bg-gray-100 text-forest-green font-medium"
                                : "text-gray-600 hover:bg-gray-50 hover:text-dark-gray"
                            )}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Sidebar footer */}
            <div className="mt-auto pt-4 border-t">
              <div className="px-3 py-2">
                <p className="text-xs text-gray-500">Happy Campers RV Rentals</p>
                <p className="text-xs text-gray-400">Admin Panel v0.4.4</p>
              </div>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
