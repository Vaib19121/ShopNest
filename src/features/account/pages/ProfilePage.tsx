import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/features/Auth/store/authStore'
import { ProfileHeader } from '@/features/account/components/ProfileHeader'
import { StatsBar } from '@/features/account/components/StatsBar'
import { RecentOrders } from '@/features/account/components/RecentOrders'
import { SavedAddresses } from '@/features/account/components/SavedAddresses'
import { PaymentMethods } from '@/features/account/components/PaymentMethods'
import { Preferences, type Prefs } from '@/features/account/components/Preferences'
import { DangerZone } from '@/features/account/components/DangerZone'

export default function ProfilePage() {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()

  const [prefs, setPrefs] = useState<Prefs>({
    orderUpdates: true,
    promotions: false,
    newArrivals: true,
    smsAlerts: false,
    currency: 'USD',
    language: 'en',
  })

  const displayName =
    user?.first_name && user?.last_name
      ? `${user.first_name} ${user.last_name}`
      : user?.email?.split('@')[0] ?? 'Guest User'

  const initials = displayName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  function handleLogout() {
    logout()
    navigate('/auth/login')
  }

  function togglePref(key: keyof Prefs) {
    setPrefs((p) => ({ ...p, [key]: !p[key] }))
  }

  function handlePrefChange(key: keyof Prefs, value: string) {
    setPrefs((p) => ({ ...p, [key]: value }))
  }

  return (
    <div className="min-h-screen bg-background">
      <ProfileHeader
        displayName={displayName}
        email={user?.email ?? 'guest@shopnest.com'}
        initials={initials}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        <StatsBar />
        <RecentOrders />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SavedAddresses />
          <PaymentMethods />
        </div>

        <Preferences
          prefs={prefs}
          onToggle={togglePref}
          onPrefChange={handlePrefChange}
        />

        <DangerZone onLogout={handleLogout} />

        <div className="h-4" />
      </div>
    </div>
  )
}
