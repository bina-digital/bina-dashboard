import DashboardLayout from "@/components/DashboardLayout";

export default function Settings() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-slate-400">Configure your MRI system</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Exchange Rate Settings */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold">Exchange Rate</h2>
                  <p className="text-sm text-slate-400">Current rate for MYR to IDR conversion</p>
                </div>
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm">Active</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-2">1 MYR = ? IDR</label>
                  <input
                    type="number"
                    defaultValue="3250"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Transaction Fee (RM)</label>
                  <input
                    type="number"
                    defaultValue="3"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-4 p-4 bg-slate-800/50 rounded-lg">
                <p className="text-sm text-slate-400">Rate last updated: 2026-02-27 14:30</p>
              </div>

              <div className="mt-4 flex gap-3">
                <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors">
                  Reset to Default
                </button>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition-colors">
                  Update Rate
                </button>
              </div>
            </div>

            {/* WhatsApp Settings */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold">WhatsApp Integration</h2>
                  <p className="text-sm text-slate-400">Bot configuration and status</p>
                </div>
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Connected
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                  <div>
                    <p className="font-medium">Bot Number</p>
                    <p className="text-sm text-slate-400">+60 11-1010 1875</p>
                  </div>
                  <button className="text-blue-400 hover:text-blue-300">Change</button>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                  <div>
                    <p className="font-medium">MRI Agent Number</p>
                    <p className="text-sm text-slate-400">+60 16-252 2225</p>
                  </div>
                  <button className="text-blue-400 hover:text-blue-300">Change</button>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                  <div>
                    <p className="font-medium">Rate Limiting</p>
                    <p className="text-sm text-slate-400">50 messages per batch</p>
                  </div>
                  <select className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1">
                    <option>50</option>
                    <option>100</option>
                    <option>200</option>
                  </select>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                  <div>
                    <p className="font-medium">Auto-reply</p>
                    <p className="text-sm text-slate-400">Respond to incoming messages</p>
                  </div>
                  <div className="w-12 h-6 bg-emerald-500 rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Loyalty Program Settings */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold">Loyalty Program</h2>
                  <p className="text-sm text-slate-400">Configure rewards and tiers</p>
                </div>
                <div className="w-12 h-6 bg-emerald-500 rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Free Transaction After</label>
                  <input
                    type="number"
                    defaultValue="5"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-200"
                  />
                  <p className="text-xs text-slate-500 mt-1">transactions</p>
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Referral Reward</label>
                  <input
                    type="number"
                    defaultValue="1"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-200"
                  />
                  <p className="text-xs text-slate-500 mt-1">RM per referral</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Settings */}
          <div className="space-y-6">
            {/* API Keys */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-4">API Keys</h2>
              <div className="space-y-3">
                <button className="w-full p-3 bg-slate-800/50 rounded-lg text-left hover:bg-slate-800 transition-colors">
                  <p className="font-medium">WhatsApp API</p>
                  <p className="text-xs text-slate-400">Configured</p>
                </button>
                <button className="w-full p-3 bg-slate-800/50 rounded-lg text-left hover:bg-slate-800 transition-colors">
                  <p className="font-medium">Database</p>
                  <p className="text-xs text-slate-400">Connected</p>
                </button>
                <button className="w-full p-3 bg-slate-800/50 rounded-lg text-left hover:bg-slate-800 transition-colors">
                  <p className="font-medium">Vercel Deploy</p>
                  <p className="text-xs text-slate-400">Active</p>
                </button>
              </div>
            </div>

            {/* System Info */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-4">System Info</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Version</span>
                  <span>v1.2.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Last Deploy</span>
                  <span>2026-02-27</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Database</span>
                  <span className="text-emerald-400">Healthy</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Bot Status</span>
                  <span className="text-emerald-400">Online</span>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-red-400 mb-4">Danger Zone</h2>
              <div className="space-y-3">
                <button className="w-full p-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg text-red-400 transition-colors">
                  Reset All Data
                </button>
                <button className="w-full p-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg text-red-400 transition-colors">
                  Disconnect WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
