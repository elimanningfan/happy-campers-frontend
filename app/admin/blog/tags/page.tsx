'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save,
  X,
  Tag as TagIcon,
  TrendingUp
} from 'lucide-react';
import { tags as initialTags } from '@/data/blog-posts';
import { Tag } from '@/types/blog';

export default function TagManagementPage() {
  const [tags, setTags] = useState(initialTags);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [bulkAddInput, setBulkAddInput] = useState('');
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    slug: ''
  });

  // Generate slug from name
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  const handleNameChange = (value: string) => {
    setFormData({
      name: value,
      slug: generateSlug(value)
    });
  };

  const handleAdd = () => {
    setIsAddingNew(true);
    setEditingId(null);
    setFormData({
      name: '',
      slug: ''
    });
  };

  const handleEdit = (tag: Tag) => {
    setEditingId(tag.id);
    setIsAddingNew(false);
    setFormData({
      name: tag.name,
      slug: tag.slug
    });
  };

  const handleSave = () => {
    if (isAddingNew) {
      // Add new tag
      const newTag: Tag = {
        id: `tag-${Date.now()}`,
        name: formData.name,
        slug: formData.slug,
        postCount: 0
      };
      setTags([...tags, newTag]);
      console.log('Adding tag:', newTag);
    } else if (editingId) {
      // Update existing tag
      setTags(tags.map(tag =>
        tag.id === editingId
          ? { ...tag, ...formData }
          : tag
      ));
      console.log('Updating tag:', editingId, formData);
    }
    
    // Reset form
    setIsAddingNew(false);
    setEditingId(null);
    setFormData({
      name: '',
      slug: ''
    });
  };

  const handleCancel = () => {
    setIsAddingNew(false);
    setEditingId(null);
    setFormData({
      name: '',
      slug: ''
    });
  };

  const handleDelete = (tagId: string) => {
    if (window.confirm('Are you sure you want to delete this tag? Posts using this tag will need to be updated.')) {
      setTags(tags.filter(tag => tag.id !== tagId));
      console.log('Deleting tag:', tagId);
    }
  };

  const handleBulkAdd = () => {
    const tagNames = bulkAddInput
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);
    
    const newTags = tagNames.map(name => ({
      id: `tag-${Date.now()}-${Math.random()}`,
      name,
      slug: generateSlug(name),
      postCount: 0
    }));
    
    setTags([...tags, ...newTags]);
    setBulkAddInput('');
    console.log('Bulk adding tags:', newTags);
  };

  // Sort tags by usage for the cloud view
  const sortedTags = [...tags].sort((a, b) => b.postCount - a.postCount);
  const maxPostCount = Math.max(...tags.map(t => t.postCount), 1);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Tags</h1>
          <p className="text-gray-600 mt-2">Manage blog post tags</p>
        </div>
        <Button onClick={handleAdd} disabled={isAddingNew || editingId !== null}>
          <Plus className="h-4 w-4 mr-2" />
          Add Tag
        </Button>
      </div>

      {/* Bulk Add Tags */}
      <Card>
        <CardHeader>
          <CardTitle>Bulk Add Tags</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              value={bulkAddInput}
              onChange={(e) => setBulkAddInput(e.target.value)}
              placeholder="Enter tags separated by commas (e.g., camping, road trip, family)"
              className="flex-1"
            />
            <Button 
              onClick={handleBulkAdd}
              disabled={!bulkAddInput.trim()}
            >
              Add Tags
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Form */}
      {(isAddingNew || editingId) && (
        <Card>
          <CardHeader>
            <CardTitle>
              {isAddingNew ? 'Add New Tag' : 'Edit Tag'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="name">Tag Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="e.g., Road Trip"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="slug">URL Slug</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="road-trip"
                    className="mt-1"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    URL: /blog/tag/{formData.slug || 'slug'}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={handleSave}
                  disabled={!formData.name || !formData.slug}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tag Cloud Visualization */}
      <Card>
        <CardHeader>
          <CardTitle>Tag Cloud</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {sortedTags.map((tag) => {
              // Calculate relative size based on post count
              const sizePercent = (tag.postCount / maxPostCount) * 100;
              const fontSize = Math.max(0.75, Math.min(2, 0.75 + (sizePercent / 100) * 1.25));
              
              return (
                <button
                  key={tag.id}
                  onClick={() => handleEdit(tag)}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors cursor-pointer"
                  style={{ fontSize: `${fontSize}rem` }}
                >
                  {tag.name}
                  <span className="ml-1 text-xs text-gray-500">({tag.postCount})</span>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Tags Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead className="text-center">Posts</TableHead>
                <TableHead className="text-center">Popularity</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tags.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                    No tags found. Add your first tag to get started.
                  </TableCell>
                </TableRow>
              ) : (
                tags.map((tag) => {
                  const popularity = maxPostCount > 0 ? (tag.postCount / maxPostCount) * 100 : 0;
                  
                  return (
                    <TableRow key={tag.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <TagIcon className="h-4 w-4 text-gray-400" />
                          <span className="font-medium">{tag.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                          {tag.slug}
                        </code>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="text-sm">{tag.postCount}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-2">
                          <TrendingUp className="h-4 w-4 text-gray-400" />
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full transition-all"
                              style={{ width: `${popularity}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-500">{Math.round(popularity)}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(tag)}
                            disabled={editingId !== null || isAddingNew}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:text-red-700"
                            onClick={() => handleDelete(tag.id)}
                            disabled={editingId !== null || isAddingNew}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
