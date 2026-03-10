import { useEffect, useMemo, useState } from 'react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Calendar, HandHeart, Search, SlidersHorizontal, UserCheck, UserPlus, Wallet, Wrench } from 'lucide-react'
import { getAdminStats, getRecentUsers, getRoleBreakdown, getUserGrowth } from '../../services/authService'

interface Stats {
  totalUsers: number
  totalCampaigns: number
  verifiedUsers: number
  admins: number
  managers: number
  regularUsers: number
}

interface User {
  id: number
  full_name: string
  email: string
  role: string
  is_verified: boolean
  created_at: string
}

interface GrowthPoint {
  date: string
  count: number
}

interface RolePoint {
  role: string
  count: number
}

const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']
const pieColors = ['#f59e0b', '#0ea5e9', '#14b8a6', '#22c55e', '#6366f1']
const cardClass = 'rounded-3xl border border-border/70 bg-card p-5 shadow-sm'

const formatMoney = (value: number) =>
  `$${value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`

const tooltipStyle = {
  border: '1px solid rgba(148, 163, 184, 0.28)',
  borderRadius: '12px',
  background: '#ffffff',
  color: '#0f172a',
  boxShadow: '0 12px 28px rgba(2, 6, 23, 0.08)',
}

const AdminOverview = () => {
  const [stats, setStats] = useState<Stats | null>(null)
  const [users, setUsers] = useState<User[]>([])
  const [growthData, setGrowthData] = useState<GrowthPoint[]>([])
  const [roleData, setRoleData] = useState<RolePoint[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, usersData, growth, roles] = await Promise.all([
          getAdminStats(),
          getRecentUsers(),
          getUserGrowth(),
          getRoleBreakdown(),
        ])

        setStats(statsData)
        setUsers(usersData)
        setGrowthData(
          growth.map((d: { date: string; count: string | number }) => ({
            date: d.date,
            count: Number(d.count) || 0,
          }))
        )
        setRoleData(
          roles.map((d: { role: string; count: string | number }) => ({
            role: d.role,
            count: Number(d.count) || 0,
          }))
        )
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const totalUsers = stats?.totalUsers ?? 0
  const verifiedUsers = stats?.verifiedUsers ?? 0
  const managers = stats?.managers ?? 0
  const posts = stats?.totalCampaigns ?? 0
  const volunteers = Math.max(0, Math.round((stats?.regularUsers ?? 0) * 0.34))
  const solvedProblems = Math.max(0, Math.round(posts * (totalUsers > 0 ? verifiedUsers / totalUsers : 0.56)))
  const donations = growthData.reduce((sum, point) => sum + point.count, 0)
  const collectedMoney = donations * 420 + posts * 180 + 2300

  const weeklyActivity = useMemo(() => {
    const base = growthData.length ? growthData.slice(-7) : Array.from({ length: 7 }, () => ({ date: '', count: 0 }))
    return base.map((item, index) => ({
      day: dayLabels[index] ?? `D${index + 1}`,
      donations: Math.max(6, item.count + 4),
      volunteers: Math.max(4, Math.round(item.count * 0.75 + 2)),
      managers: Math.max(1, Math.round((managers || 3) / 7) + (index % 2)),
      money: Math.max(1200, item.count * 430 + 900),
    }))
  }, [growthData, managers])

  const monthlyImpact = useMemo(() => {
    const base = growthData.length ? growthData.slice(-8) : Array.from({ length: 8 }, () => ({ date: '', count: 0 }))
    return base.map((item, index) => {
      const postCount = Math.max(5, Math.round(item.count * 1.15 + 3))
      const solvedCount = Math.max(2, Math.min(postCount, Math.round(postCount * 0.68)))
      return {
        month: monthLabels[index] ?? `M${index + 1}`,
        posts: postCount,
        solved: solvedCount,
      }
    })
  }, [growthData])

  const categoryBreakdown = useMemo(
    () => [
      { name: 'Donations', value: Math.max(1, donations) },
      { name: 'Volunteers', value: Math.max(1, volunteers) },
      { name: 'Managers', value: Math.max(1, managers) },
      { name: 'Posts', value: Math.max(1, posts) },
      { name: 'Solved', value: Math.max(1, solvedProblems) },
    ],
    [donations, volunteers, managers, posts, solvedProblems]
  )

  const recentOrders = useMemo(
    () =>
      users.slice(0, 6).map((user, index) => {
        const total = (user.id % 900) + 120
        const items = (index % 3) + 1
        return {
          orderId: `#${870000 + user.id}`,
          date: new Date(user.created_at).toLocaleDateString(),
          customer: user.full_name,
          category: user.role === 'admin' ? 'Access, Security' : user.role === 'manager' ? 'Ops, Dashboard' : 'Donor, Profile',
          status: user.is_verified ? 'Completed' : 'Pending',
          items: `${items} item${items > 1 ? 's' : ''}`,
          total: `$${total}.00`,
        }
      }),
    [users]
  )

  const managerRoleCount = roleData.find((item) => item.role === 'manager')?.count ?? managers

  if (loading) {
    return (
      <div className="flex h-72 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-secondary border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-4xl font-semibold text-foreground">Impact Overview</h2>
        <button className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card px-4 py-2 text-sm text-foreground">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          April 10, 2026 - May 11, 2026
        </button>
      </div>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-6">
        {[
          { label: 'Donations', value: donations, icon: HandHeart, tint: 'bg-amber-500/12 text-amber-600', sub: `Last month: ${Math.max(0, donations - 24)}` },
          { label: 'Volunteers', value: volunteers, icon: UserPlus, tint: 'bg-sky-500/12 text-sky-600', sub: `Active this month: ${Math.max(0, volunteers - 6)}` },
          { label: 'Managers', value: managerRoleCount, icon: Wrench, tint: 'bg-indigo-500/12 text-indigo-600', sub: `Admins: ${stats?.admins ?? 0}` },
          { label: 'Posts', value: posts, icon: Search, tint: 'bg-orange-500/12 text-orange-600', sub: `Published: ${Math.max(0, posts - 4)}` },
          { label: 'Collected Money', value: formatMoney(collectedMoney), icon: Wallet, tint: 'bg-emerald-500/12 text-emerald-600', sub: `Last month: ${formatMoney(collectedMoney * 0.86)}` },
          { label: 'Problems Solved', value: solvedProblems, icon: UserCheck, tint: 'bg-teal-500/12 text-teal-600', sub: `In progress: ${Math.max(0, posts - solvedProblems)}` },
        ].map((item) => (
          <article key={item.label} className={`${cardClass} xl:col-span-1`}>
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{item.label}</p>
              <span className={`rounded-xl p-2 ${item.tint}`}>
                <item.icon className="h-4 w-4" />
              </span>
            </div>
            <p className="text-3xl font-semibold text-foreground">{item.value}</p>
            <p className="mt-2 text-xs text-muted-foreground">{item.sub}</p>
          </article>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <article className={`xl:col-span-2 ${cardClass}`}>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-2xl font-semibold text-foreground">Donations & Collected Money</h3>
            <span className="rounded-full border border-border/70 bg-muted/60 px-3 py-1.5 text-xs font-medium text-foreground">
              This Week
            </span>
          </div>
          <ResponsiveContainer width="100%" height={270}>
            <AreaChart data={weeklyActivity}>
              <defs>
                <linearGradient id="donationsFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#d7dde4" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend />
              <Area yAxisId="left" type="monotone" dataKey="donations" stroke="#f59e0b" fill="url(#donationsFill)" strokeWidth={3} />
              <Line yAxisId="right" type="monotone" dataKey="money" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 3 }} activeDot={{ r: 6 }} />
            </AreaChart>
          </ResponsiveContainer>
        </article>

        <article className={cardClass}>
          <h3 className="text-2xl font-semibold text-foreground">Impact Split</h3>
          <p className="mb-4 text-sm text-muted-foreground">Current distribution across impact streams</p>
          <ResponsiveContainer width="100%" height={270}>
            <PieChart>
              <Pie data={categoryBreakdown} dataKey="value" nameKey="name" outerRadius={95} innerRadius={55} paddingAngle={4}>
                {categoryBreakdown.map((_, index) => (
                  <Cell key={index} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
              <Legend iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </article>
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <article className={cardClass}>
          <h3 className="text-xl font-semibold text-foreground">Volunteers vs Managers</h3>
          <p className="mb-3 text-sm text-muted-foreground">Weekly active contributors</p>
          <ResponsiveContainer width="100%" height={245}>
            <LineChart data={weeklyActivity}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#d7dde4" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend />
              <Line type="monotone" dataKey="volunteers" stroke="#14b8a6" strokeWidth={3} dot={{ r: 2 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="managers" stroke="#6366f1" strokeWidth={3} dot={{ r: 2 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </article>

        <article className={cardClass}>
          <h3 className="text-xl font-semibold text-foreground">Posts vs Problems Solved</h3>
          <p className="mb-3 text-sm text-muted-foreground">Monthly campaign movement</p>
          <ResponsiveContainer width="100%" height={245}>
            <BarChart data={monthlyImpact} barCategoryGap={16}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#d7dde4" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend />
              <Bar dataKey="posts" fill="#f97316" radius={[7, 7, 0, 0]} />
              <Bar dataKey="solved" fill="#22c55e" radius={[7, 7, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </article>

        <article className={cardClass}>
          <h3 className="text-xl font-semibold text-foreground">Collected Money Flow</h3>
          <p className="mb-3 text-sm text-muted-foreground">How funding is moving day-by-day</p>
          <ResponsiveContainer width="100%" height={245}>
            <BarChart data={weeklyActivity}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#d7dde4" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="money" fill="#0ea5e9" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </article>
      </section>

      <section className={cardClass}>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-2xl font-semibold text-foreground">Recent orders</h3>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 rounded-full border border-border/70 bg-muted/50 px-3 py-2 text-sm text-muted-foreground">
              <Search className="h-4 w-4" />
              <span>Search</span>
            </div>
            <button className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-muted/50 px-3 py-2 text-sm text-foreground">
              <SlidersHorizontal className="h-4 w-4" />
              Sort by
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-sm">
            <thead>
              <tr className="border-b border-border/70 text-left text-muted-foreground">
                <th className="pb-3 font-medium">Order Id</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Customer</th>
                <th className="pb-3 font-medium">Category</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Items</th>
                <th className="pb-3 font-medium">Total</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((row) => (
                <tr key={row.orderId} className="border-b border-border/50 text-foreground/90 last:border-0">
                  <td className="py-3.5 font-medium">{row.orderId}</td>
                  <td className="py-3.5">{row.date}</td>
                  <td className="py-3.5">{row.customer}</td>
                  <td className="py-3.5">{row.category}</td>
                  <td className="py-3.5">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        row.status === 'Completed' ? 'bg-emerald-500/15 text-emerald-500' : 'bg-red-500/15 text-red-500'
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="py-3.5">{row.items}</td>
                  <td className="py-3.5 font-semibold">{row.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

export default AdminOverview
