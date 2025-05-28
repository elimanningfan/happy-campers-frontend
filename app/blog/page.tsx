'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, User, ChevronRight, Search } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { blogPosts, categories, tags } from '@/data/blog-posts';
import { BlogPost } from '@/types/blog';

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Filter posts based on search, category, and tag
  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = !searchQuery || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = !selectedCategory || 
        post.categories.some(cat => cat.slug === selectedCategory);
      
      const matchesTag = !selectedTag || 
        post.tags.some(tag => tag.slug === selectedTag);
      
      return matchesSearch && matchesCategory && matchesTag && post.status === 'published';
    });
  }, [searchQuery, selectedCategory, selectedTag]);

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  // Popular posts (by views)
  const popularPosts = useMemo(() => {
    return [...blogPosts]
      .filter(post => post.status === 'published')
      .sort((a, b) => b.views - a.views)
      .slice(0, 5);
  }, []);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setSelectedTag(null);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-green-50 to-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Happy Campers Blog
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              Tips, destinations, and stories from the road
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Blog Posts */}
            <div className="lg:col-span-2">
              {/* Search Bar */}
              <div className="mb-8">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search blog posts..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Active Filters */}
              {(selectedCategory || selectedTag) && (
                <div className="mb-6 flex items-center gap-2 flex-wrap">
                  <span className="text-sm text-gray-600">Active filters:</span>
                  {selectedCategory && (
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setSelectedCategory(null)}
                    >
                      {categories.find(c => c.slug === selectedCategory)?.name} ×
                    </Button>
                  )}
                  {selectedTag && (
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setSelectedTag(null)}
                    >
                      {tags.find(t => t.slug === selectedTag)?.name} ×
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={clearFilters}
                  >
                    Clear all
                  </Button>
                </div>
              )}

              {/* Blog Posts Grid */}
              {paginatedPosts.length === 0 ? (
                <Card className="p-12 text-center">
                  <p className="text-gray-500">No blog posts found matching your criteria.</p>
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="mt-4"
                  >
                    Clear filters
                  </Button>
                </Card>
              ) : (
                <>
                  <div className="grid gap-8">
                    {paginatedPosts.map((post) => (
                      <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="md:flex">
                          {post.featuredImage && (
                            <div className="relative h-48 md:h-auto md:w-72">
                              <Image
                                src={post.featuredImage}
                                alt={post.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 288px"
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-1 p-6">
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {formatDate(post.publishedAt!)}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {post.readingTime} min read
                              </span>
                            </div>
                            <h2 className="text-2xl font-bold mb-2 hover:text-primary transition-colors">
                              <Link href={`/blog/${post.slug}`}>
                                {post.title}
                              </Link>
                            </h2>
                            <p className="text-gray-600 mb-4">{post.excerpt}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden">
                                  {post.author.avatar && (
                                    <Image
                                      src={post.author.avatar}
                                      alt={post.author.name}
                                      width={32}
                                      height={32}
                                      className="object-cover"
                                    />
                                  )}
                                </div>
                                <span className="text-sm text-gray-600">{post.author.name}</span>
                              </div>
                              <Link
                                href={`/blog/${post.slug}`}
                                className="text-primary hover:text-primary/80 flex items-center gap-1 text-sm font-medium"
                              >
                                Read more
                                <ChevronRight className="h-4 w-4" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="mt-8 flex justify-center gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </Button>
                      <div className="flex items-center gap-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                          <Button
                            key={page}
                            variant={page === currentPage ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setCurrentPage(page)}
                          >
                            {page}
                          </Button>
                        ))}
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-8">
              {/* Categories */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Categories</h3>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {categories.map((category) => (
                      <li key={category.id}>
                        <button
                          onClick={() => {
                            setSelectedCategory(category.slug);
                            setCurrentPage(1);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 transition-colors flex items-center justify-between ${
                            selectedCategory === category.slug ? 'bg-gray-100 font-medium' : ''
                          }`}
                        >
                          <span>{category.name}</span>
                          <span className="text-sm text-gray-500">({category.postCount})</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Popular Posts */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Popular Posts</h3>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {popularPosts.map((post) => (
                      <li key={post.id}>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="block hover:text-primary transition-colors"
                        >
                          <h4 className="font-medium line-clamp-2">{post.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{formatDate(post.publishedAt!)}</p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Tags */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Popular Tags</h3>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Button
                        key={tag.id}
                        size="sm"
                        variant={selectedTag === tag.slug ? 'default' : 'outline'}
                        onClick={() => {
                          setSelectedTag(tag.slug);
                          setCurrentPage(1);
                        }}
                      >
                        {tag.name}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
