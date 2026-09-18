import React, { useState } from 'react';
import { Star, CheckCircle2, Trash2, MessageSquare } from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import { useNotification } from '../../context/NotificationContext';

const initialReviews = [
  { id: 1, user: 'Siddharth M.', product: 'Organic Green Big Sweet Pepper Seeds - Capsicum', rating: 5, comment: 'Crisp, fresh capsicum delivered right before morning breakfast!', status: 'Approved' },
  { id: 2, user: 'Kavita Roy', product: 'Seoul Yopokki Spicy 4 flavors of Korean Topokki', rating: 5, comment: 'Super spicy and delicious Korean snack cup. Kids loved it!', status: 'Approved' },
  { id: 3, user: 'Amitabh Sen', product: 'Mahin Brand, Extra Long Grain Basmati Rice', rating: 5, comment: 'Aromatic long grains, perfect for Sunday biryani.', status: 'Approved' },
  { id: 4, user: 'Pooja Mehta', product: 'APILIFE - Flavorful & Nutritious! Black Seed Honey', rating: 5, comment: 'Pure raw honey, great immunity booster for daily tea.', status: 'Approved' },
];

const Reviews = () => {
  const [reviews, setReviews] = useState(initialReviews);
  const { addToast } = useNotification();

  const handleDelete = (id) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
    addToast('Review deleted', 'info');
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-950 transition-colors">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 md:p-8 space-y-6 max-w-[1600px] w-full min-w-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            Customer Product Reviews
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Moderate product ratings and feedback posted by subscribers.
          </p>
        </div>

        <div className="space-y-4">
          {reviews.map((rev) => (
            <div key={rev.id} className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">{rev.user}</h4>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">on {rev.product}</p>
                </div>
                <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{rev.rating}.0</span>
                </div>
              </div>

              <p className="text-xs text-slate-700 dark:text-slate-300 italic">"{rev.comment}"</p>

              <div className="flex justify-between items-center pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 px-3 py-0.5 rounded-full">
                  {rev.status}
                </span>
                <button
                  onClick={() => handleDelete(rev.id)}
                  className="text-xs text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete Review
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Reviews;
