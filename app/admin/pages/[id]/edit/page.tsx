'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  Save, 
  Eye, 
  ArrowLeft, 
  Plus,
  Trash,
  MoveUp,
  MoveDown,
  Settings,
  Image as ImageIcon,
  Type,
  Layers,
  FileText,
  Car,
  Grid,
  Megaphone
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { 
  Page, 
  PageTemplate, 
  ContentBlock,
  HeroBlockContent,
  TextBlockContent,
  RVShowcaseBlockContent,
  GalleryBlockContent,
  CTABlockContent,
  BlockType
} from '@/lib/types/page';
import { 
  getPageById,
  generateSlug, 
  savePage,
  saveDraft 
} from '@/lib/utils/page-storage';

interface EditPageProps {
  params: {
    id: string;
  };
}

export default function EditPage({ params }: EditPageProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('general');
  const [page, setPage] = useState<Page | null>(null);

  useEffect(() => {
    const loadedPage = getPageById(params.id);
    if (loadedPage) {
      setPage(loadedPage);
    }
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!page) {
    notFound();
  }

  // Update page field
  const updatePageField = (field: keyof Page, value: any) => {
    setPage(prev => prev ? {
      ...prev,
      [field]: value,
      updatedAt: new Date().toISOString()
    } : null);
  };

  // Update SEO field
  const updateSEOField = (field: keyof Page['seo'], value: any) => {
    setPage(prev => prev ? {
      ...prev,
      seo: {
        ...prev.seo,
        [field]: value
      },
      updatedAt: new Date().toISOString()
    } : null);
  };

  // Auto-generate slug from title
  const handleTitleChange = (title: string) => {
    updatePageField('title', title);
    // Only update slug if it matches the auto-generated version
    if (page && (page.slug === generateSlug(page.title))) {
      updatePageField('slug', generateSlug(title));
    }
  };

  // Add content block
  const addContentBlock = (type: BlockType) => {
    if (!page) return;
    
    const newBlock: ContentBlock = {
      id: `block_${Date.now()}`,
      type,
      content: getDefaultBlockContent(type),
      order: page.content.length,
      isVisible: true
    };

    setPage(prev => prev ? {
      ...prev,
      content: [...prev.content, newBlock]
    } : null);
  };

  // Get default content for block type
  const getDefaultBlockContent = (type: BlockType): any => {
    switch (type) {
      case 'hero':
        return {
          title: 'Welcome to Happy Campers',
          subtitle: 'Your adventure starts here',
          alignment: 'center',
          overlay: true,
          overlayOpacity: 50,
          ctaButtons: []
        } as HeroBlockContent;
      
      case 'text':
        return {
          text: '<p>Enter your content here...</p>',
          columns: 1,
          alignment: 'left'
        } as TextBlockContent;
      
      case 'rv-showcase':
        return {
          title: 'Featured RVs',
          description: 'Check out our amazing RV selection',
          rvIds: [],
          layout: 'grid',
          showPricing: true,
          showAvailability: true,
          limit: 3
        } as RVShowcaseBlockContent;
      
      case 'gallery':
        return {
          title: 'Image Gallery',
          images: [],
          layout: 'grid',
          columns: 3,
          spacing: 'medium'
        } as GalleryBlockContent;
      
      case 'cta':
        return {
          title: 'Ready to Start Your Adventure?',
          description: 'Book your perfect RV today and create unforgettable memories',
          backgroundColor: '#F59E0B',
          buttons: [{
            text: 'Book Now',
            link: '/inquiry',
            style: 'primary'
          }]
        } as CTABlockContent;
      
      default:
        return {};
    }
  };

  // Update block content
  const updateBlockContent = (blockId: string, content: any) => {
    setPage(prev => prev ? {
      ...prev,
      content: prev.content.map(block =>
        block.id === blockId ? { ...block, content } : block
      )
    } : null);
  };

  // Delete block
  const deleteBlock = (blockId: string) => {
    setPage(prev => prev ? {
      ...prev,
      content: prev.content.filter(block => block.id !== blockId)
    } : null);
  };

  // Move block
  const moveBlock = (blockId: string, direction: 'up' | 'down') => {
    if (!page) return;
    
    const currentIndex = page.content.findIndex(b => b.id === blockId);
    if (
      (direction === 'up' && currentIndex === 0) ||
      (direction === 'down' && currentIndex === page.content.length - 1)
    ) {
      return;
    }

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    const newContent = [...page.content];
    [newContent[currentIndex], newContent[newIndex]] = [newContent[newIndex], newContent[currentIndex]];
    
    setPage(prev => prev ? {
      ...prev,
      content: newContent.map((block, index) => ({ ...block, order: index }))
    } : null);
  };

  // Save page
  const handleSave = async () => {
    if (!page || !page.title) {
      alert('Please enter a page title');
      return;
    }

    setSaving(true);
    try {
      savePage(page);
      router.push('/admin/pages');
    } catch (error) {
      console.error('Error saving page:', error);
      alert('Error saving page');
    } finally {
      setSaving(false);
    }
  };

  // Auto-save draft
  const handleAutoSave = () => {
    if (page) {
      saveDraft(page.id, page);
    }
  };

  // Block editor components
  const HeroBlockEditor = ({ block }: { block: ContentBlock }) => {
    const content = block.content as HeroBlockContent;
    
    return (
      <div className="space-y-4">
        <div>
          <Label htmlFor={`${block.id}-title`}>Title</Label>
          <Input
            id={`${block.id}-title`}
            value={content.title}
            onChange={(e) => updateBlockContent(block.id, { ...content, title: e.target.value })}
            placeholder="Hero title"
          />
        </div>
        
        <div>
          <Label htmlFor={`${block.id}-subtitle`}>Subtitle</Label>
          <Input
            id={`${block.id}-subtitle`}
            value={content.subtitle || ''}
            onChange={(e) => updateBlockContent(block.id, { ...content, subtitle: e.target.value })}
            placeholder="Hero subtitle (optional)"
          />
        </div>

        <div>
          <Label htmlFor={`${block.id}-bg-image`}>Background Image URL</Label>
          <Input
            id={`${block.id}-bg-image`}
            value={content.backgroundImage || ''}
            onChange={(e) => updateBlockContent(block.id, { ...content, backgroundImage: e.target.value })}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor={`${block.id}-alignment`}>Text Alignment</Label>
            <Select
              value={content.alignment || 'center'}
              onValueChange={(value) => updateBlockContent(block.id, { ...content, alignment: value as any })}
            >
              <SelectTrigger id={`${block.id}-alignment`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="left">Left</SelectItem>
                <SelectItem value="center">Center</SelectItem>
                <SelectItem value="right">Right</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor={`${block.id}-overlay`}>Overlay Opacity</Label>
            <Input
              id={`${block.id}-overlay`}
              type="number"
              min="0"
              max="100"
              value={content.overlayOpacity || 50}
              onChange={(e) => updateBlockContent(block.id, { ...content, overlayOpacity: parseInt(e.target.value) })}
            />
          </div>
        </div>
      </div>
    );
  };

  const TextBlockEditor = ({ block }: { block: ContentBlock }) => {
    const content = block.content as TextBlockContent;
    
    return (
      <div className="space-y-4">
        <div>
          <Label htmlFor={`${block.id}-text`}>Content</Label>
          <Textarea
            id={`${block.id}-text`}
            value={content.text}
            onChange={(e) => updateBlockContent(block.id, { ...content, text: e.target.value })}
            placeholder="Enter your text content..."
            rows={8}
            className="font-mono text-sm"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Basic HTML is supported (p, h1-h6, ul, ol, li, strong, em, a)
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor={`${block.id}-columns`}>Columns</Label>
            <Select
              value={content.columns?.toString() || '1'}
              onValueChange={(value) => updateBlockContent(block.id, { ...content, columns: parseInt(value) as any })}
            >
              <SelectTrigger id={`${block.id}-columns`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Column</SelectItem>
                <SelectItem value="2">2 Columns</SelectItem>
                <SelectItem value="3">3 Columns</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor={`${block.id}-align`}>Alignment</Label>
            <Select
              value={content.alignment || 'left'}
              onValueChange={(value) => updateBlockContent(block.id, { ...content, alignment: value as any })}
            >
              <SelectTrigger id={`${block.id}-align`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="left">Left</SelectItem>
                <SelectItem value="center">Center</SelectItem>
                <SelectItem value="right">Right</SelectItem>
                <SelectItem value="justify">Justify</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    );
  };

  const RVShowcaseBlockEditor = ({ block }: { block: ContentBlock }) => {
    const content = block.content as RVShowcaseBlockContent;
    
    return (
      <div className="space-y-4">
        <div>
          <Label htmlFor={`${block.id}-title`}>Title (Optional)</Label>
          <Input
            id={`${block.id}-title`}
            value={content.title || ''}
            onChange={(e) => updateBlockContent(block.id, { ...content, title: e.target.value })}
            placeholder="Featured RVs"
          />
        </div>
        
        <div>
          <Label htmlFor={`${block.id}-desc`}>Description (Optional)</Label>
          <Textarea
            id={`${block.id}-desc`}
            value={content.description || ''}
            onChange={(e) => updateBlockContent(block.id, { ...content, description: e.target.value })}
            placeholder="Check out our amazing RV selection"
            rows={2}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor={`${block.id}-layout`}>Layout</Label>
            <Select
              value={content.layout}
              onValueChange={(value) => updateBlockContent(block.id, { ...content, layout: value as any })}
            >
              <SelectTrigger id={`${block.id}-layout`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="grid">Grid</SelectItem>
                <SelectItem value="carousel">Carousel</SelectItem>
                <SelectItem value="featured">Featured</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor={`${block.id}-limit`}>Number of RVs</Label>
            <Input
              id={`${block.id}-limit`}
              type="number"
              min="1"
              max="12"
              value={content.limit || 3}
              onChange={(e) => updateBlockContent(block.id, { ...content, limit: parseInt(e.target.value) })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Switch
              id={`${block.id}-pricing`}
              checked={content.showPricing}
              onCheckedChange={(checked) => updateBlockContent(block.id, { ...content, showPricing: checked })}
            />
            <Label htmlFor={`${block.id}-pricing`}>Show Pricing</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id={`${block.id}-availability`}
              checked={content.showAvailability}
              onCheckedChange={(checked) => updateBlockContent(block.id, { ...content, showAvailability: checked })}
            />
            <Label htmlFor={`${block.id}-availability`}>Show Availability</Label>
          </div>
        </div>

        <div>
          <Label>Selected RVs</Label>
          <p className="text-xs text-muted-foreground mt-1">
            RV selection coming soon. For now, the block will show the latest RVs.
          </p>
        </div>
      </div>
    );
  };

  const GalleryBlockEditor = ({ block }: { block: ContentBlock }) => {
    const content = block.content as GalleryBlockContent;
    
    return (
      <div className="space-y-4">
        <div>
          <Label htmlFor={`${block.id}-title`}>Title (Optional)</Label>
          <Input
            id={`${block.id}-title`}
            value={content.title || ''}
            onChange={(e) => updateBlockContent(block.id, { ...content, title: e.target.value })}
            placeholder="Image Gallery"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor={`${block.id}-layout`}>Layout</Label>
            <Select
              value={content.layout}
              onValueChange={(value) => updateBlockContent(block.id, { ...content, layout: value as any })}
            >
              <SelectTrigger id={`${block.id}-layout`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="grid">Grid</SelectItem>
                <SelectItem value="masonry">Masonry</SelectItem>
                <SelectItem value="carousel">Carousel</SelectItem>
                <SelectItem value="slider">Slider</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor={`${block.id}-columns`}>Columns</Label>
            <Select
              value={content.columns.toString()}
              onValueChange={(value) => updateBlockContent(block.id, { ...content, columns: parseInt(value) as any })}
            >
              <SelectTrigger id={`${block.id}-columns`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2">2 Columns</SelectItem>
                <SelectItem value="3">3 Columns</SelectItem>
                <SelectItem value="4">4 Columns</SelectItem>
                <SelectItem value="5">5 Columns</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor={`${block.id}-spacing`}>Spacing</Label>
          <Select
            value={content.spacing || 'medium'}
            onValueChange={(value) => updateBlockContent(block.id, { ...content, spacing: value as any })}
          >
            <SelectTrigger id={`${block.id}-spacing`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="small">Small</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="large">Large</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Images</Label>
          <p className="text-xs text-muted-foreground mt-1">
            Image selection coming soon. Integration with media library will be added.
          </p>
        </div>
      </div>
    );
  };

  const CTABlockEditor = ({ block }: { block: ContentBlock }) => {
    const content = block.content as CTABlockContent;
    
    return (
      <div className="space-y-4">
        <div>
          <Label htmlFor={`${block.id}-title`}>Title</Label>
          <Input
            id={`${block.id}-title`}
            value={content.title}
            onChange={(e) => updateBlockContent(block.id, { ...content, title: e.target.value })}
            placeholder="Ready to Start Your Adventure?"
          />
        </div>
        
        <div>
          <Label htmlFor={`${block.id}-desc`}>Description (Optional)</Label>
          <Textarea
            id={`${block.id}-desc`}
            value={content.description || ''}
            onChange={(e) => updateBlockContent(block.id, { ...content, description: e.target.value })}
            placeholder="Book your perfect RV today"
            rows={2}
          />
        </div>

        <div>
          <Label htmlFor={`${block.id}-bg-color`}>Background Color</Label>
          <Input
            id={`${block.id}-bg-color`}
            value={content.backgroundColor || ''}
            onChange={(e) => updateBlockContent(block.id, { ...content, backgroundColor: e.target.value })}
            placeholder="#F59E0B"
          />
        </div>

        <div>
          <Label htmlFor={`${block.id}-bg-image`}>Background Image URL (Optional)</Label>
          <Input
            id={`${block.id}-bg-image`}
            value={content.backgroundImage || ''}
            onChange={(e) => updateBlockContent(block.id, { ...content, backgroundImage: e.target.value })}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div>
          <Label>Call-to-Action Button</Label>
          {content.buttons.length > 0 && (
            <div className="space-y-2 mt-2">
              <Input
                value={content.buttons[0].text}
                onChange={(e) => updateBlockContent(block.id, { 
                  ...content, 
                  buttons: [{ ...content.buttons[0], text: e.target.value }] 
                })}
                placeholder="Button Text"
              />
              <Input
                value={content.buttons[0].link}
                onChange={(e) => updateBlockContent(block.id, { 
                  ...content, 
                  buttons: [{ ...content.buttons[0], link: e.target.value }] 
                })}
                placeholder="Button Link"
              />
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/pages">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Edit Page</h1>
            <p className="text-muted-foreground">
              {page.title}
            </p>
          </div>
        </div>
        
        <div className="flex gap-2">
          {page.status === 'published' && (
            <Link href={`/${page.slug}`} target="_blank">
              <Button variant="outline">
                <Eye className="mr-2 h-4 w-4" />
                View Page
              </Button>
            </Link>
          )}
          <Button onClick={handleSave} disabled={saving}>
            <Save className="mr-2 h-4 w-4" />
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      {/* Page Editor Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>

        {/* General Tab */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Page Information</CardTitle>
              <CardDescription>
                Basic details about your page
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Page Title</Label>
                <Input
                  id="title"
                  value={page.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Enter page title"
                />
              </div>

              <div>
                <Label htmlFor="slug">URL Slug</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">/</span>
                  <Input
                    id="slug"
                    value={page.slug}
                    onChange={(e) => updatePageField('slug', e.target.value)}
                    placeholder="page-url"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="template">Page Template</Label>
                <Select
                  value={page.template}
                  onValueChange={(value) => updatePageField('template', value as PageTemplate)}
                >
                  <SelectTrigger id="template">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="landing">Landing Page</SelectItem>
                    <SelectItem value="contact">Contact</SelectItem>
                    <SelectItem value="about">About Us</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={page.status}
                  onValueChange={(value) => updatePageField('status', value)}
                >
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Content Tab */}
        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Page Content</CardTitle>
              <CardDescription>
                Build your page with content blocks
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Add Block Buttons */}
              <div className="mb-6 flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addContentBlock('hero')}
                >
                  <ImageIcon className="mr-2 h-4 w-4" />
                  Add Hero
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addContentBlock('text')}
                >
                  <Type className="mr-2 h-4 w-4" />
                  Add Text
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addContentBlock('rv-showcase')}
                >
                  <Car className="mr-2 h-4 w-4" />
                  Add RV Showcase
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addContentBlock('gallery')}
                >
                  <Grid className="mr-2 h-4 w-4" />
                  Add Gallery
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addContentBlock('cta')}
                >
                  <Megaphone className="mr-2 h-4 w-4" />
                  Add CTA
                </Button>
              </div>

              {/* Content Blocks */}
              <div className="space-y-4">
                {page.content.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Layers className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No content blocks yet</p>
                    <p className="text-sm">Click the buttons above to add content</p>
                  </div>
                ) : (
                  page.content.map((block, index) => (
                    <Card key={block.id} className="relative">
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {block.type === 'hero' && <ImageIcon className="h-4 w-4" />}
                            {block.type === 'text' && <Type className="h-4 w-4" />}
                            {block.type === 'rv-showcase' && <Car className="h-4 w-4" />}
                            {block.type === 'gallery' && <Grid className="h-4 w-4" />}
                            {block.type === 'cta' && <Megaphone className="h-4 w-4" />}
                            <span className="font-medium capitalize">{block.type} Block</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => moveBlock(block.id, 'up')}
                              disabled={index === 0}
                            >
                              <MoveUp className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => moveBlock(block.id, 'down')}
                              disabled={index === page.content.length - 1}
                            >
                              <MoveDown className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-600"
                              onClick={() => deleteBlock(block.id)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {block.type === 'hero' && <HeroBlockEditor block={block} />}
                        {block.type === 'text' && <TextBlockEditor block={block} />}
                        {block.type === 'rv-showcase' && <RVShowcaseBlockEditor block={block} />}
                        {block.type === 'gallery' && <GalleryBlockEditor block={block} />}
                        {block.type === 'cta' && <CTABlockEditor block={block} />}
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SEO Tab */}
        <TabsContent value="seo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
              <CardDescription>
                Optimize your page for search engines
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="metaTitle">Meta Title</Label>
                <Input
                  id="metaTitle"
                  value={page.seo.metaTitle}
                  onChange={(e) => updateSEOField('metaTitle', e.target.value)}
                  placeholder={page.title || 'Page title'}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {page.seo.metaTitle.length}/60 characters
                </p>
              </div>

              <div>
                <Label htmlFor="metaDescription">Meta Description</Label>
                <Textarea
                  id="metaDescription"
                  value={page.seo.metaDescription}
                  onChange={(e) => updateSEOField('metaDescription', e.target.value)}
                  placeholder="Brief description of your page"
                  rows={3}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {page.seo.metaDescription.length}/160 characters
                </p>
              </div>

              <div>
                <Label htmlFor="keywords">Keywords</Label>
                <Input
                  id="keywords"
                  value={page.seo.keywords.join(', ')}
                  onChange={(e) => updateSEOField('keywords', e.target.value.split(',').map(k => k.trim()).filter(k => k))}
                  placeholder="keyword1, keyword2, keyword3"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Separate keywords with commas
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
