import { useState, useEffect, useCallback, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Eye, CheckCircle, Clock, XCircle, MapPin, Building2, Mail, Phone, Plus, Edit, Trash2, ShieldOff, X, Loader2 } from 'lucide-react'
import managersAPI from '../../services/managersService'

interface Manager {
  id: number
  full_name: string
  email: string
  phone: string
  location: string
  is_verified: boolean
  created_at: string
  detail_id: number | null
  organization_name: string | null
  organization_type: string | null
  city: string | null
  state: string | null
  country: string | null
  manager_status: string | null
  document_verified: boolean | null
  office_phone: string | null
  office_email: string | null
  website: string | null
  address_line_1: string | null
  postal_code: string | null
  registration_number: string | null
  tax_id: string | null
  document_type: string | null
  document_number: string | null
  rejection_reason: string | null
  campaigns_count: number
}

const inputClass = "w-full px-4 py-2.5 rounded-lg border border-border/70 bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
const labelClass = "block text-xs font-medium text-muted-foreground mb-1"

const statusConfig: Record<string, { color: string; icon: ReactNode; label: string }> = {
  approved: { color: 'bg-emerald-500/15 text-emerald-500', icon: <CheckCircle className="w-3.5 h-3.5" />, label: 'Approved' },
  pending: { color: 'bg-yellow-500/15 text-yellow-500', icon: <Clock className="w-3.5 h-3.5" />, label: 'Pending' },
  rejected: { color: 'bg-red-500/15 text-red-500', icon: <XCircle className="w-3.5 h-3.5" />, label: 'Rejected' },
  suspended: { color: 'bg-orange-500/15 text-orange-500', icon: <ShieldOff className="w-3.5 h-3.5" />, label: 'Suspended' },
}

