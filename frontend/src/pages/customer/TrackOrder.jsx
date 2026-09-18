import React, { useState } from 'react';
import { Truck, CheckCircle2, MapPin, Phone, ShieldCheck, Clock, UserCheck, Milk, PackageX } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useNotification } from '../../context/NotificationContext';

const TrackOrder = () => {
  const { ordersHistory } = useCart();
  const { addToast } = useNotification();
  
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  // Find active order or selected order
  const activeOrder = ordersHistory.find(o => o.id === selectedOrderId) ||
    ordersHistory.find(o => o.status !== 'Delivered' && o.status !== 'Cancelled') ||
    ordersHistory[0];

  if (!activeOrder) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center space-y-4">
        <Truck className="w-16 h-16 text-slate-400 mx-auto" />
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">No Orders to Track</h2>
        <p className="text-xs text-slate-500">Place an order to see live delivery tracking details.</p>
      </div>
    );
  }

  // Calculate active step index (1..4) based on real-time status from Admin / CartContext
  let activeStep = 1;
  if (activeOrder.status === 'Processing') activeStep = 2;
  if (activeOrder.status === 'Out for Delivery') activeStep = 3;
  if (activeOrder.status === 'Delivered') activeStep = 4;

  const isCancelled = activeOrder.status === 'Cancelled';

  const steps = [
    { title: 'Order Confirmed', time: '10:00 PM (Yesterday)', desc: 'Order received & items batch allocated', done: activeStep >= 1 && !isCancelled },
    { title: 'Chilled Packing & QC', time: '4:30 AM Today', desc: 'Temperature controlled packaging & quality check', done: activeStep >= 2 && !isCancelled },
    { title: 'Out for Doorstep Delivery', time: '6:15 AM Today', desc: 'Express Rider Ramesh is on the way to your doorstep', done: activeStep >= 3 && !isCancelled },
    { title: 'Delivered at Doorstep', time: '6:45 AM Today', desc: 'Silent morning doorstep drop complete', done: activeStep >= 4 && !isCancelled },
  ];

  const itemsSummary = activeOrder.items
    ? (typeof activeOrder.items === 'string' ? activeOrder.items : activeOrder.items.map(i => `${i.qty}x ${i.name}`).join(', '))
    : '1x Daily Grocery Items';

  return (
    <div className="max-w-5xl w-full mx-auto px-3 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-8 space-y-4 sm:space-y-8 overflow-x-hidden">
      
      {/* Order Switcher if multiple orders */}
      {ordersHistory.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <span className="text-xs font-bold text-slate-500 shrink-0">Select Order:</span>
          {ordersHistory.map((o) => (
            <button
              key={o.id}
              onClick={() => setSelectedOrderId(o.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                activeOrder.id === o.id
                  ? 'bg-[#053b27] text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              {o.id} ({o.status})
            </button>
          ))}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-emerald-500/30">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-emerald-500/20 text-emerald-400 font-extrabold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider">
              Live Order Tracking
            </span>
            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
              isCancelled
                ? 'bg-rose-500/20 text-rose-400'
                : activeOrder.status === 'Delivered'
                ? 'bg-emerald-500/20 text-emerald-400'
                : 'bg-amber-500/20 text-amber-400 animate-pulse'
            }`}>
              Status: {activeOrder.status}
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-100 mt-2">Order #{activeOrder.id}</h1>
          <p className="text-xs text-slate-400 truncate max-w-md">{itemsSummary} • ₹{activeOrder.total}</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl text-right">
          <p className="text-[11px] text-slate-400">Estimated Doorstep Drop</p>
          <span className="text-2xl font-extrabold text-emerald-400">6:45 AM</span>
          <p className="text-[10px] text-emerald-300 font-semibold">{activeOrder.deliverySlot || 'Morning Slot'}</p>
        </div>
      </div>

      {/* Driver Info Card */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 font-extrabold flex items-center justify-center text-lg">
            R
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-100">Ramesh Kumar</h4>
            <p className="text-xs text-slate-400">DailyMitra Express Rider • KA-03-EB-4912</p>
          </div>
        </div>

        <button
          onClick={() => addToast('Calling Delivery Rider Ramesh at +91 98765 00000', 'info')}
          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-sm"
        >
          <Phone className="w-4 h-4" /> Call Rider
        </button>
      </div>

      {/* Progress Bar Timeline */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-8">
        <h3 className="font-bold text-base text-slate-100 flex items-center gap-2">
          <Clock className="w-5 h-5 text-emerald-400" /> Delivery Progress
        </h3>

        {isCancelled ? (
          <div className="bg-rose-950/40 border border-rose-800/60 p-6 rounded-2xl text-center space-y-2">
            <PackageX className="w-10 h-10 text-rose-400 mx-auto" />
            <h4 className="font-bold text-rose-200 text-sm">This Order Has Been Cancelled</h4>
            <p className="text-xs text-rose-300">If you have any questions, please contact DailyMitra customer support.</p>
          </div>
        ) : (
          <div className="relative pl-6 border-l-2 border-slate-800 space-y-8">
            {steps.map((step, idx) => {
              const isCompleted = step.done;

              return (
                <div key={idx} className="relative group">
                  <div
                    className={`absolute -left-[31px] top-0.5 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                      isCompleted
                        ? 'bg-emerald-500 text-slate-950 shadow-glow'
                        : 'bg-slate-900 border border-slate-700 text-slate-500'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-4 h-4 stroke-[3]" /> : <span className="text-[10px] font-bold">{idx + 1}</span>}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className={`text-sm font-bold ${isCompleted ? 'text-slate-100' : 'text-slate-500'}`}>
                        {step.title}
                      </h4>
                      <span className="text-xs text-slate-400">{step.time}</span>
                    </div>
                    <p className="text-xs text-slate-400">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;
