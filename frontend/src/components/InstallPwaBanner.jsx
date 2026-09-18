import React, { useState, useEffect } from 'react';
import { Smartphone, Download, Share, PlusSquare, X, CheckCircle2 } from 'lucide-react';

export default function InstallPwaBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isIos, setIsIos] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showIosGuide, setShowIosGuide] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already running in standalone mode (installed PWA)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
    if (isStandalone) {
      setIsInstalled(true);
      return;
    }

    // Check if user previously dismissed the prompt recently
    const dismissedAt = localStorage.getItem('dailymitra_pwa_dismissed');
    if (dismissedAt) {
      const days = (Date.now() - parseInt(dismissedAt, 10)) / (1000 * 60 * 60 * 24);
      if (days < 3) return; // Don't prompt for 3 days after dismissal
    }

    // iOS Detection
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIos(isIosDevice);

    if (isIosDevice) {
      setShowBanner(true);
    }

    // Android / Chrome beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // App installed event listener
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowBanner(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIos) {
      setShowIosGuide(true);
      return;
    }

    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      console.log('User accepted PWA installation');
      setShowBanner(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowBanner(false);
    setShowIosGuide(false);
    localStorage.setItem('dailymitra_pwa_dismissed', Date.now().toString());
  };

  if (isInstalled || !showBanner) return null;

  return (
    <>
      {/* Floating Bottom App Installation Bar - Mobile Only (Hidden on Desktop & Laptop) */}
      <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 animate-bounce-short lg:hidden">
        <div className="bg-slate-900/95 backdrop-blur-xl border border-emerald-500/30 shadow-2xl shadow-emerald-950/50 rounded-2xl p-4 text-white">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-lg shadow-emerald-500/20 shrink-0 flex items-center justify-center">
                <img 
                  src="/icons/icon-192.png" 
                  alt="DailyMitra App Icon" 
                  className="w-full h-full object-cover rounded-[10px]"
                  onError={(e) => {
                    // Fallback to icon if image load fails
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-100 flex items-center gap-1.5">
                  Get DailyMitra Mobile App
                </h4>
                <p className="text-xs text-slate-400">
                  {isIos ? 'Install on iOS for fast daily ordering' : 'Install native Android app in 1 tap'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleInstallClick}
                className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-md shadow-emerald-500/20 flex items-center gap-1.5 active:scale-95"
              >
                {isIos ? (
                  <>
                    <Smartphone className="w-3.5 h-3.5" />
                    Install
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    Install
                  </>
                )}
              </button>

              <button
                onClick={handleDismiss}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                aria-label="Close installation banner"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* iOS Installation Instructions Modal */}
      {showIosGuide && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-end sm:items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-md shadow-2xl text-slate-100 space-y-5 animate-in fade-in slide-in-from-bottom-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base">Install DailyMitra on iOS</h3>
                  <p className="text-xs text-slate-400">Add to iPhone / iPad Home Screen</p>
                </div>
              </div>
              <button 
                onClick={() => setShowIosGuide(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800/80">
                <div className="w-7 h-7 rounded-full bg-emerald-500/10 text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0">
                  1
                </div>
                <div>
                  <p className="font-medium text-slate-200">Tap the Share button</p>
                  <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                    At the bottom bar of Safari, tap <Share className="w-3.5 h-3.5 text-blue-400 inline" />
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800/80">
                <div className="w-7 h-7 rounded-full bg-emerald-500/10 text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0">
                  2
                </div>
                <div>
                  <p className="font-medium text-slate-200">Scroll and select 'Add to Home Screen'</p>
                  <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                    Tap <PlusSquare className="w-3.5 h-3.5 text-emerald-400 inline" /> <strong>Add to Home Screen</strong>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800/80">
                <div className="w-7 h-7 rounded-full bg-emerald-500/10 text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0">
                  3
                </div>
                <div>
                  <p className="font-medium text-slate-200">Launch from Home Screen</p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Open DailyMitra from your home screen as a full-screen mobile app!
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowIosGuide(false)}
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-2xl text-sm transition-all shadow-lg shadow-emerald-500/20"
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </>
  );
}
