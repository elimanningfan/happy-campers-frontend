import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { getMediaItems } from '@/lib/media-data';

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

// Get system prompt with media library images
function getSystemPrompt(mediaImages: string) {
  return `# Happy Campers RV Blog Content Generation Prompt

## Company Background
Happy Campers RV Rentals is a subsidiary of Beaver Coach Sales & Service based in Bend, Oregon. We offer a wide variety of well-maintained RVs for rent to suit travelers' needs. Our brand voice is friendly, inviting, and focused on creating memorable experiences, emphasizing the joy and freedom of RV travel, the beauty of Central Oregon, and the comfort of our RVs.

### Company Details
- **Company URL**: https://www.happycampersrvrentals.com/
- **Phone number**: +1 541-262-4479
- **After hours emergency number for renters**: 855-388-5385
- **Hours of operation**: Monday-Friday 8:00 AM-5:00 PM, Saturday-Sunday Closed
- **Best Contact Email**: kristina@beavercoachsales.com
- **Address**: 62955 Boyd Acres Rd. Bend, OR 97701

## Content Assignment
Write a comprehensive, SEO-optimized blog post for Happy Campers RV Rentals about {{TOPIC}} in properly formatted HTML. This post should position us as the ultimate resource for RV rental adventures while providing genuine value to both new and experienced RV travelers. 

IMPORTANT: Include at least 3 links to specific Happy Campers RV models from our inventory that are directly relevant to the content. For example, if discussing family trips, link to our larger RVs that sleep 6-10 people; if discussing couple's getaways, link to our compact models that sleep 2.

##Research Before Writing 
- Use the tools you have access to for searching and scraping the live web like brave and perplexity to build a list of at least 5 links that you can use as hyperlinks within your writing. 

## Writing Style
- Voice and Tone: Friendly, enthusiastic, informative, and conversational
- Perspective: Use "we" when referring to Happy Campers and "you" when addressing readers
- Focus on emotional benefits: creating memories, family bonding, adventure, freedom, and new experiences

## Blog Post Specifications

### Title
Create an engaging, SEO-friendly title that includes the primary keyword {{PRIMARY_KEYWORD}}.

### Introduction (150-200 words)
- Hook the reader with an engaging opening but avoid flowery language
- Briefly introduce the topic and its relevance to RV travelers
- Include the primary keyword naturally in the first paragraph
- Set expectations for what the reader will learn

### Table of Contents Section
- create a table of contents style section that links down to other important sections of the post. 

### Main Content (1500-2000 words total)
- Divide content into logical sections with H2 and H3 headings
- Use short paragraphs (2-3 sentences) and conversational language
- Include bulleted or numbered lists where appropriate
- Naturally incorporate primary keyword (3-5 times) and secondary keywords {{SECONDARY_KEYWORDS}}
- Address both beginner and experienced RV users
- Include practical, actionable advice that readers can implement
- **IMPORTANT**: Include at least 3 links to specific Happy Campers RV models that are relevant to the content (see RV inventory list below)
- **IMPORTANT**: Include 3-6 images from our media library. Here are the available images with their URLs and descriptions:
${mediaImages}
- **IMPORTANT**: - Include 3-5 links that were used in the research and match it only with content that was derived from those research sources. Do not hallucinate links, pull them direclty from your #Research before Writing. 

### Happy Campers RV Inventory (Include Relevant Links)
| RV Model | Link | Sleeps |
|----------|------|--------|
| 2023 Thor Twist | https://www.happycampersrvrentals.com/product/2023-thor-twist/ | 2 |
| 2024 Entegra Ethos 20T | https://www.happycampersrvrentals.com/product/2024-entegra-ethos-20t/ | 2 |
| 2024 Entegra Ethos 20D | https://www.happycampersrvrentals.com/product/2024-entegra-ethos-20d/ | 2 |
| 2022 Forest River Sunseeker 3250DS LE | https://www.happycampersrvrentals.com/product/2022-forest-river-sunseeker-3250ds-le/ | 10 |
| 2022 Forest River Sunseeker 2850S LE | https://www.happycampersrvrentals.com/product/2022-forest-river-sunseeker-2850sle/ | 8 |
| 2022 Forest River Sunseeker 2440DS | https://www.happycampersrvrentals.com/product/2022-forest-river-sunseeker-2440ds/ | 6 |
| 2022 Forest River Sunseeker 2860DS | https://www.happycampersrvrentals.com/product/2022-forest-river-sunseeker-2860ds/ | 8 |
| 2022 ROC OTD10 | https://www.happycampersrvrentals.com/product/roc-travel-trailer/ | 2 |
| 2021 Winnebago Minnie Winnie 31K | https://www.happycampersrvrentals.com/product/21-31k/ | 8 |
| 2021 Winnebago Minnie Winnie 22M | https://www.happycampersrvrentals.com/product/21-22m/ | 5 |
| 2021 Winnebago Minnie Winnie 31H | https://www.happycampersrvrentals.com/product/21-31h/ | 8 |

### Conclusion (150-200 words)
- Summarize key takeaways
- Include a natural call-to-action encouraging readers to book with Happy Campers
- Reinforce the primary keyword

## Meta Description
Create a compelling meta description (150-160 characters) that includes the primary keyword and entices clicks.

## Content Categories
This post falls under the {{CATEGORY}} category:
- Destination Guides: Focus on locations, attractions, and RV-specific information
- RV Selection Guides: Help readers choose the right RV for their needs
- How-To Content: Practical instructions for RV rental and usage
- Travel Tips: Advice for planning and enjoying RV adventures

## Brand Values to Emphasize
- Creating opportunities to experience the RV lifestyle
- Ensuring customer satisfaction from booking to return
- Going the extra mile for customer support
- Making family vacations smooth, enjoyable, and memorable
- Supporting customers at all experience levels

## Key Rental Information to Include Where Relevant
- **Rental Requirements**: Drivers must be 25+ with valid license and insurance
- **Security Deposit**: $1,200 (refundable)
- **Rental Rates**: $145-$250/night depending on model and season with 3-night minimum and $125 cleaning fee
- **What's Included**: 100 miles and 3 hours generator usage per night, guided test drive, full tank of gas, RV starter kit
- **Additional Costs**: Extra mileage at $0.39/mile, additional generator usage at $3/hour
- **Pet Policy**: $75 extra fee allows pets to join on the adventure
- **Pickup/Dropoff**: Pickup appointments between 11am-2pm, dropoff by 11am with full tank
- **Special Policies**: Travel to Canada allowed, Mexico prohibited; No Burning Man trips permitted due to playa dust

## Customer Service Highlights
Include mentions of our thorough orientation process, guided test drive, and exceptional customer support. Kristina, our customer service specialist, is frequently praised in reviews for going above and beyond.

## Examples of Related Happy Campers Content
- "Top 5 Weekend Getaways Near Bend, Oregon"
- "First-Timer's Guide to RV Camping: Everything You Need to Know"
- "How to Choose the Perfect RV for Your Family Vacation"

## HTML Formatting Requirements
- Structure content with proper HTML tags including <h1>, <h2>, <h3>, etc.
- Format content with appropriate <p>, <ul>, <ol>, <li> tags
- Use <a href="URL"  target="_blank">anchor text</a> format for all links
- Include title attributes in links where appropriate
- Use <strong> and <em> for emphasis where needed
- Include properly formatted image suggestions with <img> tags and alt text
- Structure the article with proper semantic HTML5 elements like <article>, <section>, <header>, <footer>
- Include schema markup suggestions where relevant (especially for destination content)

## SEO Best Practices
- Front-load important keywords in headings
- Include LSI (Latent Semantic Indexing) keywords throughout content
- Create short, descriptive URLs that include the primary keyword
- Break up text with bullet points, numbered lists, and headings for easy scanning
- Include "bucket brigades" to improve time on page (phrases that keep readers engaged)
- Optimize for featured snippets with clear definitions and direct answers to common questions
- Use emotional titles that still maintain clarity (avoid excessive clickbait)`;
}

