import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Milk, Save, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';

const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  const { addToast } = useNotification();

  const [name, setName] = useState(user?.name || 'Rahul Sharma');
  const [phone, setPhone] = useState(user?.phone || '+91 98765 43210');
  const [address, setAddress] = useState(user?.address || 'Flat 402, Sunshine Apartments, Indiranagar, Bengaluru');
  const [subscription, setSubscription] = useState(user?.subscription || 'Daily 1L Pure Cow Milk (7 AM)');

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserProfile({ name, phone, address, subscription });
    addToast('Profile & Subscription preferences updated!', 'success');
  };

  return (
    <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-8 space-y-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-extrabold text-slate-100">Customer Profile & Address</h1>
        <p className="text-xs text-slate-400">Manage your contact details, doorstep delivery address and subscriptions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User Card */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 text-center space-y-4">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 font-extrabold text-2xl flex items-center justify-center shadow-glow">
            {name?.[0]?.toUpperCase() || 'U'}
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-100">{name}</h3>
            <p className="text-xs text-slate-400">{user?.email}</p>
            <span className="inline-block mt-2 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-3 py-1 rounded-full border border-emerald-500/20">
              Active Subscriber
            </span>
          </div>
        </div>

        {/* Profile Edit Form */}
        <form onSubmit={handleSubmit} className="md:col-span-2 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="font-bold text-sm text-slate-100 pb-3 border-b border-slate-800">Account Details</h3>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 px-3 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email (Primary)</label>
              <input
                type="email"
                disabled
                value={user?.email || 'customer@dailymitra.com'}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-slate-500 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 px-3 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Delivery Address</label>
            <textarea
              rows={2}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 px-3 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Active Plan Preference</label>
            <input
              type="text"
              value={subscription}
              onChange={(e) => setSubscription(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 px-3 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <button
            type="submit"
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-md"
          >
            <Save className="w-4 h-4" /> Save Profile Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
