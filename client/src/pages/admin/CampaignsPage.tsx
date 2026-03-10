import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, Plus, Eye, Edit, Trash2, X, Loader2,
  CheckCircle, Clock, XCircle, PauseCircle, Trophy,
  MapPin, Target, Users, TrendingUp, AlertCircle,
  Star, Calendar, Building2
} from 'lucide-react'
import campaignAPI from '../../services/campaignService'

interface Manager {
  id: number
  full_name: string
  email: string
  organization_name: string
  city: string
  state: string
}

interface Campaign {
  id: number
  title: string
  description: string
  category: string
  goal_amount: number
  raised_amount: number
  total_raised: number
  donors_count: number
  status: string
  created_by_name: string
  manager_name: string
  manager_email: string
  assigned_manager_id: number
  location: string
  city: string
  state: string
  image_url: string
  is_urgent: boolean
  is_featured: boolean
  start_date: string
  end_date: string
  rejection_reason: string
  created_at: string
}

interface Stats {
  total: number
  approved: number
  pending: number
  completed: number
  paused: number
  rejected: number
  totalRaised: number
  totalDonors: number
  urgentCampaigns: number
  featuredCampaigns: number
}

const CATEGORIES = ['Education', 'Healthcare', 'Environment', 'Poverty', 'Disaster Relief', 'Animal Welfare', 'Other']
const STATUSES = ['all', 'approved', 'pending', 'rejected', 'completed', 'paused']

const statusConfig: Record<string, { color: string; icon: React.ReactNode; label: string }> = {
  approved: { color: 'bg-emerald-500/15 text-emerald-500', icon: <CheckCircle className="w-3.5 h-3.5" />, label: 'Approved' },
  pending: { color: 'bg-yellow-500/15 text-yellow-500', icon: <Clock className="w-3.5 h-3.5" />, label: 'Pending' },
  rejected: { color: 'bg-red-500/15 text-red-500', icon: <XCircle className="w-3.5 h-3.5" />, label: 'Rejected' },
  completed: { color: 'bg-blue-500/15 text-blue-500', icon: <Trophy className="w-3.5 h-3.5" />, label: 'Completed' },
  paused: { color: 'bg-orange-500/15 text-orange-500', icon: <PauseCircle className="w-3.5 h-3.5" />, label: 'Paused' },
}

const inputClass = "w-full px-4 py-2.5 rounded-lg border border-border/70 bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
const labelClass = "block text-xs font-medium text-muted-foreground mb-1"

