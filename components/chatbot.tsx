'use client'

import { FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { Bot, ChevronRight, MessageCircle, Send, UserRound, X } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'

type ChatKey =
  | 'chatbot.initial'
  | 'chatbot.land'
  | 'chatbot.agri'
  | 'chatbot.rent'
  | 'chatbot.hotel'
  | 'chatbot.visit'
  | 'chatbot.landReply'
  | 'chatbot.agriReply'
  | 'chatbot.rentReply'
  | 'chatbot.hotelReply'
  | 'chatbot.contactReply'
  | 'chatbot.currencyReply'
  | 'chatbot.defaultReply'

type ChatMessage = {
  id: string
  role: 'assistant' | 'user'
  key?: ChatKey
  text?: string
  href?: string
}

type QuickReply = {
  labelKey: ChatKey
  replyKey: ChatKey
  href: string
}

const quickReplies: QuickReply[] = [
  {
    labelKey: 'chatbot.land',
    replyKey: 'chatbot.landReply',
    href: '/lands?category=land-sales',
  },
  {
    labelKey: 'chatbot.agri',
    replyKey: 'chatbot.agriReply',
    href: '/lands?category=agricultural-land-sales',
  },
  {
    labelKey: 'chatbot.rent',
    replyKey: 'chatbot.rentReply',
    href: '/lands?category=house-rentals',
  },
  {
    labelKey: 'chatbot.hotel',
    replyKey: 'chatbot.hotelReply',
    href: '/lands?category=hotel-development',
  },
  {
    labelKey: 'chatbot.visit',
    replyKey: 'chatbot.contactReply',
    href: '/contact',
  },
]

const initialMessage: ChatMessage = {
  id: 'assistant-initial',
  role: 'assistant',
  key: 'chatbot.initial',
}

function getReplyForMessage(message: string): Pick<ChatMessage, 'key' | 'href'> {
  const text = message.toLowerCase()

  if (
    text.includes('agri') ||
    text.includes('farm') ||
    text.includes('farming') ||
    text.includes('culture')
  ) {
    return {
      key: 'chatbot.agriReply',
      href: '/lands?category=agricultural-land-sales',
    }
  }

  if (
    text.includes('hotel') ||
    text.includes('seychelle') ||
    text.includes('resort') ||
    text.includes('hospitality') ||
    text.includes('hotelier')
  ) {
    return {
      key: 'chatbot.hotelReply',
      href: '/lands?category=hotel-development',
    }
  }

  if (
    text.includes('rent') ||
    text.includes('rental') ||
    text.includes('house') ||
    text.includes('villa') ||
    text.includes('louer') ||
    text.includes('location') ||
    text.includes('maison')
  ) {
    return {
      key: 'chatbot.rentReply',
      href: '/lands?category=house-rentals',
    }
  }

  if (
    text.includes('land') ||
    text.includes('terrain') ||
    text.includes('sale') ||
    text.includes('sell') ||
    text.includes('vendre') ||
    text.includes('acheter') ||
    text.includes('plot')
  ) {
    return {
      key: 'chatbot.landReply',
      href: '/lands?category=land-sales',
    }
  }

  if (
    text.includes('price') ||
    text.includes('budget') ||
    text.includes('currency') ||
    text.includes('devise') ||
    text.includes('prix') ||
    text.includes('mur') ||
    text.includes('usd') ||
    text.includes('eur') ||
    text.includes('gbp')
  ) {
    return {
      key: 'chatbot.currencyReply',
    }
  }

  if (
    text.includes('contact') ||
    text.includes('call') ||
    text.includes('phone') ||
    text.includes('visit') ||
    text.includes('consult') ||
    text.includes('agent') ||
    text.includes('jaunbocus') ||
    text.includes('uways') ||
    text.includes('rendez')
  ) {
    return {
      key: 'chatbot.contactReply',
      href: '/contact',
    }
  }

  return {
    key: 'chatbot.defaultReply',
    href: '/contact',
  }
}

export function Chatbot() {
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage])
  const [input, setInput] = useState('')
  const messageCount = useRef(0)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  const visibleQuickReplies = useMemo(() => quickReplies, [])

  useEffect(() => {
    if (!isOpen) return
    messagesEndRef.current?.scrollIntoView({ block: 'end' })
  }, [isOpen, messages])

  function nextId(role: ChatMessage['role']) {
    messageCount.current += 1
    return `${role}-${messageCount.current}`
  }

  function addReply(reply: Pick<ChatMessage, 'key' | 'href'>) {
    setMessages((current) => [
      ...current,
      {
        id: nextId('assistant'),
        role: 'assistant',
        ...reply,
      },
    ])
  }

  function handleQuickReply(reply: QuickReply) {
    setMessages((current) => [
      ...current,
      {
        id: nextId('user'),
        role: 'user',
        key: reply.labelKey,
      },
      {
        id: nextId('assistant'),
        role: 'assistant',
        key: reply.replyKey,
        href: reply.href,
      },
    ])
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmedInput = input.trim()
    if (!trimmedInput) return

    setMessages((current) => [
      ...current,
      {
        id: nextId('user'),
        role: 'user',
        text: trimmedInput,
      },
    ])
    setInput('')
    addReply(getReplyForMessage(trimmedInput))
  }

  return (
    <div className="fixed bottom-5 right-4 z-[60] sm:right-6">
      {isOpen && (
        <section
          aria-label={t('chatbot.title')}
          className="mb-4 w-[calc(100vw-2rem)] max-w-sm overflow-hidden border border-border bg-background/95 shadow-2xl shadow-black/50 backdrop-blur-xl"
        >
          <div className="flex items-center justify-between border-b border-border bg-card px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center border border-gold/40 bg-gold/10 text-gold">
                <Bot className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground">
                  {t('chatbot.title')}
                </h2>
                <p className="text-xs text-gold">{t('chatbot.status')}</p>
              </div>
            </div>
            <button
              type="button"
              aria-label={t('chatbot.close')}
              onClick={() => setIsOpen(false)}
              className="flex h-9 w-9 items-center justify-center text-foreground/70 transition-colors hover:text-gold focus:text-gold focus:outline-none"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div
            aria-live="polite"
            className="max-h-[22rem] space-y-3 overflow-y-auto px-4 py-4"
          >
            {messages.map((message) => {
              const content = message.text || (message.key ? t(message.key) : '')
              const isUser = message.role === 'user'

              return (
                <div
                  key={message.id}
                  className={`flex items-start gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!isUser && (
                    <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center border border-gold/30 bg-gold/10 text-gold">
                      <Bot className="h-4 w-4" />
                    </span>
                  )}
                  <div
                    className={`max-w-[78%] border px-3 py-2 text-sm leading-relaxed ${
                      isUser
                        ? 'border-gold bg-gold text-background'
                        : 'border-border bg-card text-foreground/90'
                    }`}
                  >
                    <p>{content}</p>
                    {!isUser && message.href && (
                      <Link
                        href={message.href}
                        className="mt-2 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-gold transition-colors hover:text-gold-light"
                        onClick={() => setIsOpen(false)}
                      >
                        {t('chatbot.openLink')}
                        <ChevronRight className="h-3.5 w-3.5" />
                      </Link>
                    )}
                  </div>
                  {isUser && (
                    <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center border border-white/20 bg-white/10 text-foreground">
                      <UserRound className="h-4 w-4" />
                    </span>
                  )}
                </div>
              )
            })}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex flex-wrap gap-2 border-t border-border px-4 py-3">
            {visibleQuickReplies.map((reply) => (
              <button
                key={reply.labelKey}
                type="button"
                onClick={() => handleQuickReply(reply)}
                className="border border-border bg-secondary px-3 py-2 text-xs font-medium uppercase tracking-wider text-foreground/80 transition-colors hover:border-gold hover:text-gold focus:border-gold focus:text-gold focus:outline-none"
              >
                {t(reply.labelKey)}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex border-t border-border bg-card">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={t('chatbot.placeholder')}
              aria-label={t('chatbot.placeholder')}
              className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              aria-label={t('chatbot.send')}
              disabled={!input.trim()}
              className="flex w-12 items-center justify-center bg-gold text-background transition-colors hover:bg-gold-light disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        aria-label={isOpen ? t('chatbot.close') : t('chatbot.open')}
        onClick={() => setIsOpen((current) => !current)}
        className="ml-auto flex h-14 w-14 items-center justify-center border border-gold bg-gold text-background shadow-xl shadow-black/40 transition-colors hover:bg-gold-light focus:outline-none focus:ring-2 focus:ring-gold-light focus:ring-offset-2 focus:ring-offset-background"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </div>
  )
}
