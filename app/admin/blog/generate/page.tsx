'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function GenerateBlogPost() {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    topic: '',
    primaryKeyword: '',
    secondaryKeywords: '',
    category: 'destination-guides'
  });

  const handleGenerate = async () => {
    if (!formData.topic || !formData.primaryKeyword) {
      setError('Please fill in all required fields');
      return;
    }

    setIsGenerating(true);
    setError('');

    try {
      const response = await fetch('/api/blog/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to generate blog post');
      }

      const data = await response.json();
      
      // Redirect to the new blog post editor with the generated content
      router.push(`/admin/blog/posts/new?generated=${encodeURIComponent(JSON.stringify(data))}`);
    } catch (err) {
      setError('Failed to generate blog post. Please try again.');
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-purple-500" />
            AI Blog Post Generator
          </CardTitle>
          <CardDescription>
            Use AI to generate high-quality, SEO-optimized blog posts for Happy Campers RV Rentals
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="topic">Topic *</Label>
            <Textarea
              id="topic"
              placeholder="Enter the main topic for the blog post (e.g., 'Best RV Camping Spots Near Bend, Oregon')"
              value={formData.topic}
              onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
              className="min-h-[100px]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="primaryKeyword">Primary Keyword *</Label>
            <Input
              id="primaryKeyword"
              placeholder="Enter the primary SEO keyword (e.g., 'RV camping Bend Oregon')"
              value={formData.primaryKeyword}
              onChange={(e) => setFormData({ ...formData, primaryKeyword: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="secondaryKeywords">Secondary Keywords</Label>
            <Textarea
              id="secondaryKeywords"
              placeholder="Enter secondary keywords separated by commas (e.g., 'Oregon RV rentals, Bend camping, RV travel tips')"
              value={formData.secondaryKeywords}
              onChange={(e) => setFormData({ ...formData, secondaryKeywords: e.target.value })}
              className="min-h-[80px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
            >
              <SelectTrigger id="category">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="destination-guides">Destination Guides</SelectItem>
                <SelectItem value="rv-selection-guides">RV Selection Guides</SelectItem>
                <SelectItem value="how-to-content">How-To Content</SelectItem>
                <SelectItem value="travel-tips">Travel Tips</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">What happens next?</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• AI will generate a comprehensive blog post based on your inputs</li>
              <li>• The post will include relevant RV models from our inventory</li>
              <li>• Images from our media library will be automatically selected</li>
              <li>• You'll be able to review and edit before publishing</li>
            </ul>
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="flex-1"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Blog Post
                </>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push('/admin/blog')}
              disabled={isGenerating}
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
