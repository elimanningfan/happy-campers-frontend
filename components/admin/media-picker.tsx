'use client';

import { useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Search, Check, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MediaItem, MediaCategory } from '@/lib/types/media';
import { initialMediaLibrary, mediaCategories } from '@/lib/data/media-library';

interface MediaPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (media: MediaItem) => void;
  selectedId?: string;
  title?: string;
}

export function MediaPicker({
  isOpen,
  onClose,
  onSelect,
  selectedId,
  title = "Select Media"
}: MediaPickerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<MediaCategory | 'all'>('all');

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

  const handleSelect = (item: MediaItem) => {
    onSelect(item);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search media..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Categories */}
          <Tabs 
            value={selectedCategory} 
            onValueChange={(value) => setSelectedCategory(value as MediaCategory | 'all')}
          >
            <TabsList className="grid grid-cols-4 lg:grid-cols-8 h-auto">
              <TabsTrigger value="all" className="text-xs">
                All
              </TabsTrigger>
              {mediaCategories.map(category => (
                <TabsTrigger key={category.id} value={category.id} className="text-xs">
                  <span className="mr-1">{category.icon}</span>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={selectedCategory} className="mt-4">
              {/* Media Grid */}
              <div className="grid grid-cols-3 md:grid-cols-4 gap-4 max-h-[400px] overflow-y-auto">
                {filteredMedia.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    className={cn(
                      "relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all",
                      selectedId === item.id 
                        ? "border-primary-orange" 
                        : "border-transparent hover:border-gray-300"
                    )}
                  >
                    {/* Selected indicator */}
                    {selectedId === item.id && (
                      <div className="absolute top-2 right-2 z-10 bg-primary-orange text-white rounded-full p-1">
                        <Check className="h-4 w-4" />
                      </div>
                    )}

                    {/* Image */}
                    <div className="aspect-square relative">
                      <img
                        src={item.thumbnailUrl || item.url}
                        alt={item.altText}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = '/images/placeholder-image.png';
                        }}
                      />
                      
                      {/* Overlay with info */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-0 left-0 right-0 p-2 text-white">
                          <p className="text-xs font-medium truncate">{item.name}</p>
                          {item.dimensions && (
                            <p className="text-xs opacity-80">
                              {item.dimensions.width} × {item.dimensions.height}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {filteredMedia.length === 0 && (
                  <div className="col-span-full text-center py-12 text-gray-500">
                    <ImageIcon className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>No media found</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
