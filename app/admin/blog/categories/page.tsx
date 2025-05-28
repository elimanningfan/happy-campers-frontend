'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
  BarChart3
} from 'lucide-react';
import { categories as initialCategories } from '@/data/blog-posts';
import { Category } from '@/types/blog';

export default function CategoryManagementPage() {
  const [categories, setCategories] = useState(initialCategories);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: ''
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
      ...formData,
      name: value,
      slug: generateSlug(value)
    });
  };

  const handleAdd = () => {
    setIsAddingNew(true);
    setEditingId(null);
    setFormData({
      name: '',
      slug: '',
      description: ''
    });
  };

  const handleEdit = (category: Category) => {
    setEditingId(category.id);
    setIsAddingNew(false);
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description || ''
    });
  };

  const handleSave = () => {
    if (isAddingNew) {
      // Add new category
      const newCategory: Category = {
        id: `cat-${Date.now()}`,
        name: formData.name,
        slug: formData.slug,
        description: formData.description,
        postCount: 0
      };
      setCategories([...categories, newCategory]);
      console.log('Adding category:', newCategory);
    } else if (editingId) {
      // Update existing category
      setCategories(categories.map(cat =>
        cat.id === editingId
          ? { ...cat, ...formData }
          : cat
      ));
      console.log('Updating category:', editingId, formData);
    }
    
    // Reset form
    setIsAddingNew(false);
    setEditingId(null);
    setFormData({
      name: '',
      slug: '',
      description: ''
    });
  };

  const handleCancel = () => {
    setIsAddingNew(false);
    setEditingId(null);
    setFormData({
      name: '',
      slug: '',
      description: ''
    });
  };

  const handleDelete = (categoryId: string) => {
    if (window.confirm('Are you sure you want to delete this category? Posts using this category will need to be updated.')) {
      setCategories(categories.filter(cat => cat.id !== categoryId));
      console.log('Deleting category:', categoryId);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Categories</h1>
          <p className="text-gray-600 mt-2">Manage blog post categories</p>
        </div>
        <Button onClick={handleAdd} disabled={isAddingNew || editingId !== null}>
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      {/* Add/Edit Form */}
      {(isAddingNew || editingId) && (
        <Card>
          <CardHeader>
            <CardTitle>
              {isAddingNew ? 'Add New Category' : 'Edit Category'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="name">Category Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="e.g., RV Tips"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="slug">URL Slug</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="rv-tips"
                    className="mt-1"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    URL: /blog/category/{formData.slug || 'slug'}
                  </p>
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of this category"
                  rows={3}
                  className="mt-1"
                />
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

      {/* Categories Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-center">Posts</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                    No categories found. Add your first category to get started.
                  </TableCell>
                </TableRow>
              ) : (
                categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>
                      <div className="font-medium">{category.name}</div>
                    </TableCell>
                    <TableCell>
                      <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                        {category.slug}
                      </code>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-600">
                        {category.description || 'No description'}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <BarChart3 className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{category.postCount}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(category)}
                          disabled={editingId !== null || isAddingNew}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleDelete(category.id)}
                          disabled={editingId !== null || isAddingNew}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Category Usage Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Category Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {categories
              .sort((a, b) => b.postCount - a.postCount)
              .map((category) => {
                const maxPosts = Math.max(...categories.map(c => c.postCount), 1);
                const percentage = (category.postCount / maxPosts) * 100;
                
                return (
                  <div key={category.id}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">{category.name}</span>
                      <span className="text-sm text-gray-600">{category.postCount} posts</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
