'use client'

export function MauritiusLogo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Stylized Dodo Bird - National Symbol of Mauritius */}
      <svg
        viewBox="0 0 40 40"
        className="w-10 h-10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background circle with gold accent */}
        <circle cx="20" cy="20" r="19" stroke="currentColor" strokeWidth="1.5" className="text-gold" />
        
        {/* Simplified elegant dodo silhouette */}
        <path
          d="M12 28 C12 28 14 24 16 23 C18 22 18 20 17 18 C16 16 18 14 20 13 C22 12 25 12 27 14 C29 16 30 18 29 21 C28 24 25 26 22 27 C19 28 15 29 12 28 Z"
          fill="currentColor"
          className="text-gold"
        />
        
        {/* Dodo head/beak detail */}
        <path
          d="M27 14 C28 13 30 13 31 14 C32 15 32 16 31 17 C30 18 28 17 27 16"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="text-foreground"
        />
        
        {/* Eye */}
        <circle cx="26" cy="15" r="1" fill="currentColor" className="text-foreground" />
        
        {/* Small Mauritius flag colors accent at bottom */}
        <g transform="translate(15, 32)">
          <rect x="0" y="0" width="2.5" height="1.5" fill="#EA2839" />
          <rect x="2.5" y="0" width="2.5" height="1.5" fill="#1A206D" />
          <rect x="5" y="0" width="2.5" height="1.5" fill="#FFD500" />
          <rect x="7.5" y="0" width="2.5" height="1.5" fill="#00A551" />
        </g>
      </svg>
    </div>
  )
}

export function MauritiusFlagBadge({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-col ${className}`}>
      <div className="w-8 h-1.5 bg-[#EA2839]" />
      <div className="w-8 h-1.5 bg-[#1A206D]" />
      <div className="w-8 h-1.5 bg-[#FFD500]" />
      <div className="w-8 h-1.5 bg-[#00A551]" />
    </div>
  )
}
