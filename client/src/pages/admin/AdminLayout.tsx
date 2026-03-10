import { useMemo, useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Bell,
  ChevronDown,
  CircleHelp,
  Gauge,
  HandHeart,
  Heart,
  LayoutDashboard,
  LogOut,
  Menu,
  Moon,
  Search,
  Settings,
  ShoppingBag,
  Shield,
  Sparkles,
  Sun,
  Tag,
  User,
  Users,
  X,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

interface AdminLayoutProps {
  children: React.ReactNode
  darkMode: boolean
  toggleDarkMode: () => void
}

const menuGroups = [
  {
    title: 'Main',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
      { icon: Gauge, label: 'Analytics', path: '/admin/analytics', badge: '20' },
    ],
  },
  {
    title: 'Management',
    items: [
      { icon: ShoppingBag, label: 'Campaigns', path: '/admin/campaigns', badge: '99+' },
      { icon: HandHeart, label: 'Donations', path: '/admin/donations' },
      { icon: Users, label: 'Volunteers', path: '/admin/volunteers' },
      { icon: Users, label: 'Managers', path: '/admin/managers' },
      { icon: Tag, label: 'Posts', path: '/admin/posts' },
    ],
  },
  {
    title: 'Other',
    items: [
      { icon: Sparkles, label: 'Insights', path: '/admin/insights' },
      { icon: Bell, label: 'Updates', path: '/admin/updates' },
      { icon: CircleHelp, label: 'Feedback', path: '/admin/feedback' },
      { icon: Settings, label: 'Settings', path: '/admin/settings' },
    ],
  },
]

