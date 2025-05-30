// Dynamic CMS Page Route
// Renders pages created in the CMS

import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getPageBySlug, loadPages } from '@/lib/utils/page-storage';
import { PageRenderer } from '@/components/page-renderer';
import Header from '@/components/header';
import Footer from '@/components/footer';

interface PageProps {
  params: {
    slug: string;
  };
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = getPageBySlug(params.slug);
  
  if (!page) {
    return {
      title: 'Page Not Found',
    };
  }

  return {
    title: page.seo.metaTitle || page.title,
    description: page.seo.metaDescription,
    keywords: page.seo.keywords.join(', '),
    openGraph: {
      title: page.seo.metaTitle || page.title,
      description: page.seo.metaDescription,
      type: 'website',
      images: page.seo.ogImage ? [page.seo.ogImage] : [],
    },
  };
}

// Generate static params for all published pages
export function generateStaticParams() {
  const pages = loadPages();
  
  return pages
    .filter(page => page.status === 'published')
    .map(page => ({
      slug: page.slug,
    }));
}

export default function CMSPage({ params }: PageProps) {
  const page = getPageBySlug(params.slug);

  if (!page || page.status !== 'published') {
    notFound();
  }

  return (
    <>
      <Header />
      <main>
        <PageRenderer page={page} />
      </main>
      <Footer />
    </>
  );
}
