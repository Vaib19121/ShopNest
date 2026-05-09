import { useRef, useState } from 'react'
import { Camera, Star, Pencil } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface ProfileHeaderProps {
  displayName: string
  email: string
  initials: string
}

export function ProfileHeader({ displayName, email, initials }: ProfileHeaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null)
  const [isHovering, setIsHovering] = useState(false)

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setAvatarSrc(URL.createObjectURL(file))
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-foreground/[0.03] via-background to-primary/[0.04] border-b border-border/60">
      {/* Decorative grid */}
      <div
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 pt-10 pb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
          {/* Avatar */}
          <div
            className="relative cursor-pointer shrink-0"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onClick={() => fileInputRef.current?.click()}
          >
            <Avatar className="size-24 ring-4 ring-background shadow-xl">
              {avatarSrc && <AvatarImage src={avatarSrc} alt={displayName} />}
              <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-primary/20 to-primary/5 text-foreground">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div
              className={`absolute inset-0 rounded-full bg-black/50 flex items-center justify-center transition-opacity duration-200 ${
                isHovering ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Camera className="size-6 text-white" />
            </div>

            <span className="absolute bottom-1 right-1 size-3.5 rounded-full bg-emerald-500 ring-2 ring-background" />
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
          />

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold text-foreground truncate">{displayName}</h1>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800">
                <Star className="size-3 fill-current" />
                Gold Member
              </span>
            </div>
            <p className="text-sm text-muted-foreground truncate">{email}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Member since <span className="text-foreground font-medium">January 2024</span>
            </p>
          </div>

          <button className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-border hover:bg-muted transition-colors shrink-0">
            <Pencil className="size-3.5" />
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  )
}