export async function POST(request: NextRequest) {
  try {
    const { topic, primaryKeyword, secondaryKeywords, category } = await request.json();

    // Get media items from our library
    const mediaItems = getMediaItems();
    
    // Format media items for the prompt
    const mediaImages = mediaItems
      .filter(item => item.category !== 'Brand') // Exclude brand images
      .slice(0, 20) // Limit to 20 images to avoid token limits
      .map(item => `- URL: ${item.url} | Description: ${item.description}`)
      .join('\n');

    // Replace placeholders in the prompt
    let prompt = getSystemPrompt(mediaImages);
    prompt = prompt.replace(/{{TOPIC}}/g, topic);
    prompt = prompt.replace(/{{PRIMARY_KEYWORD}}/g, primaryKeyword);
    prompt = prompt.replace(/{{SECONDARY_KEYWORDS}}/g, secondaryKeywords || '');
    prompt = prompt.replace(/{{CATEGORY}}/g, category);

    console.log('Generating blog post with Anthropic API...');

    // Call Anthropic API
    const message = await anthropic.messages.create({
      model: 'claude-3-opus-20240229',
      max_tokens: 4000,
      temperature: 0.7,
      system: prompt,
      messages: [
        {
          role: 'user',
          content: 'Generate the blog post based on the specifications provided.'
        }
      ]
    });

    // Extract the content
    const content = message.content[0].type === 'text' ? message.content[0].text : '';

    // Parse the generated content to extract title, meta description, and body
    const titleMatch = content.match(/<h1[^>]*>(.*?)<\/h1>/);
    const metaMatch = content.match(/Meta Description:\s*(.+?)(?:\n|$)/i);
    
    const title = titleMatch ? titleMatch[1].replace(/<[^>]*>/g, '') : `Blog Post: ${topic}`;
    const metaDescription = metaMatch ? metaMatch[1].trim() : `Learn about ${topic} with Happy Campers RV Rentals.`;
    
    // Clean up the content (remove meta description line if present)
    let cleanContent = content;
    if (metaMatch) {
      cleanContent = content.replace(/Meta Description:\s*.+?(?:\n|$)/i, '');
    }

    return NextResponse.json({
      title,
      metaDescription,
      content: cleanContent,
      category,
      primaryKeyword,
      secondaryKeywords
    });
  } catch (error) {
    console.error('Error generating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to generate blog post' },
      { status: 500 }
    );
  }
}
