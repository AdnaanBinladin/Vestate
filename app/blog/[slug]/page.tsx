'use client'

import { use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { blogPosts } from '@/lib/data'
import { Calendar, Clock, ArrowLeft, Share2, Linkedin, Twitter, Facebook, Tag } from 'lucide-react'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default function BlogPostPage({ params }: PageProps) {
  const { slug } = use(params)
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = blogPosts.filter((p) => p.id !== post.id).slice(0, 2)

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Insights</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm mb-6">
              <span className="text-gold">{post.category}</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readTime} min read
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-foreground mb-8 leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-foreground font-medium">{post.author.name}</p>
                  <p className="text-muted-foreground text-sm">{post.author.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-muted-foreground text-sm mr-2">Share:</span>
                <button className="p-2 border border-border hover:border-gold hover:text-gold transition-colors">
                  <Twitter className="w-4 h-4" />
                </button>
                <button className="p-2 border border-border hover:border-gold hover:text-gold transition-colors">
                  <Linkedin className="w-4 h-4" />
                </button>
                <button className="p-2 border border-border hover:border-gold hover:text-gold transition-colors">
                  <Facebook className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="pb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative aspect-[16/9] overflow-hidden"
          >
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="prose prose-lg prose-invert max-w-none"
          >
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              {post.excerpt}
            </p>
            
            <div className="text-foreground leading-relaxed space-y-6">
              <h2 className="text-2xl font-serif text-foreground mt-12 mb-4">
                Introduction
              </h2>
              <p className="text-muted-foreground">
                Mauritius has emerged as one of the most attractive destinations for 
                international property investment. With its stable political environment, 
                favorable tax regime, and exceptional quality of life, the island nation 
                offers unique opportunities for discerning investors.
              </p>
              
              <h2 className="text-2xl font-serif text-foreground mt-12 mb-4">
                Key Investment Factors
              </h2>
              <p className="text-muted-foreground">
                When considering land investment in Mauritius, several factors contribute 
                to its appeal. The country&apos;s strategic location, modern infrastructure, 
                and multilingual workforce create an ideal environment for both personal 
                and commercial investments.
              </p>
              
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Political stability and democratic governance</li>
                <li>No capital gains tax on property sales</li>
                <li>Attractive corporate tax rates</li>
                <li>Modern banking and legal systems</li>
                <li>Strategic timezone for global business</li>
              </ul>
              
              <h2 className="text-2xl font-serif text-foreground mt-12 mb-4">
                Market Outlook
              </h2>
              <p className="text-muted-foreground">
                The Mauritius property market continues to show resilience and growth 
                potential. Premium land in coastal areas and established developments 
                has seen consistent appreciation, making it an attractive option for 
                portfolio diversification.
              </p>
              
              <blockquote className="border-l-4 border-gold pl-6 my-8 italic text-foreground">
                &ldquo;Mauritius offers a rare combination of lifestyle, investment returns, 
                and security that is hard to find elsewhere in the world.&rdquo;
              </blockquote>
              
              <h2 className="text-2xl font-serif text-foreground mt-12 mb-4">
                Conclusion
              </h2>
              <p className="text-muted-foreground">
                For investors seeking a stable, high-quality destination for property 
                investment, Mauritius presents compelling advantages. The combination 
                of favorable regulations, natural beauty, and strong fundamentals 
                makes it a premier choice for luxury land acquisition.
              </p>
            </div>
          </motion.div>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 pt-8 mt-8 border-t border-border">
            <Tag className="w-4 h-4 text-gold" />
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 border border-border text-sm text-muted-foreground hover:border-gold hover:text-gold transition-colors cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-24 bg-card border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4">
                Keep Reading
              </p>
              <h2 className="text-3xl font-serif text-foreground">
                Related Articles
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-[16/10] overflow-hidden mb-4">
                    <Image
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <span className="text-gold text-xs tracking-wider uppercase">
                    {relatedPost.category}
                  </span>
                  <h3 className="text-lg font-serif text-foreground mt-2 group-hover:text-gold transition-colors">
                    {relatedPost.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}
