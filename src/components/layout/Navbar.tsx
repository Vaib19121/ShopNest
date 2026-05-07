import { useState } from 'react'
import { ShoppingBag, Search, Heart, ShoppingCart, Menu, User, LogIn, UserPlus, LogOut, LayoutDashboard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useNavigate } from 'react-router'
import { useAuthStore } from '@/features/Auth/store/authStore'
import { useCartStore } from '@/features/cart/store/cartStore'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/products' },
  { label: 'Categories', href: '#categories' },
  { label: 'Deals', href: '#deals' },
  { label: 'About', href: '#about' },
]

export function Navbar() {
  const navigation = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuthStore()
  const cartItems = useCartStore((s) => s.items)
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const handleLogout = () => {
    logout()
    navigation('/auth/login')
  }
  

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 shrink-0">
            <ShoppingBag className="h-7 w-7 text-primary" />
            <span className="font-bold text-xl tracking-tight">ShopNest</span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Search */}
          <div className="hidden md:flex items-center relative flex-1 max-w-sm">
            <Search className="absolute left-3 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="Search products..."
              className="pl-9 bg-muted/50 border-0 focus-visible:ring-1"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1">
            {/* Mobile search toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>

            <Button variant="ghost" size="icon" className="hidden sm:flex" onClick={() => navigation('/wishlist')}>
              <Heart className="h-5 w-5" />
            </Button>

            <Button variant="ghost" size="icon" className="relative" onClick={() => navigation('/cart')}>
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px]">
                  {totalItems > 99 ? '99+' : totalItems}
                </Badge>
              )}
            </Button>

            {/* User dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hidden sm:flex">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {isAuthenticated ? (
                  <>
                    <DropdownMenuLabel className="font-normal">
                      <p className="text-sm font-medium">{user?.first_name ? `${user.first_name} ${user.last_name ?? ''}`.trim() : user?.email}</p>
                      <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigation('/account/profile')}>
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem onClick={() => navigation('/auth/login')}>
                      <LogIn className="mr-2 h-4 w-4" />
                      Login
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigation('/auth/register')}>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Register
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <div className="flex items-center gap-2 mb-6">
                  <ShoppingBag className="h-6 w-6 text-primary" />
                  <span className="font-bold text-lg">ShopNest</span>
                </div>
                <Separator className="mb-6" />
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>
                <Separator className="my-6" />
                <div className="flex flex-col gap-3">
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Heart className="h-4 w-4" /> Wishlist
                  </Button>
                  {isAuthenticated ? (
                    <>
                      <Button variant="outline" className="w-full justify-start gap-2" onClick={() => navigation('/account/profile')}>
                        <LayoutDashboard className="h-4 w-4" /> Profile
                      </Button>
                      <Button variant="outline" className="w-full justify-start gap-2 text-destructive" onClick={handleLogout}>
                        <LogOut className="h-4 w-4" /> Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" className="w-full justify-start gap-2" onClick={() => navigation('/auth/login')}>
                        <LogIn className="h-4 w-4" /> Login
                      </Button>
                      <Button variant="outline" className="w-full justify-start gap-2" onClick={() => navigation('/auth/register')}>
                        <UserPlus className="h-4 w-4" /> Register
                      </Button>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile search bar */}
        {searchOpen && (
          <div className="md:hidden pb-3 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search products..." className="pl-9 bg-muted/50" />
          </div>
        )}
      </div>
    </header>
  )
}
