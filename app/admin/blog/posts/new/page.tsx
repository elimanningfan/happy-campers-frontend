'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { BlogEditor } from '@/components/blog/editor';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Save, 
  ArrowLeft, 
  Image as ImageIcon,
  X,
  Plus,
  Sparkles
} from 'lucide-react';
import { categories, tags, authors } from '@/data/blog-posts';
import { BlogPost } from '@/types/blog';
import { MediaPicker } from '@/components/admin/media-picker';
import { MediaItem } from '@/lib/types/media';
import { Alert, AlertDescription } from '@/components/ui/alert';

type PostStatus = 'draft' | 'published' | 'scheduled';

export default function NewBlogPostPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPublishing, setIsPublishing] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [showGeneratedAlert, setShowGeneratedAlert] = useState(false);
  
  // Form state
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedAuthor, setSelectedAuthor] = useState(authors[0].id);
  const [status, setStatus] = useState<PostStatus>('draft');
  const [publishDate, setPublishDate] = useState(new Date().toISOString().split('T')[0]);
  
  // SEO state
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [seoKeywords, setSeoKeywords] = useState<string[]>([]);
  const [newKeyword, setNewKeyword] = useState('');

  // Auto-generate slug from title
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    setSlug(generateSlug(value));
    if (!seoTitle) {
      setSeoTitle(value);
    }
  };

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleTag = (tagId: string) => {
    setSelectedTags(prev =>
      prev.includes(tagId)
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  const addKeyword = () => {
    if (newKeyword.trim() && !seoKeywords.includes(newKeyword.trim())) {
      setSeoKeywords([...seoKeywords, newKeyword.trim()]);
      setNewKeyword('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setSeoKeywords(seoKeywords.filter(k => k !== keyword));
  };

  const handleSaveDraft = async () => {
    setIsSavingDraft(true);
    // In a real app, this would save to the backend
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Saving draft...', {
      title,
      slug,
      excerpt,
      content,
      featuredImage,
      categories: selectedCategories,
      tags: selectedTags,
      author: selectedAuthor,
      status: 'draft',
      seo: {
        title: seoTitle,
        description: seoDescription,
        keywords: seoKeywords,
      },
    });
    setIsSavingDraft(false);
    router.push('/admin/blog/posts');
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    // In a real app, this would save to the backend
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Publishing...', {
      title,
      slug,
      excerpt,
      content,
      featuredImage,
      categories: selectedCategories,
      tags: selectedTags,
      author: selectedAuthor,
      status: status === 'scheduled' ? 'scheduled' : 'published',
      publishedAt: status === 'scheduled' ? new Date(publishDate) : new Date(),
      seo: {
        title: seoTitle,
        description: seoDescription,
        keywords: seoKeywords,
      },
    });
    setIsPublishing(false);
    router.push('/admin/blog/posts');
  };

  const handleMediaSelect = (media: MediaItem) => {
    setFeaturedImage(media.url);
  };

  // Handle AI-generated content
  useEffect(() => {
    const generatedData = searchParams.get('generated');
    if (generatedData) {
      try {
        const data = JSON.parse(decodeURIComponent(generatedData));
        
        // Set the generated content
        setTitle(data.title || '');
        setSlug(generateSlug(data.title || ''));
        setContent(data.content || '');
        setSeoDescription(data.metaDescription || '');
        
        // Set primary keyword
        if (data.primaryKeyword) {
          setSeoKeywords([data.primaryKeyword]);
        }
        
        // Set secondary keywords
        if (data.secondaryKeywords) {
          const secondaryKws = data.secondaryKeywords.split(',').map((kw: string) => kw.trim()).filter(Boolean);
          setSeoKeywords(prev => [...prev, ...secondaryKws]);
        }
        
        // Set category
        if (data.category) {
          const categoryMap: { [key: string]: string } = {
            'destination-guides': '1',
            'rv-selection-guides': '2',
            'how-to-content': '3',
            'travel-tips': '4'
          };
          const categoryId = categoryMap[data.category];
          if (categoryId) {
            setSelectedCategories([categoryId]);
          }
        }
        
        // Extract excerpt from content (first paragraph)
        const excerptMatch = data.content.match(/<p>(.*?)<\/p>/);
        if (excerptMatch) {
          setExcerpt(excerptMatch[1].replace(/<[^>]*>/g, '').substring(0, 200));
        }
        
        setShowGeneratedAlert(true);
        
        // Clear the generated param from URL
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.delete('generated');
        window.history.replaceState({}, '', newUrl);
      } catch (error) {
        console.error('Error parsing generated content:', error);
      }
    }
  }, [searchParams]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/blog/posts">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Posts
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Create New Post</h1>
            <p className="text-gray-600 mt-1">Write and publish a new blog post</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleSaveDraft}
            disabled={isSavingDraft || !title || !content}
          >
            <Save className="h-4 w-4 mr-2" />
            {isSavingDraft ? 'Saving...' : 'Save Draft'}
          </Button>
          <Button
            onClick={handlePublish}
            disabled={isPublishing || !title || !content || selectedCategories.length === 0}
          >
            {isPublishing ? 'Publishing...' : status === 'scheduled' ? 'Schedule Post' : 'Publish Post'}
          </Button>
        </div>
      </div>

      {showGeneratedAlert && (
        <Alert variant="success" className="mb-6">
          <AlertDescription>
            AI-generated content has been applied to this post. Review and edit as needed.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Post Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Enter post title"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="slug">URL Slug</Label>
                <Input
                  id="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="post-url-slug"
                  className="mt-1"
                />
                <p className="text-sm text-gray-500 mt-1">
                  URL: /blog/{slug || 'post-url-slug'}
                </p>
              </div>
              
              <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Brief description of your post"
                  rows={3}
                  className="mt-1"
                />
                <p className="text-sm text-gray-500 mt-1">
                  This will appear in blog listings and search results
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Content Editor */}
          <Card>
            <CardHeader>
              <CardTitle>Content</CardTitle>
            </CardHeader>
            <CardContent>
              <BlogEditor
                content={content}
                onChange={setContent}
                placeholder="Start writing your blog post..."
              />
            </CardContent>
          </Card>

          {/* SEO Settings */}
          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="seo-title">SEO Title</Label>
                <Input
                  id="seo-title"
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  placeholder="SEO optimized title"
                  className="mt-1"
                />
                <p className="text-sm text-gray-500 mt-1">
                  {seoTitle.length}/60 characters
                </p>
              </div>
              
              <div>
                <Label htmlFor="seo-description">Meta Description</Label>
                <Textarea
                  id="seo-description"
                  value={seoDescription}
                  onChange={(e) => setSeoDescription(e.target.value)}
                  placeholder="SEO meta description"
                  rows={3}
                  className="mt-1"
                />
                <p className="text-sm text-gray-500 mt-1">
                  {seoDescription.length}/160 characters
                </p>
              </div>
              
              <div>
                <Label>Keywords</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    placeholder="Add keyword"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
                  />
                  <Button onClick={addKeyword} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {seoKeywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-sm rounded"
                    >
                      {keyword}
                      <button
                        onClick={() => removeKeyword(keyword)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publish Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Publish Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={status} onValueChange={(value: PostStatus) => setStatus(value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {status === 'scheduled' && (
                <div>
                  <Label htmlFor="publish-date">Publish Date</Label>
                  <Input
                    id="publish-date"
                    type="date"
                    value={publishDate}
                    onChange={(e) => setPublishDate(e.target.value)}
                    className="mt-1"
                  />
                </div>
              )}
              
              <div>
                <Label htmlFor="author">Author</Label>
                <Select value={selectedAuthor} onValueChange={setSelectedAuthor}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {authors.map((author) => (
                      <SelectItem key={author.id} value={author.id}>
                        {author.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Featured Image */}
          <Card>
            <CardHeader>
              <CardTitle>Featured Image</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  {featuredImage ? (
                    <div className="relative">
                      <img
                        src={featuredImage}
                        alt="Featured"
                        className="w-full h-40 object-cover rounded"
                      />
                      <Button
                        size="sm"
                        variant="destructive"
                        className="absolute top-2 right-2"
                        onClick={() => setFeaturedImage('')}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setIsMediaPickerOpen(true)}
                      className="w-full py-8 hover:bg-gray-50 transition-colors rounded"
                    >
                      <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">
                        Click to select from media library
                      </p>
                    </button>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsMediaPickerOpen(true)}
                    className="flex-1"
                  >
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Select from Library
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label
                    key={category.id}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => toggleCategory(category.id)}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm">{category.name}</span>
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <button
                    key={tag.id}
                    onClick={() => toggleTag(tag.id)}
                    className={`px-3 py-1 text-sm rounded-full transition-colors ${
                      selectedTags.includes(tag.id)
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tag.name}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      {/* Media Picker Dialog */}
      <MediaPicker
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        onSelect={handleMediaSelect}
        title="Select Featured Image"
      />
    </div>
  );
}
