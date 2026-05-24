'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { blogPosts } from '@/lib/data'
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react'

const categories = ['All', 'Investment', 'Legal', 'Market Analysis', 'Lifestyle']

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4">
              Insights & News
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-foreground mb-6">
              Market Insights
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Stay informed with the latest news, market trends, and expert insights 
              on luxury land investment in Mauritius.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-6 py-2 text-sm tracking-wider uppercase transition-colors ${
                  category === 'All'
                    ? 'bg-gold text-background'
                    : 'border border-border text-foreground hover:border-gold hover:text-gold'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Post */}
          {blogPosts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <Link href={`/blog/${blogPosts[0].slug}`} className="group block">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={blogPosts[0].image}
                      alt={blogPosts[0].title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-gold text-background text-xs tracking-wider uppercase">
                        Featured
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-4 text-muted-foreground text-sm mb-4">
                      <span className="text-gold">{blogPosts[0].category}</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(blogPosts[0].publishedAt).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {blogPosts[0].readTime} min read
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-serif text-foreground mb-4 group-hover:text-gold transition-colors">
                      {blogPosts[0].title}
                    </h2>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {blogPosts[0].excerpt}
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden">
                        <Image
                          src={blogPosts[0].author.avatar}
                          alt={blogPosts[0].author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-foreground text-sm">{blogPosts[0].author.name}</p>
                        <p className="text-muted-foreground text-xs">{blogPosts[0].author.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Other Posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`} className="group block">
                  <div className="relative aspect-[16/10] overflow-hidden mb-6">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex items-center gap-4 text-muted-foreground text-xs mb-3">
                    <span className="text-gold">{post.category}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime} min read
                    </span>
                  </div>
                  <h3 className="text-xl font-serif text-foreground mb-3 group-hover:text-gold transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden">
                        <Image
                          src={post.author.avatar}
                          alt={post.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="text-foreground text-sm">{post.author.name}</span>
                    </div>
                    <span className="text-muted-foreground text-xs">
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-16">
            <button className="inline-flex items-center gap-2 px-8 py-4 border border-border text-foreground hover:border-gold hover:text-gold transition-colors">
              <span className="tracking-wider uppercase text-sm">Load More Articles</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-card border-t border-border">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4">
              Stay Updated
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif text-foreground mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-muted-foreground mb-8">
              Get the latest market insights and exclusive property listings 
              delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-input border border-border px-6 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-gold text-background font-medium tracking-wider uppercase hover:bg-gold-light transition-colors"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
