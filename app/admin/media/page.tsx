'use client';

import { useState, useMemo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Upload, 
  Search, 
  Grid3X3, 
  List, 
  Download, 
  Trash2, 
  FolderOpen,
  Image as ImageIcon,
  X,
  Check,
  Filter,
  CloudUpload,
  FileImage
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { initialMediaLibrary, mediaCategories } from '@/lib/data/media-library';
import { MediaItem, MediaCategory } from '@/lib/types/media';

export default function MediaLibraryPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<MediaCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadCategory, setUploadCategory] = useState<MediaCategory>('misc');

  // Filter media based on category and search
  const filteredMedia = useMemo(() => {
    let filtered = initialMediaLibrary;

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query) ||
        item.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [selectedCategory, searchQuery]);

  const toggleItemSelection = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const selectAll = () => {
    setSelectedItems(filteredMedia.map(item => item.id));
  };

  const clearSelection = () => {
    setSelectedItems([]);
    setIsSelecting(false);
  };

  // Drag and drop handlers
  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('image/')
    );

    if (files.length > 0) {
      setUploadedFiles(files);
      setIsUploadOpen(true);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter(file => 
      file.type.startsWith('image/')
    );
    
    if (files.length > 0) {
      setUploadedFiles(files);
      setIsUploadOpen(true);
    }
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      uploadedFiles.forEach(file => {
        formData.append('files', file);
      });
      formData.append('category', uploadCategory);

      const response = await fetch('/api/media/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const result = await response.json();
      console.log('Upload successful:', result);
      
      // Close dialog and refresh
      setIsUploadOpen(false);
      setUploadedFiles([]);
      
      // In a real app, you would refresh the media library here
      // For now, we'll just reload the page
      window.location.reload();
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload images. Please try again.');
    }
  };

  const renderMediaItem = (item: MediaItem) => {
    const isSelected = selectedItems.includes(item.id);

    if (view === 'grid') {
      return (
        <div
          key={item.id}
          className={cn(
            "relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all",
            isSelected ? "border-primary-orange" : "border-transparent hover:border-gray-300"
          )}
          onClick={() => isSelecting && toggleItemSelection(item.id)}
        >
          {/* Selection checkbox */}
          {isSelecting && (
            <div className="absolute top-2 left-2 z-10">
              <Checkbox
                checked={isSelected}
                onCheckedChange={() => toggleItemSelection(item.id)}
                className="bg-white"
              />
            </div>
          )}

          {/* Image */}
          <div className="aspect-square bg-gray-100 relative overflow-hidden">
            <img
              src={item.thumbnailUrl || item.url}
              alt={item.altText}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = '/images/placeholder-image.png';
              }}
            />
            
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="flex gap-2">
                <Button size="sm" variant="secondary">
                  View
                </Button>
                <Button size="sm" variant="secondary">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="p-3">
            <p className="text-sm font-medium truncate">{item.name}</p>
            <p className="text-xs text-gray-500 truncate">{item.fileName}</p>
            <div className="flex gap-1 mt-2">
              {item.tags.slice(0, 2).map(tag => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {item.tags.length > 2 && (
                <Badge variant="secondary" className="text-xs">
                  +{item.tags.length - 2}
                </Badge>
              )}
            </div>
          </div>
        </div>
      );
    }

    // List view
    return (
      <div
        key={item.id}
        className={cn(
          "flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all",
          isSelected ? "border-primary-orange bg-orange-50" : "border-gray-200 hover:border-gray-300"
        )}
        onClick={() => isSelecting && toggleItemSelection(item.id)}
      >
        {isSelecting && (
          <Checkbox
            checked={isSelected}
            onCheckedChange={() => toggleItemSelection(item.id)}
          />
        )}

        <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
          <img
            src={item.thumbnailUrl || item.url}
            alt={item.altText}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = '/images/placeholder-image.png';
            }}
          />
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-medium truncate">{item.name}</p>
          <p className="text-sm text-gray-500 truncate">{item.fileName}</p>
          <div className="flex gap-1 mt-1">
            {item.tags.slice(0, 3).map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div className="text-sm text-gray-500 text-right">
          <p>{(item.size / 1024 / 1024).toFixed(1)} MB</p>
          {item.dimensions && (
            <p>{item.dimensions.width} × {item.dimensions.height}</p>
          )}
        </div>

        <div className="flex gap-2">
          <Button size="sm" variant="ghost">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div 
      className="space-y-6"
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {/* Drag overlay */}
      {isDragging && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 flex flex-col items-center space-y-4">
            <CloudUpload className="h-16 w-16 text-primary-orange" />
            <p className="text-xl font-semibold">Drop images here to upload</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Media Library</h1>
          <p className="text-gray-600 mt-1">Manage images and media files for your website</p>
        </div>
        
        <div className="flex items-center gap-2">
          <label htmlFor="file-upload">
            <Button className="bg-primary-orange hover:bg-primary-orange/90 cursor-pointer">
              <Upload className="h-4 w-4 mr-2" />
              Upload Images
            </Button>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              accept="image/*"
              multiple
              onChange={handleFileSelect}
            />
          </label>
        </div>
      </div>

      {/* Search and Actions Bar */}
      <div className="bg-white rounded-lg border p-4">
        <div className="flex gap-4 items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search media..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            {!isSelecting ? (
              <Button 
                variant="outline"
                onClick={() => setIsSelecting(true)}
              >
                Select
              </Button>
            ) : (
              <>
                <Button 
                  variant="outline"
                  onClick={selectAll}
                >
                  Select All
                </Button>
                <Button 
                  variant="outline"
                  onClick={clearSelection}
                >
                  <X className="h-4 w-4 mr-1" />
                  Cancel
                </Button>
                {selectedItems.length > 0 && (
                  <Button 
                    variant="outline"
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete ({selectedItems.length})
                  </Button>
                )}
              </>
            )}
            
            <div className="flex border rounded-md">
              <Button
                variant={view === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setView('grid')}
                className="rounded-r-none"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={view === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setView('list')}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories and Content */}
      <div className="flex gap-6">
        {/* Categories Sidebar */}
        <div className="w-64 flex-shrink-0">
          <div className="bg-white rounded-lg border p-4">
            <h3 className="font-semibold mb-4">Categories</h3>
            <div className="space-y-1">
              <button
                className={cn(
                  "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                  selectedCategory === 'all' 
                    ? "bg-forest-green text-white" 
                    : "hover:bg-gray-100"
                )}
                onClick={() => setSelectedCategory('all')}
              >
                All Files ({initialMediaLibrary.length})
              </button>
              
              {mediaCategories.map(category => (
                <div key={category.id}>
                  <button
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center justify-between",
                      selectedCategory === category.id 
                        ? "bg-forest-green text-white" 
                        : "hover:bg-gray-100"
                    )}
                    onClick={() => setSelectedCategory(category.id as MediaCategory)}
                  >
                    <span>
                      {category.icon} {category.name}
                    </span>
                    <span className="text-xs">
                      {initialMediaLibrary.filter(item => 
                        item.category.startsWith(category.id)
                      ).length}
                    </span>
                  </button>
                  
                  {/* Subcategories */}
                  {'subcategories' in category && category.subcategories?.map(sub => (
                    <button
                      key={sub.id}
                      className={cn(
                        "w-full text-left px-6 py-2 rounded-md text-sm transition-colors",
                        selectedCategory === sub.id 
                          ? "bg-forest-green text-white" 
                          : "hover:bg-gray-100"
                      )}
                      onClick={() => setSelectedCategory(sub.id as MediaCategory)}
                    >
                      {sub.name} (
                      {initialMediaLibrary.filter(item => 
                        item.category === sub.id
                      ).length})
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Media Grid/List */}
        <div className="flex-1">
          {filteredMedia.length === 0 ? (
            <div className="bg-white rounded-lg border p-12 text-center">
              <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No media files found</p>
              <p className="text-sm text-gray-500 mt-1">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className={cn(
              view === 'grid' 
                ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
                : "space-y-2"
            )}>
              {filteredMedia.map(item => renderMediaItem(item))}
            </div>
          )}
        </div>
      </div>

      {/* Upload Dialog */}
      <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Upload Images</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Preview uploaded files */}
            <div className="grid grid-cols-3 gap-4">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="relative group">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setUploadedFiles(files => files.filter((_, i) => i !== index))}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs mt-1 truncate">{file.name}</p>
                </div>
              ))}
            </div>

            {/* Category selection */}
            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={uploadCategory} onValueChange={(value) => setUploadCategory(value as MediaCategory)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {mediaCategories.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.icon} {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Upload button */}
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsUploadOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleUpload}
                className="bg-primary-orange hover:bg-primary-orange/90"
                disabled={uploadedFiles.length === 0}
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload {uploadedFiles.length} {uploadedFiles.length === 1 ? 'Image' : 'Images'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