const CampaignForm = ({
  form, setForm, onSubmit, onCancel, submitLabel,
  managers, actionLoading, isEdit
}: {
  form: any
  setForm: (f: any) => void
  onSubmit: (e: React.FormEvent) => void
  onCancel: () => void
  submitLabel: string
  managers: Manager[]
  actionLoading: boolean
  isEdit?: boolean
}) => (
  <form onSubmit={onSubmit} className="space-y-4">
    <div>
      <label className={labelClass}>Campaign Title *</label>
      <input className={inputClass} placeholder="Clean Water for Rural Villages" value={form.title}
        onChange={e => setForm({ ...form, title: e.target.value })} required autoFocus onMouseDown={e => e.stopPropagation()} />
    </div>
    <div>
      <label className={labelClass}>Description</label>
      <textarea className={`${inputClass} h-24 resize-none`} placeholder="Describe the campaign and its impact..."
        value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} onMouseDown={e => e.stopPropagation()} />
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className={labelClass}>Category</label>
        <select className={inputClass} value={form.category}
          onChange={e => setForm({ ...form, category: e.target.value })} onMouseDown={e => e.stopPropagation()}>
          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>
      <div>
        <label className={labelClass}>Goal Amount (₹) *</label>
        <input className={inputClass} type="number" placeholder="500000" value={form.goal_amount}
          onChange={e => setForm({ ...form, goal_amount: e.target.value })} required min="1" onMouseDown={e => e.stopPropagation()} />
      </div>
      <div>
        <label className={labelClass}>Assign Manager</label>
        <select className={inputClass} value={form.assigned_manager_id}
          onChange={e => setForm({ ...form, assigned_manager_id: e.target.value })} onMouseDown={e => e.stopPropagation()}>
          <option value="">-- Select Manager --</option>
          {managers.map(m => (
            <option key={m.id} value={m.id}>
              {m.full_name} — {m.organization_name || m.city}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className={labelClass}>Location</label>
        <input className={inputClass} placeholder="Rural Andhra Pradesh" value={form.location}
          onChange={e => setForm({ ...form, location: e.target.value })} onMouseDown={e => e.stopPropagation()} />
      </div>
      <div>
        <label className={labelClass}>City</label>
        <input className={inputClass} placeholder="Guntur" value={form.city}
          onChange={e => setForm({ ...form, city: e.target.value })} onMouseDown={e => e.stopPropagation()} />
      </div>
      <div>
        <label className={labelClass}>State</label>
        <input className={inputClass} placeholder="Andhra Pradesh" value={form.state}
          onChange={e => setForm({ ...form, state: e.target.value })} onMouseDown={e => e.stopPropagation()} />
      </div>
      <div>
        <label className={labelClass}>Start Date</label>
        <input className={inputClass} type="date" value={form.start_date}
          onChange={e => setForm({ ...form, start_date: e.target.value })} onMouseDown={e => e.stopPropagation()} />
      </div>
      <div>
        <label className={labelClass}>End Date</label>
        <input className={inputClass} type="date" value={form.end_date}
          onChange={e => setForm({ ...form, end_date: e.target.value })} onMouseDown={e => e.stopPropagation()} />
      </div>
    </div>
    <div>
      <label className={labelClass}>Image URL</label>
      <input className={inputClass} placeholder="https://example.com/image.jpg" value={form.image_url}
        onChange={e => setForm({ ...form, image_url: e.target.value })} onMouseDown={e => e.stopPropagation()} />
    </div>
    <div className="flex gap-6">
      <label className="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" checked={form.is_urgent}
          onChange={e => setForm({ ...form, is_urgent: e.target.checked })}
          className="w-4 h-4 accent-primary" onMouseDown={e => e.stopPropagation()} />
        <span className="text-sm text-foreground font-medium">Mark as Urgent</span>
      </label>
      <label className="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" checked={form.is_featured}
          onChange={e => setForm({ ...form, is_featured: e.target.checked })}
          className="w-4 h-4 accent-primary" onMouseDown={e => e.stopPropagation()} />
        <span className="text-sm text-foreground font-medium">Feature this Campaign</span>
      </label>
    </div>
    {isEdit && (
      <div>
        <label className={labelClass}>Status</label>
        <select className={inputClass} value={form.status}
          onChange={e => setForm({ ...form, status: e.target.value })} onMouseDown={e => e.stopPropagation()}>
          {['approved', 'pending', 'paused', 'completed', 'rejected'].map(s => (
            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
          ))}
        </select>
      </div>
    )}
    <div className="flex gap-3 pt-2">
      <button type="button" onClick={onCancel}
        className="flex-1 py-2.5 rounded-xl border border-border/70 text-foreground text-sm font-semibold hover:bg-muted transition">
        Cancel
      </button>
      <button type="submit" disabled={actionLoading}
        className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition disabled:opacity-60 flex items-center justify-center gap-2">
        {actionLoading && <Loader2 className="w-4 h-4 animate-spin" />}
        {actionLoading ? 'Saving...' : submitLabel}
      </button>
    </div>
  </form>
)

const Modal = ({ title, onClose, children, wide = false }: { title: string; onClose: () => void; children: React.ReactNode; wide?: boolean }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      className={`bg-card rounded-2xl border border-border/70 w-full ${wide ? 'max-w-4xl' : 'max-w-2xl'} max-h-[90vh] overflow-y-auto`}
      onClick={e => e.stopPropagation()}
    >
      <div className="sticky top-0 bg-card border-b border-border/70 px-6 py-4 flex items-center justify-between z-10">
        <h3 className="text-lg font-bold text-foreground">{title}</h3>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition">
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="p-6">{children}</div>
    </motion.div>
  </motion.div>
)

const CampaignsPage = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [managers, setManagers] = useState<Manager[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('')

  const [showCreate, setShowCreate] = useState(false)
  const [showEdit, setShowEdit] = useState<Campaign | null>(null)
  const [showView, setShowView] = useState<Campaign | null>(null)
  const [showDelete, setShowDelete] = useState<Campaign | null>(null)
  const [rejectReason, setRejectReason] = useState('')

  const emptyForm = {
    title: '', description: '', category: 'Education',
    goal_amount: '', assigned_manager_id: '',
    location: '', city: '', state: '',
    image_url: '', is_urgent: false, is_featured: false,
    start_date: '', end_date: ''
  }
  const [form, setForm] = useState<any>(emptyForm)

  const fetchAll = useCallback(async () => {
    try {
      setLoading(true)
      const [campaignsRes, statsRes, managersRes] = await Promise.all([
        campaignAPI.getAll({
          search,
          status: statusFilter === 'all' ? '' : statusFilter,
          category: categoryFilter
        }),
        campaignAPI.getStats(),
        campaignAPI.getManagersList()
      ])
      setCampaigns(campaignsRes.data)
      setStats(statsRes)
      setManagers(managersRes)
      setError('')
    } catch (err: any) {
      setError('Failed to load campaigns')
    } finally {
      setLoading(false)
    }
  }, [search, statusFilter, categoryFilter])

  useEffect(() => { fetchAll() }, [fetchAll])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setActionLoading(true)
      await campaignAPI.create({
        ...form,
        goal_amount: parseFloat(form.goal_amount),
        assigned_manager_id: form.assigned_manager_id ? parseInt(form.assigned_manager_id) : null
      })
      setShowCreate(false)
      setForm(emptyForm)
      fetchAll()
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create campaign')
    } finally {
      setActionLoading(false)
    }
  }

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!showEdit) return
    try {
      setActionLoading(true)
      await campaignAPI.update(showEdit.id, {
        ...form,
        goal_amount: parseFloat(form.goal_amount),
        assigned_manager_id: form.assigned_manager_id ? parseInt(form.assigned_manager_id) : null
      })
      setShowEdit(null)
      fetchAll()
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update campaign')
    } finally {
      setActionLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!showDelete) return
    try {
      setActionLoading(true)
      await campaignAPI.delete(showDelete.id)
      setShowDelete(null)
      fetchAll()
    } catch (err: any) {
      setError('Failed to delete campaign')
    } finally {
      setActionLoading(false)
    }
  }

  const handleApprove = async (id: number) => {
    try {
      setActionLoading(true)
      await campaignAPI.approve(id)
      fetchAll()
      setShowView(null)
    } catch (err: any) {
      setError('Failed to approve campaign')
    } finally {
      setActionLoading(false)
    }
  }

  const handleReject = async (id: number) => {
    try {
      setActionLoading(true)
      await campaignAPI.reject(id, rejectReason)
      fetchAll()
      setShowView(null)
      setRejectReason('')
    } catch (err: any) {
      setError('Failed to reject campaign')
    } finally {
      setActionLoading(false)
    }
  }

  const openEdit = (c: Campaign) => {
    setForm({
      title: c.title, description: c.description || '',
      category: c.category || 'Education',
      goal_amount: c.goal_amount, assigned_manager_id: c.assigned_manager_id || '',
      location: c.location || '', city: c.city || '', state: c.state || '',
      image_url: c.image_url || '', is_urgent: c.is_urgent, is_featured: c.is_featured,
      start_date: c.start_date?.split('T')[0] || '',
      end_date: c.end_date?.split('T')[0] || '',
      status: c.status
    })
    setShowEdit(c)
  }

  const progressPercent = (raised: number, goal: number) =>
    goal > 0 ? Math.min(Math.round((raised / goal) * 100), 100) : 0

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount)

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Campaigns</h2>
          <p className="text-sm text-muted-foreground mt-0.5">{campaigns.length} campaigns total</p>
        </div>
        <button onClick={() => { setForm(emptyForm); setShowCreate(true) }}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary/90 transition">
          <Plus className="w-4 h-4" /> Create Campaign
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm px-4 py-3 rounded-xl flex items-center justify-between">
          {error}
          <button onClick={() => setError('')}><X className="w-4 h-4" /></button>
        </div>
      )}

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
          {[
            { label: 'Total', value: stats.total, color: 'text-foreground', bg: 'bg-muted/40' },
            { label: 'Approved', value: stats.approved, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
            { label: 'Pending', value: stats.pending, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
            { label: 'Completed', value: stats.completed, color: 'text-blue-500', bg: 'bg-blue-500/10' },
            { label: 'Urgent', value: stats.urgentCampaigns, color: 'text-red-500', bg: 'bg-red-500/10' },
            { label: 'Raised', value: formatCurrency(stats.totalRaised), color: 'text-primary', bg: 'bg-primary/10' },
          ].map(s => (
            <div key={s.label} className={`${s.bg} rounded-2xl p-4 border border-border/50`}>
              <p className={`text-xl font-black ${s.color}`}>{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text" placeholder="Search campaigns..."
            value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border/70 bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
          />
        </div>
        <select
          value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-border/70 bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        >
          <option value="">All Categories</option>
          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>
        <div className="flex gap-2 flex-wrap">
          {STATUSES.map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`px-3 py-2.5 rounded-xl text-xs font-semibold transition capitalize ${
                statusFilter === s
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card border border-border/70 text-foreground hover:bg-muted'
              }`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Campaign Cards Grid */}
      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : campaigns.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <Target className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="font-medium">No campaigns found</p>
          <p className="text-sm mt-1">Create your first campaign to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {campaigns.map((c, i) => {
            const progress = progressPercent(Number(c.total_raised) || 0, Number(c.goal_amount))
            const si = statusConfig[c.status]
            return (
              <motion.article
                key={c.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="bg-card border border-border/70 rounded-2xl overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Image / Header */}
                <div className="relative h-36 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  {c.image_url ? (
                    <img src={c.image_url} alt={c.title} className="w-full h-full object-cover" />
                  ) : (
                    <Target className="w-10 h-10 text-primary/30" />
                  )}
                  <div className="absolute top-3 left-3 flex gap-2">
                    {c.is_urgent && (
                      <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> Urgent
                      </span>
                    )}
                    {c.is_featured && (
                      <span className="bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Star className="w-3 h-3" /> Featured
                      </span>
                    )}
                  </div>
                  <div className="absolute top-3 right-3">
                    {si && (
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur ${si.color}`}>
                        {si.icon} {si.label}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  <div>
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                      {c.category}
                    </span>
                    <h3 className="font-bold text-foreground mt-2 line-clamp-2">{c.title}</h3>
                    {c.city && (
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" /> {c.city}, {c.state}
                      </p>
                    )}
                  </div>

                  {/* Progress */}
                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="font-semibold text-foreground">
                        {formatCurrency(Number(c.total_raised) || 0)}
                      </span>
                      <span className="text-muted-foreground">
                        {progress}% of {formatCurrency(Number(c.goal_amount))}
                      </span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.8 }}
                        className="h-full bg-primary rounded-full"
                      />
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" /> {c.donors_count || 0} donors
                    </span>
                    {c.manager_name && (
                      <span className="flex items-center gap-1">
                        <Building2 className="w-3 h-3" /> {c.manager_name}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-1 border-t border-border/50">
                    <button onClick={() => setShowView(c)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 text-xs font-semibold transition">
                      <Eye className="w-3.5 h-3.5" /> View
                    </button>
                    <button onClick={() => openEdit(c)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 text-xs font-semibold transition">
                      <Edit className="w-3.5 h-3.5" /> Edit
                    </button>
                    <button onClick={() => setShowDelete(c)}
                      className="flex items-center justify-center p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>
      )}

      {/* MODALS */}
      <AnimatePresence>

        {/* Create Modal */}
        {showCreate && (
          <Modal title="Create New Campaign" onClose={() => setShowCreate(false)} wide>
            <CampaignForm
              form={form} setForm={setForm}
              onSubmit={handleCreate}
              onCancel={() => setShowCreate(false)}
              submitLabel="Create Campaign"
              managers={managers}
              actionLoading={actionLoading}
            />
          </Modal>
        )}

        {/* Edit Modal */}
        {showEdit && (
          <Modal title={`Edit — ${showEdit.title}`} onClose={() => setShowEdit(null)} wide>
            <CampaignForm
              form={form} setForm={setForm}
              onSubmit={handleEdit}
              onCancel={() => setShowEdit(null)}
              submitLabel="Save Changes"
              managers={managers}
              actionLoading={actionLoading}
              isEdit
            />
          </Modal>
        )}

        {/* View Modal */}
        {showView && (
          <Modal title="Campaign Details" onClose={() => setShowView(null)} wide>
            <div className="space-y-5">

              {/* Header */}
              <div className="flex items-start gap-4 p-4 bg-muted/20 rounded-xl">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <Target className="w-7 h-7 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-lg font-bold text-foreground">{showView.title}</h4>
                    {showView.is_urgent && (
                      <span className="bg-red-500/15 text-red-500 text-xs font-bold px-2 py-0.5 rounded-full">Urgent</span>
                    )}
                    {showView.is_featured && (
                      <span className="bg-amber-500/15 text-amber-500 text-xs font-bold px-2 py-0.5 rounded-full">Featured</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{showView.description}</p>
                  <div className="flex items-center gap-3 mt-2 flex-wrap">
                    <span className="text-xs bg-primary/10 text-primary font-semibold px-2 py-0.5 rounded-full">
                      {showView.category}
                    </span>
                    {(() => {
                      const si = statusConfig[showView.status]
                      return si ? (
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${si.color}`}>
                          {si.icon} {si.label}
                        </span>
                      ) : null
                    })()}
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { icon: TrendingUp, label: 'Raised', value: formatCurrency(Number(showView.total_raised) || 0), color: 'text-emerald-500' },
                  { icon: Target, label: 'Goal', value: formatCurrency(Number(showView.goal_amount)), color: 'text-primary' },
                  { icon: Users, label: 'Donors', value: showView.donors_count || 0, color: 'text-blue-500' },
                  { icon: TrendingUp, label: 'Progress', value: `${progressPercent(Number(showView.total_raised) || 0, Number(showView.goal_amount))}%`, color: 'text-amber-500' },
                ].map(({ icon: Icon, label, value, color }) => (
                  <div key={label} className="bg-muted/20 rounded-xl p-3 text-center">
                    <Icon className={`w-5 h-5 mx-auto mb-1 ${color}`} />
                    <p className={`text-lg font-black ${color}`}>{value}</p>
                    <p className="text-xs text-muted-foreground">{label}</p>
                  </div>
                ))}
              </div>

              {/* Progress Bar */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-semibold text-foreground">Fundraising Progress</span>
                  <span className="text-muted-foreground">
                    {progressPercent(Number(showView.total_raised) || 0, Number(showView.goal_amount))}%
                  </span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent(Number(showView.total_raised) || 0, Number(showView.goal_amount))}%` }}
                    transition={{ duration: 1 }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Manager', value: showView.manager_name || 'Unassigned', icon: Building2 },
                  { label: 'Location', value: showView.city ? `${showView.city}, ${showView.state}` : showView.location || '-', icon: MapPin },
                  { label: 'Start Date', value: showView.start_date ? new Date(showView.start_date).toLocaleDateString() : '-', icon: Calendar },
                  { label: 'End Date', value: showView.end_date ? new Date(showView.end_date).toLocaleDateString() : '-', icon: Calendar },
                  { label: 'Created By', value: showView.created_by_name || 'Admin', icon: Users },
                  { label: 'Created At', value: new Date(showView.created_at).toLocaleDateString(), icon: Calendar },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="bg-muted/20 rounded-xl p-3">
                    <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                      <Icon className="w-3 h-3" /> {label}
                    </p>
                    <p className="text-sm font-semibold text-foreground">{value}</p>
                  </div>
                ))}
              </div>

              {/* Actions for pending */}
              {showView.status === 'pending' && (
                <div className="flex gap-3 pt-2 border-t border-border/70">
                  <button onClick={() => handleApprove(showView.id)} disabled={actionLoading}
                    className="flex-1 py-2.5 rounded-xl bg-emerald-500/15 text-emerald-500 hover:bg-emerald-500/25 text-sm font-semibold transition disabled:opacity-60">
                    {actionLoading ? 'Processing...' : '✓ Approve Campaign'}
                  </button>
                  <div className="flex-1 space-y-2">
                    <input className={inputClass} placeholder="Rejection reason..."
                      value={rejectReason} onChange={e => setRejectReason(e.target.value)} />
                    <button onClick={() => handleReject(showView.id)} disabled={actionLoading}
                      className="w-full py-2 rounded-xl bg-red-500/15 text-red-500 hover:bg-red-500/25 text-sm font-semibold transition disabled:opacity-60">
                      ✕ Reject
                    </button>
                  </div>
                </div>
              )}
            </div>
          </Modal>
        )}

        {/* Delete Modal */}
        {showDelete && (
          <Modal title="Delete Campaign" onClose={() => setShowDelete(null)}>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Are you sure you want to delete <span className="font-semibold text-foreground">"{showDelete.title}"</span>? This cannot be undone.
              </p>
              <div className="flex gap-3">
                <button onClick={() => setShowDelete(null)}
                  className="flex-1 py-2.5 rounded-xl border border-border/70 text-foreground text-sm font-semibold hover:bg-muted transition">
                  Cancel
                </button>
                <button onClick={handleDelete} disabled={actionLoading}
                  className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition disabled:opacity-60 flex items-center justify-center gap-2">
                  {actionLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {actionLoading ? 'Deleting...' : 'Delete Campaign'}
                </button>
              </div>
            </div>
          </Modal>
        )}

      </AnimatePresence>
    </div>
  )
}

export default CampaignsPage