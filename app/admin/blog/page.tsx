'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Eye, 
  Calendar, 
  TrendingUp,
  Plus,
  Edit,
  BarChart3,
  Users
} from 'lucide-react';
import { blogPosts, categories, tags } from '@/data/blog-posts';

export default function AdminBlogDashboard() {
  const publishedPosts = blogPosts.filter(post => post.status === 'published');
  const draftPosts = blogPosts.filter(post => post.status === 'draft');
  const totalViews = blogPosts.reduce((sum, post) => sum + post.views, 0);
  
  // Calculate posts by month for simple chart
  const postsByMonth = blogPosts.reduce((acc, post) => {
    if (post.publishedAt) {
      const monthKey = new Date(post.publishedAt).toLocaleString('default', { month: 'short', year: 'numeric' });
      acc[monthKey] = (acc[monthKey] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const recentPosts = [...blogPosts]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Blog Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your blog content and track performance</p>
        </div>
        <Link href="/admin/blog/posts/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{blogPosts.length}</div>
            <p className="text-xs text-muted-foreground">
              {publishedPosts.length} published, {draftPosts.length} drafts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Across all blog posts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categories.length}</div>
            <p className="text-xs text-muted-foreground">
              Active categories
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tags</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tags.length}</div>
            <p className="text-xs text-muted-foreground">
              Unique tags used
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/admin/blog/posts">
          <Button variant="outline" className="w-full">
            <FileText className="h-4 w-4 mr-2" />
            Manage Posts
          </Button>
        </Link>
        <Link href="/admin/blog/categories">
          <Button variant="outline" className="w-full">
            <BarChart3 className="h-4 w-4 mr-2" />
            Manage Categories
          </Button>
        </Link>
        <Link href="/admin/blog/tags">
          <Button variant="outline" className="w-full">
            <TrendingUp className="h-4 w-4 mr-2" />
            Manage Tags
          </Button>
        </Link>
        <Link href="/admin/blog/posts/new">
          <Button variant="outline" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Create New Post
          </Button>
        </Link>
      </div>

      {/* Recent Posts */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentPosts.map((post) => (
              <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <h3 className="font-medium">{post.title}</h3>
                  <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {post.author.name}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(post.updatedAt)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {post.views} views
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      post.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {post.status}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link href={`/admin/blog/posts/${post.id}/edit`}>
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  {post.status === 'published' && (
                    <Link href={`/blog/${post.slug}`} target="_blank">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link href="/admin/blog/posts">
              <Button variant="outline">View All Posts</Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Publishing Activity Chart (Simplified) */}
      <Card>
        <CardHeader>
          <CardTitle>Publishing Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Object.entries(postsByMonth).map(([month, count]) => (
              <div key={month} className="flex items-center gap-2">
                <span className="text-sm w-24">{month}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                  <div 
                    className="bg-primary rounded-full h-6 flex items-center justify-end pr-2"
                    style={{ width: `${(count / Math.max(...Object.values(postsByMonth))) * 100}%` }}
                  >
                    <span className="text-xs text-white">{count}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
