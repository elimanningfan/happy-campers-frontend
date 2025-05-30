'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Trash, 
  Copy, 
  Eye,
  FileText,
  Calendar,
  User,
  Archive,
  CheckCircle,
  Clock,
  Download,
  Upload
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { 
  PageListItem, 
  PageStatus, 
  PageTemplate 
} from '@/lib/types/page';
import { 
  getPageListItems, 
  updatePageStatus, 
  deletePage, 
  duplicatePage,
  importPages 
} from '@/lib/utils/page-storage';

const statusConfig = {
  draft: { 
    label: 'Draft', 
    icon: Clock, 
    className: 'bg-gray-100 text-gray-700' 
  },
  published: { 
    label: 'Published', 
    icon: CheckCircle, 
    className: 'bg-green-100 text-green-700' 
  },
  archived: { 
    label: 'Archived', 
    icon: Archive, 
    className: 'bg-orange-100 text-orange-700' 
  }
};

const templateLabels: Record<PageTemplate, string> = {
  default: 'Default',
  landing: 'Landing Page',
  contact: 'Contact',
  about: 'About Us',
  custom: 'Custom'
};

export default function PagesManagement() {
  const [pages, setPages] = useState<PageListItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | PageStatus>('all');
  const [filterTemplate, setFilterTemplate] = useState<'all' | PageTemplate>('all');
  const [sortBy, setSortBy] = useState<'title' | 'updatedAt' | 'status'>('updatedAt');
  const [loading, setLoading] = useState(true);

  // Load pages on mount
  useEffect(() => {
    loadPageData();
  }, []);

  const loadPageData = () => {
    setLoading(true);
    const pageItems = getPageListItems();
    setPages(pageItems);
    setLoading(false);
  };

  // Filter and sort pages
  const filteredPages = pages
    .filter(page => {
      const matchesSearch = searchQuery === '' || 
        page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        page.slug.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = filterStatus === 'all' || page.status === filterStatus;
      const matchesTemplate = filterTemplate === 'all' || page.template === filterTemplate;
      
      return matchesSearch && matchesStatus && matchesTemplate;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'status':
          return a.status.localeCompare(b.status);
        case 'updatedAt':
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        default:
          return 0;
      }
    });

  const handleStatusChange = (pageId: string, newStatus: PageStatus) => {
    updatePageStatus(pageId, newStatus);
    loadPageData();
  };

  const handleDelete = (pageId: string) => {
    if (confirm('Are you sure you want to delete this page?')) {
      deletePage(pageId);
      loadPageData();
    }
  };

  const handleDuplicate = (pageId: string) => {
    const newPage = duplicatePage(pageId);
    if (newPage) {
      loadPageData();
    }
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        await importPages(file);
        loadPageData();
        alert('Pages imported successfully!');
      } catch (error) {
        alert('Error importing pages: ' + error);
      }
    }
  };

  const StatusBadge = ({ status }: { status: PageStatus }) => {
    const config = statusConfig[status];
    const Icon = config.icon;
    
    return (
      <Badge className={cn('gap-1', config.className)}>
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Page Management</h1>
          <p className="text-muted-foreground">
            Create and manage your website pages
          </p>
        </div>
        <div className="flex gap-2">
          <label>
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
            <Button variant="outline" asChild>
              <span className="cursor-pointer">
                <Upload className="mr-2 h-4 w-4" />
                Import
              </span>
            </Button>
          </label>
          <Link href="/admin/pages/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Page
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Pages</p>
                <p className="text-2xl font-bold">{pages.length}</p>
              </div>
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Published</p>
                <p className="text-2xl font-bold text-green-600">
                  {pages.filter(p => p.status === 'published').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Drafts</p>
                <p className="text-2xl font-bold text-gray-600">
                  {pages.filter(p => p.status === 'draft').length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Archived</p>
                <p className="text-2xl font-bold text-orange-600">
                  {pages.filter(p => p.status === 'archived').length}
                </p>
              </div>
              <Archive className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 text-muted-foreground -translate-y-1/2" />
                <Input
                  placeholder="Search pages by title or URL..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={(value) => setFilterStatus(value as any)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterTemplate} onValueChange={(value) => setFilterTemplate(value as any)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Templates" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Templates</SelectItem>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="landing">Landing Page</SelectItem>
                <SelectItem value="contact">Contact</SelectItem>
                <SelectItem value="about">About Us</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={(value) => setSortBy(value as any)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="updatedAt">Last Modified</SelectItem>
                <SelectItem value="title">Title</SelectItem>
                <SelectItem value="status">Status</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Pages Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableCaption>
              {loading ? 'Loading pages...' : `${filteredPages.length} pages found`}
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Page</TableHead>
                <TableHead>Template</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Last Modified</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPages.map((page) => (
                <TableRow key={page.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{page.title}</p>
                      <p className="text-sm text-muted-foreground">/{page.slug}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {templateLabels[page.template]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={page.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{page.author}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {new Date(page.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {page.status === 'published' && (
                          <DropdownMenuItem asChild>
                            <Link href={`/${page.slug}`} target="_blank">
                              <Eye className="mr-2 h-4 w-4" />
                              View Page
                            </Link>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/pages/${page.id}/edit`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDuplicate(page.id)}>
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {page.status !== 'published' && (
                          <DropdownMenuItem onClick={() => handleStatusChange(page.id, 'published')}>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Publish
                          </DropdownMenuItem>
                        )}
                        {page.status === 'published' && (
                          <DropdownMenuItem onClick={() => handleStatusChange(page.id, 'draft')}>
                            <Clock className="mr-2 h-4 w-4" />
                            Unpublish
                          </DropdownMenuItem>
                        )}
                        {page.status !== 'archived' && (
                          <DropdownMenuItem onClick={() => handleStatusChange(page.id, 'archived')}>
                            <Archive className="mr-2 h-4 w-4" />
                            Archive
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => handleDelete(page.id)}
                          className="text-red-600"
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
