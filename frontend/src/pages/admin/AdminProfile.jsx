import React, { useState } from 'react';
import {
  ShieldCheck,
  UserCheck,
  KeyRound,
  Mail,
  Lock,
  Edit3,
  Save,
  X,
  Phone,
  Building2,
  BadgeCheck,
  CheckCircle2
} from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';

const AdminProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const { addToast } = useNotification();

  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // Form state initialized with user details or defaults
  const [name, setName] = useState(user?.name || 'Admin Manager');
  const [email, setEmail] = useState(user?.email || 'admin@dailymitra.com');
  const [phone, setPhone] = useState(user?.phone || '+91 98765 43210');
  const [adminTitle, setAdminTitle] = useState(user?.adminTitle || 'Store Operations Manager');
  const [fulfillmentHub, setFulfillmentHub] = useState(user?.fulfillmentHub || 'DailyMitra Central Hub #01');
  const [accessScope, setAccessScope] = useState(user?.accessScope || 'Full Read / Write Inventory & Orders');
  const [department, setDepartment] = useState(user?.department || 'Operations & Logistics');

  // Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      addToast('Full Name cannot be empty.', 'error');
      return;
    }
    if (!email.trim()) {
      addToast('Email Address cannot be empty.', 'error');
      return;
    }

    updateUserProfile({
      name,
      email,
      phone,
      adminTitle,
      fulfillmentHub,
      accessScope,
      department,
    });

    setIsEditing(false);
    addToast('Admin Profile updated successfully!', 'success');
  };

  const handleCancelEdit = () => {
    setName(user?.name || 'Admin Manager');
    setEmail(user?.email || 'admin@dailymitra.com');
    setPhone(user?.phone || '+91 98765 43210');
    setAdminTitle(user?.adminTitle || 'Store Operations Manager');
    setFulfillmentHub(user?.fulfillmentHub || 'DailyMitra Central Hub #01');
    setAccessScope(user?.accessScope || 'Full Read / Write Inventory & Orders');
    setDepartment(user?.department || 'Operations & Logistics');
    setIsEditing(false);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      addToast('Please fill in all security password fields.', 'error');
      return;
    }
    if (newPassword.length < 6) {
      addToast('New password must be at least 6 characters long.', 'error');
      return;
    }
    if (newPassword !== confirmPassword) {
      addToast('New password and confirmation do not match.', 'error');
      return;
    }

    addToast('Admin security password updated successfully!', 'success');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setShowPasswordModal(false);
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-950 transition-colors">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 md:p-8 space-y-6 max-w-[1600px] w-full min-w-0">
        {/* Header Title & Edit Mode Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
              Admin Staff Profile
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Security permissions, store management role, and operations profile details.
            </p>
          </div>

          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center justify-center gap-2 bg-[#053b27] hover:bg-[#074e34] text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-md shadow-emerald-950/20"
            >
              <Edit3 className="w-4 h-4 text-emerald-400" /> Edit Profile Details
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={handleSaveProfile}
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md"
              >
                <Save className="w-4 h-4" /> Save Changes
              </button>
              <button
                onClick={handleCancelEdit}
                className="inline-flex items-center gap-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs px-4 py-2.5 rounded-xl transition-all"
              >
                <X className="w-4 h-4" /> Cancel
              </button>
            </div>
          )}
        </div>

        {/* Main Profile Card */}
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          {/* Top Banner with Avatar & Designation */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#053b27] to-emerald-700 text-white font-extrabold text-2xl flex items-center justify-center shadow-lg shrink-0 border-2 border-emerald-500/30">
              {name ? name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : <ShieldCheck className="w-10 h-10" />}
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-extrabold text-xl text-slate-900 dark:text-slate-100">
                  {name || 'Admin Manager'}
                </h3>
                <span className="bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 text-[10px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider inline-flex items-center gap-1">
                  <BadgeCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> Super Admin
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {adminTitle || 'Store Operations Manager'} • <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{department || 'Operations & Logistics'}</span>
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-1">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-slate-400" /> {email}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-slate-400" /> {phone}
                </span>
              </div>
            </div>
          </div>

          {/* Profile Details Form or View */}
          <form onSubmit={handleSaveProfile} className="space-y-6">
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-emerald-500" /> Personal & Account Information
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-emerald-500/50 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 rounded-xl py-2.5 px-3.5 text-xs font-medium text-slate-900 dark:text-slate-100 transition-all outline-none"
                      placeholder="Admin Name"
                    />
                  ) : (
                    <div className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-xs text-slate-900 dark:text-slate-100 font-semibold">
                      {name}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-emerald-500/50 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 rounded-xl py-2.5 px-3.5 text-xs font-medium text-slate-900 dark:text-slate-100 transition-all outline-none"
                      placeholder="admin@dailymitra.com"
                    />
                  ) : (
                    <div className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-xs text-slate-900 dark:text-slate-100 font-semibold">
                      {email}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-emerald-500/50 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 rounded-xl py-2.5 px-3.5 text-xs font-medium text-slate-900 dark:text-slate-100 transition-all outline-none"
                      placeholder="+91 98765 43210"
                    />
                  ) : (
                    <div className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-xs text-slate-900 dark:text-slate-100 font-semibold">
                      {phone}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Admin Title / Designation
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={adminTitle}
                      onChange={(e) => setAdminTitle(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-emerald-500/50 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 rounded-xl py-2.5 px-3.5 text-xs font-medium text-slate-900 dark:text-slate-100 transition-all outline-none"
                      placeholder="e.g. Store Operations Manager"
                    />
                  ) : (
                    <div className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-xs text-slate-900 dark:text-slate-100 font-semibold">
                      {adminTitle}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Scope & Operations */}
            <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-emerald-500" /> Administrative Scope & Location
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Access Scope & Permissions
                  </label>
                  {isEditing ? (
                    <select
                      value={accessScope}
                      onChange={(e) => setAccessScope(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-emerald-500/50 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 rounded-xl py-2.5 px-3 text-xs font-medium text-slate-900 dark:text-slate-100 transition-all outline-none"
                    >
                      <option value="Full Read / Write Inventory & Orders">Full Read / Write Inventory & Orders</option>
                      <option value="Super Administrator (All Access)">Super Administrator (All Access)</option>
                      <option value="Inventory & Stock Controller">Inventory & Stock Controller</option>
                      <option value="Orders & Fulfillment Operations">Orders & Fulfillment Operations</option>
                    </select>
                  ) : (
                    <div className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-xs text-slate-900 dark:text-slate-100 font-semibold">
                      {accessScope}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Fulfillment Hub Location
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={fulfillmentHub}
                      onChange={(e) => setFulfillmentHub(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-emerald-500/50 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 rounded-xl py-2.5 px-3.5 text-xs font-medium text-slate-900 dark:text-slate-100 transition-all outline-none"
                      placeholder="e.g. DailyMitra Central Hub #01"
                    />
                  ) : (
                    <div className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-xs text-slate-900 dark:text-slate-100 font-semibold">
                      {fulfillmentHub}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Footer */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
              {isEditing ? (
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-6 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md"
                  >
                    <Save className="w-4 h-4" /> Save Profile Changes
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="w-full sm:w-auto bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs px-5 py-2.5 rounded-xl transition-all"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 font-bold text-xs px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all"
                >
                  <Edit3 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Edit Admin Profile
                </button>
              )}

              <button
                type="button"
                onClick={() => setShowPasswordModal(true)}
                className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all ml-auto"
              >
                <KeyRound className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Change Security Password
              </button>
            </div>
          </form>
        </div>

        {/* Password Security Modal */}
        {showPasswordModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 max-w-md w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900 dark:text-slate-100">Change Admin Password</h3>
                    <p className="text-[11px] text-slate-500">Update security credentials for your admin account</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-emerald-500 rounded-xl p-2.5 text-xs text-slate-900 dark:text-slate-100 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password (min. 6 chars)"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-emerald-500 rounded-xl p-2.5 text-xs text-slate-900 dark:text-slate-100 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter new password"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-emerald-500 rounded-xl p-2.5 text-xs text-slate-900 dark:text-slate-100 outline-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowPasswordModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md transition-all flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Update Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminProfile;