const Modal = ({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) => (
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
      className="bg-card rounded-2xl border border-border/70 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      onClick={e => e.stopPropagation()}
    >
      <div className="sticky top-0 bg-card border-b border-border/70 px-6 py-4 flex items-center justify-between">
        <h3 className="text-lg font-bold text-foreground">{title}</h3>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition">
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="p-6">{children}</div>
    </motion.div>
  </motion.div>
)

const ManagersPage = () => {
  const [managers, setManagers] = useState<Manager[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  // Modals
  const [showAdd, setShowAdd] = useState(false)
  const [showAssign, setShowAssign] = useState<Manager | null>(null)
  const [showEdit, setShowEdit] = useState<Manager | null>(null)
  const [showView, setShowView] = useState<Manager | null>(null)
  const [showDelete, setShowDelete] = useState<Manager | null>(null)
  const [showSuspend, setShowSuspend] = useState<Manager | null>(null)

  const [addForm, setAddForm] = useState({
    full_name: '', email: '', password: '', phone: '', location: ''
  })

  const [assignForm, setAssignForm] = useState({
    organization_name: '', organization_type: 'NGO',
    registration_number: '', tax_id: '',
    city: '', state: '', country: 'India', postal_code: '',
    address_line_1: '', address_line_2: '',
    office_phone: '', office_email: '', website: '',
    document_type: 'Aadhar', document_number: ''
  })

  const [editForm, setEditForm] = useState({
    full_name: '', email: '', phone: '', location: ''
  })

  const [suspendReason, setSuspendReason] = useState('')
  const [rejectReason, setRejectReason] = useState('')

  const fetchManagers = useCallback(async () => {
    try {
      setLoading(true)
      const res = await managersAPI.getAllManagers(search, statusFilter === 'all' ? '' : statusFilter)
      setManagers(res.data)
      setError('')
    } catch (err: any) {
      setError('Failed to fetch managers')
    } finally {
      setLoading(false)
    }
  }, [search, statusFilter])

  useEffect(() => {
    fetchManagers()
  }, [fetchManagers])

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setActionLoading(true)
      await managersAPI.createManager(addForm)
      setShowAdd(false)
      setAddForm({ full_name: '', email: '', password: '', phone: '', location: '' })
      fetchManagers()
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create manager')
    } finally {
      setActionLoading(false)
    }
  }

  const handleAssign = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!showAssign) return
    try {
      setActionLoading(true)
      await managersAPI.assignManagerDetails(showAssign.id, assignForm)
      setShowAssign(null)
      fetchManagers()
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to assign details')
    } finally {
      setActionLoading(false)
    }
  }

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!showEdit) return
    try {
      setActionLoading(true)
      await managersAPI.updateManager(showEdit.id, editForm)
      setShowEdit(null)
      fetchManagers()
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update manager')
    } finally {
      setActionLoading(false)
    }
  }

  const handleApprove = async (id: number) => {
    try {
      setActionLoading(true)
      await managersAPI.approveManager(id)
      fetchManagers()
      setShowView(prev => prev ? { ...prev, manager_status: 'approved' } : null)
    } catch (err: any) {
      setError('Failed to approve manager')
    } finally {
      setActionLoading(false)
    }
  }

  const handleReject = async (id: number) => {
    try {
      setActionLoading(true)
      await managersAPI.rejectManager(id, rejectReason)
      fetchManagers()
      setShowView(null)
    } catch (err: any) {
      setError('Failed to reject manager')
    } finally {
      setActionLoading(false)
      setRejectReason('')
    }
  }

  const handleSuspend = async () => {
    if (!showSuspend) return
    try {
      setActionLoading(true)
      await managersAPI.suspendManager(showSuspend.id, suspendReason)
      setShowSuspend(null)
      setSuspendReason('')
      fetchManagers()
    } catch (err: any) {
      setError('Failed to suspend manager')
    } finally {
      setActionLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!showDelete) return
    try {
      setActionLoading(true)
      await managersAPI.deleteManager(showDelete.id)
      setShowDelete(null)
      fetchManagers()
    } catch (err: any) {
      setError('Failed to delete manager')
    } finally {
      setActionLoading(false)
    }
  }

  const openEdit = (m: Manager) => {
    setEditForm({ full_name: m.full_name, email: m.email, phone: m.phone || '', location: m.location || '' })
    setShowEdit(m)
  }

  const openAssign = (m: Manager) => {
    setAssignForm({
      organization_name: m.organization_name || '',
      organization_type: m.organization_type || 'NGO',
      registration_number: m.registration_number || '',
      tax_id: m.tax_id || '',
      city: m.city || '', state: m.state || '',
      country: m.country || 'India', postal_code: m.postal_code || '',
      address_line_1: m.address_line_1 || '', address_line_2: '',
      office_phone: m.office_phone || '', office_email: m.office_email || '',
      website: m.website || '', document_type: m.document_type || 'Aadhar',
      document_number: m.document_number || ''
    })
    setShowAssign(m)
  }

  const getStatus = (m: Manager) => m.manager_status || 'unassigned'

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Managers</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            {managers.length} manager{managers.length !== 1 ? 's' : ''} total
          </p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary/90 transition"
        >
          <Plus className="w-4 h-4" /> Add Manager
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm px-4 py-3 rounded-xl flex items-center justify-between">
          {error}
          <button onClick={() => setError('')}><X className="w-4 h-4" /></button>
        </div>
      )}

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name, email or organization..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border/70 bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', 'approved', 'pending', 'rejected', 'suspended'].map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition capitalize ${
                statusFilter === s
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card border border-border/70 text-foreground hover:bg-muted'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-border/70 bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-sm">
            <thead>
              <tr className="border-b border-border/70 bg-muted/40">
                {['Manager', 'Organization', 'Location', 'Status', 'Campaigns', 'Actions'].map(h => (
                  <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-12">
                    <Loader2 className="w-6 h-6 animate-spin text-primary mx-auto" />
                  </td>
                </tr>
              ) : managers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-muted-foreground text-sm">
                    No managers found
                  </td>
                </tr>
              ) : (
                managers.map((m, i) => {
                  const status = getStatus(m)
                  const statusInfo = statusConfig[status]
                  return (
                    <motion.tr
                      key={m.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.04 }}
                      className="border-b border-border/50 hover:bg-muted/20 transition last:border-0"
                    >
                      {/* Manager */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold shrink-0">
                            {m.full_name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{m.full_name}</p>
                            <p className="text-xs text-muted-foreground">{m.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* Organization */}
                      <td className="px-5 py-4">
                        {m.organization_name ? (
                          <div className="flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-muted-foreground shrink-0" />
                            <div>
                              <p className="font-medium text-foreground">{m.organization_name}</p>
                              <p className="text-xs text-muted-foreground">{m.organization_type}</p>
                            </div>
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground italic">Not assigned</span>
                        )}
                      </td>

                      {/* Location */}
                      <td className="px-5 py-4">
                        {m.city ? (
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <MapPin className="w-3.5 h-3.5 shrink-0" />
                            <span className="text-sm">{m.city}, {m.state}</span>
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground italic">
                            {m.location || 'Not assigned'}
                          </span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        {statusInfo ? (
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${statusInfo.color}`}>
                            {statusInfo.icon} {statusInfo.label}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-muted text-muted-foreground">
                            Unassigned
                          </span>
                        )}
                      </td>

                      {/* Campaigns */}
                      <td className="px-5 py-4">
                        <span className="font-semibold text-foreground">{m.campaigns_count}</span>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {/* View */}
                          <button
                            onClick={() => setShowView(m)}
                            className="p-1.5 rounded-lg bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 transition"
                            title="View"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {/* Assign */}
                          <button
                            onClick={() => openAssign(m)}
                            className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 transition"
                            title="Assign Details"
                          >
                            <Building2 className="w-4 h-4" />
                          </button>

                          {/* Edit */}
                          <button
                            onClick={() => openEdit(m)}
                            className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 transition"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>

                          {/* Suspend */}
                          {m.manager_status === 'approved' && (
                            <button
                              onClick={() => setShowSuspend(m)}
                              className="p-1.5 rounded-lg bg-orange-500/10 text-orange-500 hover:bg-orange-500/20 transition"
                              title="Suspend"
                            >
                              <ShieldOff className="w-4 h-4" />
                            </button>
                          )}

                          {/* Delete */}
                          <button
                            onClick={() => setShowDelete(m)}
                            className="p-1.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── MODALS ── */}
      <AnimatePresence>

        {/* Add Manager Modal */}
        {showAdd && (
          <Modal title="Add New Manager" onClose={() => setShowAdd(false)}>
            <form onSubmit={handleAdd} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Full Name *</label>
                  <input className={inputClass} placeholder="Rajesh Kumar" value={addForm.full_name}
                    onChange={e => setAddForm({ ...addForm, full_name: e.target.value })} required />
                </div>
                <div>
                  <label className={labelClass}>Email *</label>
                  <input className={inputClass} type="email" placeholder="rajesh@email.com" value={addForm.email}
                    onChange={e => setAddForm({ ...addForm, email: e.target.value })} required />
                </div>
                <div>
                  <label className={labelClass}>Password *</label>
                  <input className={inputClass} type="password" placeholder="Min. 6 characters" value={addForm.password}
                    onChange={e => setAddForm({ ...addForm, password: e.target.value })} required minLength={6} />
                </div>
                <div>
                  <label className={labelClass}>Phone</label>
                  <input className={inputClass} placeholder="+91 9876543210" value={addForm.phone}
                    onChange={e => setAddForm({ ...addForm, phone: e.target.value })} />
                </div>
              </div>
              <div>
                <label className={labelClass}>Location</label>
                <input className={inputClass} placeholder="Vijayawada, AP" value={addForm.location}
                  onChange={e => setAddForm({ ...addForm, location: e.target.value })} />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowAdd(false)}
                  className="flex-1 py-2.5 rounded-xl border border-border/70 text-foreground text-sm font-semibold hover:bg-muted transition">
                  Cancel
                </button>
                <button type="submit" disabled={actionLoading}
                  className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition disabled:opacity-60 flex items-center justify-center gap-2">
                  {actionLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {actionLoading ? 'Creating...' : 'Create Manager'}
                </button>
              </div>
            </form>
          </Modal>
        )}

        {/* Assign Details Modal */}
        {showAssign && (
          <Modal title={`Assign Details — ${showAssign.full_name}`} onClose={() => setShowAssign(null)}>
            <form onSubmit={handleAssign} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Organization Name *</label>
                  <input className={inputClass} placeholder="Help India Foundation" value={assignForm.organization_name}
                    onChange={e => setAssignForm({ ...assignForm, organization_name: e.target.value })} required />
                </div>
                <div>
                  <label className={labelClass}>Organization Type</label>
                  <select className={inputClass} value={assignForm.organization_type}
                    onChange={e => setAssignForm({ ...assignForm, organization_type: e.target.value })}>
                    {['NGO', 'Government', 'Corporate', 'Individual', 'Other'].map(o => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Registration Number</label>
                  <input className={inputClass} placeholder="REG123456" value={assignForm.registration_number}
                    onChange={e => setAssignForm({ ...assignForm, registration_number: e.target.value })} />
                </div>
                <div>
                  <label className={labelClass}>Tax ID</label>
                  <input className={inputClass} placeholder="TAX123456" value={assignForm.tax_id}
                    onChange={e => setAssignForm({ ...assignForm, tax_id: e.target.value })} />
                </div>
                <div>
                  <label className={labelClass}>City *</label>
                  <input className={inputClass} placeholder="Vijayawada" value={assignForm.city}
                    onChange={e => setAssignForm({ ...assignForm, city: e.target.value })} required />
                </div>
                <div>
                  <label className={labelClass}>State *</label>
                  <input className={inputClass} placeholder="Andhra Pradesh" value={assignForm.state}
                    onChange={e => setAssignForm({ ...assignForm, state: e.target.value })} required />
                </div>
                <div>
                  <label className={labelClass}>Country</label>
                  <input className={inputClass} value={assignForm.country}
                    onChange={e => setAssignForm({ ...assignForm, country: e.target.value })} />
                </div>
                <div>
                  <label className={labelClass}>Postal Code</label>
                  <input className={inputClass} placeholder="520001" value={assignForm.postal_code}
                    onChange={e => setAssignForm({ ...assignForm, postal_code: e.target.value })} />
                </div>
                <div>
                  <label className={labelClass}>Office Phone</label>
                  <input className={inputClass} placeholder="+91 866 2345678" value={assignForm.office_phone}
                    onChange={e => setAssignForm({ ...assignForm, office_phone: e.target.value })} />
                </div>
                <div>
                  <label className={labelClass}>Office Email</label>
                  <input className={inputClass} type="email" placeholder="office@org.com" value={assignForm.office_email}
                    onChange={e => setAssignForm({ ...assignForm, office_email: e.target.value })} />
                </div>
              </div>
              <div>
                <label className={labelClass}>Address Line 1 *</label>
                <input className={inputClass} placeholder="123 Main Street" value={assignForm.address_line_1}
                  onChange={e => setAssignForm({ ...assignForm, address_line_1: e.target.value })} required />
              </div>
              <div>
                <label className={labelClass}>Address Line 2</label>
                <input className={inputClass} placeholder="Near Bus Stand" value={assignForm.address_line_2}
                  onChange={e => setAssignForm({ ...assignForm, address_line_2: e.target.value })} />
              </div>
              <div>
                <label className={labelClass}>Website</label>
                <input className={inputClass} placeholder="https://org.com" value={assignForm.website}
                  onChange={e => setAssignForm({ ...assignForm, website: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Document Type</label>
                  <select className={inputClass} value={assignForm.document_type}
                    onChange={e => setAssignForm({ ...assignForm, document_type: e.target.value })}>
                    {['Aadhar', 'PAN', 'Passport', 'Driving License', 'Other'].map(o => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Document Number</label>
                  <input className={inputClass} placeholder="XXXX XXXX XXXX" value={assignForm.document_number}
                    onChange={e => setAssignForm({ ...assignForm, document_number: e.target.value })} />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowAssign(null)}
                  className="flex-1 py-2.5 rounded-xl border border-border/70 text-foreground text-sm font-semibold hover:bg-muted transition">
                  Cancel
                </button>
                <button type="submit" disabled={actionLoading}
                  className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition disabled:opacity-60 flex items-center justify-center gap-2">
                  {actionLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {actionLoading ? 'Saving...' : 'Save Details'}
                </button>
              </div>
            </form>
          </Modal>
        )}

        {/* Edit Modal */}
        {showEdit && (
          <Modal title={`Edit — ${showEdit.full_name}`} onClose={() => setShowEdit(null)}>
            <form onSubmit={handleEdit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Full Name</label>
                  <input className={inputClass} value={editForm.full_name}
                    onChange={e => setEditForm({ ...editForm, full_name: e.target.value })} required />
                </div>
                <div>
                  <label className={labelClass}>Email</label>
                  <input className={inputClass} type="email" value={editForm.email}
                    onChange={e => setEditForm({ ...editForm, email: e.target.value })} required />
                </div>
                <div>
                  <label className={labelClass}>Phone</label>
                  <input className={inputClass} value={editForm.phone}
                    onChange={e => setEditForm({ ...editForm, phone: e.target.value })} />
                </div>
                <div>
                  <label className={labelClass}>Location</label>
                  <input className={inputClass} value={editForm.location}
                    onChange={e => setEditForm({ ...editForm, location: e.target.value })} />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowEdit(null)}
                  className="flex-1 py-2.5 rounded-xl border border-border/70 text-foreground text-sm font-semibold hover:bg-muted transition">
                  Cancel
                </button>
                <button type="submit" disabled={actionLoading}
                  className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition disabled:opacity-60 flex items-center justify-center gap-2">
                  {actionLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {actionLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </Modal>
        )}

        {/* View Modal */}
        {showView && (
          <Modal title="Manager Details" onClose={() => setShowView(null)}>
            <div className="space-y-6">

              {/* Profile */}
              <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl">
                <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xl font-bold">
                  {showView.full_name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-foreground">{showView.full_name}</h4>
                  <p className="text-sm text-muted-foreground">{showView.email}</p>
                  <div className="flex items-center gap-2 mt-1">
                    {(() => {
                      const s = getStatus(showView)
                      const si = statusConfig[s]
                      return si ? (
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${si.color}`}>
                          {si.icon} {si.label}
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-muted text-muted-foreground">
                          Unassigned
                        </span>
                      )
                    })()}
                  </div>
                </div>
              </div>

              {/* Personal Info */}
              <div>
                <h4 className="text-sm font-bold text-foreground mb-3 uppercase tracking-wider">Personal Info</h4>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: Mail, label: 'Email', value: showView.email },
                    { icon: Phone, label: 'Phone', value: showView.phone || 'Not provided' },
                    { icon: MapPin, label: 'Location', value: showView.location || 'Not provided' },
                    { icon: Clock, label: 'Joined', value: new Date(showView.created_at).toLocaleDateString() },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="bg-muted/20 rounded-xl p-3">
                      <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                        <Icon className="w-3 h-3" /> {label}
                      </p>
                      <p className="text-sm font-medium text-foreground">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Organization Info */}
              {showView.organization_name && (
                <div>
                  <h4 className="text-sm font-bold text-foreground mb-3 uppercase tracking-wider">Organization</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'Name', value: showView.organization_name },
                      { label: 'Type', value: showView.organization_type || '-' },
                      { label: 'City', value: showView.city || '-' },
                      { label: 'State', value: showView.state || '-' },
                      { label: 'Registration', value: showView.registration_number || '-' },
                      { label: 'Tax ID', value: showView.tax_id || '-' },
                      { label: 'Office Phone', value: showView.office_phone || '-' },
                      { label: 'Office Email', value: showView.office_email || '-' },
                    ].map(({ label, value }) => (
                      <div key={label} className="bg-muted/20 rounded-xl p-3">
                        <p className="text-xs text-muted-foreground mb-1">{label}</p>
                        <p className="text-sm font-medium text-foreground">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-2 border-t border-border/70">
                {getStatus(showView) === 'pending' && (
                  <>
                    <button
                      onClick={() => handleApprove(showView.id)}
                      disabled={actionLoading}
                      className="flex-1 py-2.5 rounded-xl bg-emerald-500/15 text-emerald-500 hover:bg-emerald-500/25 text-sm font-semibold transition disabled:opacity-60"
                    >
                      {actionLoading ? 'Processing...' : '✓ Approve'}
                    </button>
                    <div className="flex-1 flex flex-col gap-2">
                      <input
                        className={inputClass}
                        placeholder="Rejection reason..."
                        value={rejectReason}
                        onChange={e => setRejectReason(e.target.value)}
                      />
                      <button
                        onClick={() => handleReject(showView.id)}
                        disabled={actionLoading}
                        className="w-full py-2 rounded-xl bg-red-500/15 text-red-500 hover:bg-red-500/25 text-sm font-semibold transition disabled:opacity-60"
                      >
                        ✕ Reject
                      </button>
                    </div>
                  </>
                )}
                {getStatus(showView) === 'approved' && (
                  <button
                    onClick={() => { setShowView(null); setShowSuspend(showView) }}
                    className="flex-1 py-2.5 rounded-xl bg-orange-500/15 text-orange-500 hover:bg-orange-500/25 text-sm font-semibold transition"
                  >
                    Suspend Manager
                  </button>
                )}
              </div>
            </div>
          </Modal>
        )}

        {/* Suspend Modal */}
        {showSuspend && (
          <Modal title={`Suspend — ${showSuspend.full_name}`} onClose={() => setShowSuspend(null)}>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                This will suspend the manager and prevent them from accessing the platform.
              </p>
              <div>
                <label className={labelClass}>Reason for suspension</label>
                <textarea
                  className={`${inputClass} h-24 resize-none`}
                  placeholder="Enter reason..."
                  value={suspendReason}
                  onChange={e => setSuspendReason(e.target.value)}
                />
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowSuspend(null)}
                  className="flex-1 py-2.5 rounded-xl border border-border/70 text-foreground text-sm font-semibold hover:bg-muted transition">
                  Cancel
                </button>
                <button onClick={handleSuspend} disabled={actionLoading}
                  className="flex-1 py-2.5 rounded-xl bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition disabled:opacity-60 flex items-center justify-center gap-2">
                  {actionLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {actionLoading ? 'Suspending...' : 'Suspend Manager'}
                </button>
              </div>
            </div>
          </Modal>
        )}

        {/* Delete Modal */}
        {showDelete && (
          <Modal title="Delete Manager" onClose={() => setShowDelete(null)}>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Are you sure you want to delete <span className="font-semibold text-foreground">{showDelete.full_name}</span>? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button onClick={() => setShowDelete(null)}
                  className="flex-1 py-2.5 rounded-xl border border-border/70 text-foreground text-sm font-semibold hover:bg-muted transition">
                  Cancel
                </button>
                <button onClick={handleDelete} disabled={actionLoading}
                  className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition disabled:opacity-60 flex items-center justify-center gap-2">
                  {actionLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {actionLoading ? 'Deleting...' : 'Delete Manager'}
                </button>
              </div>
            </div>
          </Modal>
        )}

      </AnimatePresence>
    </div>
  )
}

export default ManagersPage