const AdminLayout = ({ children, darkMode, toggleDarkMode }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [showUserDropdown, setShowUserDropdown] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const initials = useMemo(() => user?.full_name?.charAt(0)?.toUpperCase() ?? 'A', [user?.full_name])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('#user-dropdown-btn')) {
        setShowUserDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const SidebarContent = useMemo(() => (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex items-center gap-3 border-b border-border/70 p-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
          <Heart className="h-4 w-4" fill="currentColor" />
        </div>
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="overflow-hidden whitespace-nowrap"
            >
              <p className="text-sm font-semibold text-foreground">GiveWave</p>
              <p className="text-xs text-muted-foreground">Admin Console</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex-1 min-h-0 space-y-5 overflow-y-auto px-3 py-4">
        {menuGroups.map((group) => (
          <div key={group.title}>
            <AnimatePresence>
              {sidebarOpen && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="mb-2 px-2 text-xs font-medium text-muted-foreground"
                >
                  {group.title}
                </motion.p>
              )}
            </AnimatePresence>

            <div className="space-y-1">
              {group.items.map((item) => {
                const active = location.pathname === item.path

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileSidebarOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all ${
                      active
                        ? 'bg-secondary text-secondary-foreground'
                        : 'text-foreground/80 hover:bg-muted/80'
                    } ${!sidebarOpen ? 'justify-center' : ''}`}
                  >
                    <item.icon className="h-4.5 w-4.5 shrink-0" />

                    <AnimatePresence>
                      {sidebarOpen && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: 'auto' }}
                          exit={{ opacity: 0, width: 0 }}
                          className="flex-1 overflow-hidden whitespace-nowrap"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>

                    {sidebarOpen && item.badge && (
                      <span className="rounded-full bg-secondary/15 px-1.5 py-0.5 text-[10px] font-semibold text-secondary">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto border-t border-border/70 p-3">
        <button
          onClick={handleLogout}
          className={`flex w-full items-center gap-3 rounded-xl bg-muted/70 px-3 py-2.5 text-sm text-destructive transition hover:bg-destructive/10 ${
            !sidebarOpen ? 'justify-center' : ''
          }`}
        >
          <LogOut className="h-4.5 w-4.5 shrink-0" />
          <AnimatePresence>
            {sidebarOpen && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="overflow-hidden whitespace-nowrap"
              >
                Log out
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  ), [sidebarOpen, location.pathname, setMobileSidebarOpen, handleLogout])

  return (
    <div className={`admin-theme ${darkMode ? 'dark' : ''} h-screen overflow-hidden bg-muted/60 p-3`}>
      <div className="flex h-full overflow-hidden rounded-[28px] border border-border/70 bg-background shadow-xl">
        <motion.aside
          animate={{ width: sidebarOpen ? 250 : 86 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="hidden h-full shrink-0 border-r border-border/70 bg-card lg:flex"
        >
          {SidebarContent}
        </motion.aside>

        <AnimatePresence>
          {mobileSidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileSidebarOpen(false)}
                className="fixed inset-0 z-40 bg-black/40 lg:hidden"
              />
              <motion.aside
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                exit={{ x: -280 }}
                transition={{ duration: 0.25 }}
                className="fixed left-0 top-0 z-50 h-screen w-[260px] border-r border-border/70 bg-card lg:hidden"
              >
                {SidebarContent}
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="border-b border-border/70 bg-background px-5 py-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setSidebarOpen((prev) => !prev)}
                  className="hidden h-9 w-9 items-center justify-center rounded-xl border border-border/70 text-muted-foreground transition hover:bg-muted lg:flex"
                >
                  <Menu className="h-4.5 w-4.5" />
                </button>
                <button
                  onClick={() => setMobileSidebarOpen((prev) => !prev)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-border/70 text-muted-foreground transition hover:bg-muted lg:hidden"
                >
                  {mobileSidebarOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
                </button>

                <div className="flex h-10 min-w-[280px] items-center gap-2 rounded-full bg-muted px-3 text-sm text-muted-foreground">
                  <Search className="h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search product"
                    className="w-full bg-transparent text-foreground placeholder:text-muted-foreground/90 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="flex h-9 w-9 items-center justify-center rounded-full border border-border/70 text-muted-foreground transition hover:bg-muted">
                  <Bell className="h-4.5 w-4.5" />
                </button>
                <button
                  onClick={toggleDarkMode}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border/70 text-muted-foreground transition hover:bg-muted"
                >
                  {darkMode ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
                </button>

                <div className="relative">
                  <button
                    id="user-dropdown-btn"
                    onClick={() => setShowUserDropdown(prev => !prev)}
                    className="flex items-center gap-2 rounded-full border border-border/70 bg-card px-2.5 py-1.5 hover:bg-muted transition"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-xs font-bold text-secondary-foreground">
                      {initials}
                    </span>
                    <div className="text-left leading-tight">
                      <p className="text-xs font-semibold text-foreground">{user?.full_name ?? 'Admin'}</p>
                      <p className="text-[11px] text-muted-foreground capitalize">{user?.role ?? 'admin'}</p>
                    </div>
                    <motion.div
                      animate={{ rotate: showUserDropdown ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {showUserDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-12 w-64 rounded-2xl border border-border/70 bg-card shadow-xl z-50 overflow-hidden"
                      >
                        {/* Profile Header */}
                        <div className="p-4 border-b border-border/70 bg-muted/30">
                          <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-secondary-foreground text-lg font-bold">
                              {initials}
                            </div>
                            <div>
                              <p className="font-semibold text-foreground text-sm">{user?.full_name ?? 'Admin'}</p>
                              <p className="text-xs text-muted-foreground">{user?.email ?? ''}</p>
                              <span className="inline-flex items-center gap-1 mt-1 bg-secondary/15 text-secondary text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize">
                                <Shield className="w-2.5 h-2.5" />
                                {user?.role ?? 'admin'}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Menu Items */}
                        <div className="p-2">
                          {[
                            { icon: User, label: 'My Profile', action: () => navigate('/admin/settings') },
                            { icon: Settings, label: 'Settings', action: () => navigate('/admin/settings') },
                            { icon: Bell, label: 'Notifications', action: () => {} },
                          ].map(({ icon: Icon, label, action }) => (
                            <button
                              key={label}
                              onClick={() => { action(); setShowUserDropdown(false) }}
                              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-foreground hover:bg-muted transition text-left"
                            >
                              <Icon className="w-4 h-4 text-muted-foreground" />
                              {label}
                            </button>
                          ))}
                        </div>

                        {/* Logout */}
                        <div className="p-2 pt-0 border-t border-border/70">
                          <button
                            onClick={() => { handleLogout(); setShowUserDropdown(false) }}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-destructive hover:bg-destructive/10 transition text-left"
                          >
                            <LogOut className="w-4 h-4" />
                            Log out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </header>

          <main className="min-h-0 flex-1 overflow-auto p-5">{children}</main>
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
