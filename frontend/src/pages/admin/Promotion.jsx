import { useState } from "react";
import AdminLayout from "../../layout/AdminLayout";
import {
  Send,
  Mail,
  Users,
  Tag,
  FileText,
  AlignLeft,
  CheckCircle,
  Loader2,
  Megaphone,
  Eye,
  X,
} from "lucide-react";

/* ============================================================
   🔧 CONFIG — Update when integrating backend
   ============================================================ */
const BASE_URL = "http://localhost:5000";
const SEND_PROMOTION_ENDPOINT = `${BASE_URL}/api/v1/admin/promotion/send`;

/* ============================================================
   🔧 DUMMY DATA — Replace with real subscriber count from API
   ============================================================ */
const DUMMY_SUBSCRIBER_COUNT = 284;

const DUMMY_RECENT_PROMOTIONS = [
  { id: 1, subject: "Exclusive Diwali Export Deals 🎉", offerTitle: "Flat 20% Off on Bulk Orders", sentAt: "Oct 20, 2024", recipients: 280 },
  { id: 2, subject: "New Textile Collection Arrived",   offerTitle: "Premium Cotton Fabric Now Available", sentAt: "Sep 15, 2024", recipients: 265 },
  { id: 3, subject: "Flash Sale: Industrial Machinery", offerTitle: "Limited Stock — Order Now",           sentAt: "Aug 30, 2024", recipients: 271 },
];
/* ============================================================ */

const emptyForm = {
  subject:          "",
  offerTitle:       "",
  offerDescription: "",
};

export default function Promotion() {
  const [form, setForm]         = useState(emptyForm);
  const [errors, setErrors]     = useState({});
  const [loading, setLoading]   = useState(false);
  const [success, setSuccess]   = useState(false);
  const [apiError, setApiError] = useState(null);
  const [preview, setPreview]   = useState(false);

  /* ── Validation ── */
  const validate = () => {
    const err = {};
    if (!form.subject.trim())          err.subject          = "Subject is required";
    if (!form.offerTitle.trim())       err.offerTitle       = "Offer title is required";
    if (!form.offerDescription.trim()) err.offerDescription = "Offer promotion is required";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  /* ── Submit → POST /api/v1/admin/promotion/send ── */
  const handleSend = async () => {
    if (!validate()) return;

    try {
      setLoading(true);
      setApiError(null);

      const res = await fetch(SEND_PROMOTION_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`, // 🔧 add auth token when ready
        },
        body: JSON.stringify({
          subject:          form.subject,
          offerTitle:       form.offerTitle,
          offerDescription: form.offerDescription,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to send promotion");
      }

      setSuccess(true);
      setForm(emptyForm);
      setTimeout(() => setSuccess(false), 5000);

    } catch (err) {
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const field = (key) => ({
    value: form[key],
    onChange: (e) => {
      setForm({ ...form, [key]: e.target.value });
      if (errors[key]) setErrors({ ...errors, [key]: null });
    },
  });

  return (
    <AdminLayout>

      {/* ── Header ── */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <Megaphone size={24} className="text-blue-600" />
          <h1 className="text-3xl font-extrabold tracking-tight">Send Promotion</h1>
        </div>
        <p className="text-gray-500 ml-9">Compose and blast a promotional email to all subscribers.</p>
      </div>

      <div className="grid xl:grid-cols-3 gap-8 items-start">

        {/* ══════════════════════════════════════
            LEFT — Compose Form  (2/3)
        ══════════════════════════════════════ */}
        <div className="xl:col-span-2 space-y-5">

          {/* Subscriber info bar */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl px-5 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3 text-blue-700">
              <Users size={18} />
              <span className="text-sm font-semibold">
                This email will be sent to <span className="text-blue-900 font-bold">{DUMMY_SUBSCRIBER_COUNT}</span> subscribers
              </span>
            </div>
            <span className="text-xs text-blue-500 bg-blue-100 px-3 py-1 rounded-full font-medium">
              Batch of 50
            </span>
          </div>

          {/* Success Banner */}
          {success && (
            <div className="bg-green-50 border border-green-200 rounded-xl px-5 py-4 flex items-center gap-3 text-green-700">
              <CheckCircle size={20} className="text-green-500 shrink-0" />
              <div>
                <p className="font-semibold text-sm">Promotion sent successfully!</p>
                <p className="text-xs text-green-500">All subscribers have been notified.</p>
              </div>
            </div>
          )}

          {/* Error Banner */}
          {apiError && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-4 flex items-center justify-between text-red-600">
              <p className="text-sm font-medium">{apiError}</p>
              <button onClick={() => setApiError(null)}><X size={16} /></button>
            </div>
          )}

          {/* Form Card */}
          <div className="bg-white rounded-2xl border shadow-sm">

            <div className="px-7 py-5 border-b bg-gray-50 rounded-t-2xl">
              <h2 className="font-bold text-slate-800">Compose Promotion Email</h2>
              <p className="text-xs text-gray-400 mt-0.5">All fields are required before sending.</p>
            </div>

            <div className="p-7 space-y-6">

              {/* Subject */}
              <div>
                <label className="block text-sm font-semibold mb-1.5 flex items-center gap-2">
                  <Mail size={15} className="text-blue-500" />
                  Email Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Exclusive Diwali Export Deals 🎉"
                  {...field("subject")}
                  className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${errors.subject ? "border-red-400 bg-red-50" : ""}`}
                />
                {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
              </div>

              {/* Offer Title */}
              <div>
                <label className="block text-sm font-semibold mb-1.5 flex items-center gap-2">
                  <Tag size={15} className="text-blue-500" />
                  Offer Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Flat 20% Off on Bulk Orders"
                  {...field("offerTitle")}
                  className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${errors.offerTitle ? "border-red-400 bg-red-50" : ""}`}
                />
                {errors.offerTitle && <p className="text-red-500 text-xs mt-1">{errors.offerTitle}</p>}
              </div>

              {/* Offer Promotion */}
              <div>
                <label className="block text-sm font-semibold mb-1.5 flex items-center gap-2">
                  <AlignLeft size={15} className="text-blue-500" />
                  Offer Promotion <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={8}
                  placeholder="Describe your offer in detail. This will appear in the email body sent to all subscribers..."
                  {...field("offerDescription")}
                  className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition ${errors.offerDescription ? "border-red-400 bg-red-50" : ""}`}
                />
                {errors.offerDescription && <p className="text-red-500 text-xs mt-1">{errors.offerDescription}</p>}
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setPreview(true)}
                  disabled={!form.subject && !form.offerTitle && !form.offerDescription}
                  className="flex items-center gap-2 px-5 py-2.5 border rounded-xl text-sm font-medium hover:bg-gray-50 transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Eye size={16} /> Preview Email
                </button>

                <div className="flex gap-3">
                  <button
                    onClick={() => { setForm(emptyForm); setErrors({}); setApiError(null); }}
                    className="px-5 py-2.5 border rounded-xl text-sm font-medium hover:bg-gray-50 transition"
                  >
                    Clear
                  </button>
                  <button
                    onClick={handleSend}
                    disabled={loading}
                    className="flex items-center gap-2 px-7 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-xl text-sm font-semibold shadow transition"
                  >
                    {loading
                      ? <><Loader2 size={16} className="animate-spin" /> Sending...</>
                      : <><Send size={16} /> Send to All Subscribers</>
                    }
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════
            RIGHT — Recent Promotions (1/3)
        ══════════════════════════════════════ */}
        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">

          <div className="px-5 py-4 border-b bg-gray-50">
            <h3 className="font-bold text-sm text-slate-700">Recent Promotions</h3>
            <p className="text-xs text-gray-400 mt-0.5">{DUMMY_RECENT_PROMOTIONS.length} campaigns sent</p>
          </div>

          <div className="divide-y">
            {DUMMY_RECENT_PROMOTIONS.map((promo) => (
              <div key={promo.id} className="p-4 hover:bg-gray-50 transition">
                <p className="text-sm font-semibold text-slate-800 line-clamp-1 mb-0.5">
                  {promo.subject}
                </p>
                <p className="text-xs text-blue-600 mb-2">{promo.offerTitle}</p>
                <div className="flex items-center justify-between text-[11px] text-gray-400">
                  <span className="flex items-center gap-1">
                    <Users size={11} /> {promo.recipients} recipients
                  </span>
                  <span>{promo.sentAt}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="px-5 py-3 border-t bg-gray-50 text-center">
            <p className="text-xs text-gray-400">Powered by <span className="font-semibold text-blue-500">Brevo</span></p>
          </div>
        </div>

      </div>

      {/* ══════════════════════════════════════
          EMAIL PREVIEW MODAL
      ══════════════════════════════════════ */}
      {preview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">

            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h3 className="font-bold text-slate-800">Email Preview</h3>
              <button onClick={() => setPreview(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            {/* Simulated Email */}
            <div className="p-6">
              <div className="bg-gray-50 rounded-xl border p-5 space-y-4">

                <div className="text-xs text-gray-400 space-y-1">
                  <p><span className="font-semibold text-gray-600">From:</span> {process.env.companyName || "VR & Sons"} &lt;noreply@company.com&gt;</p>
                  <p><span className="font-semibold text-gray-600">Subject:</span> {form.subject || "—"}</p>
                </div>

                <div className="border-t pt-4">
                  <div className="bg-blue-600 text-white text-center py-4 rounded-t-lg">
                    <Megaphone size={24} className="mx-auto mb-1" />
                    <p className="text-xs font-semibold uppercase tracking-widest opacity-80">Special Offer</p>
                  </div>

                  <div className="bg-white border border-t-0 rounded-b-lg px-5 py-5 text-center space-y-3">
                    <h2 className="text-lg font-bold text-slate-800">
                      {form.offerTitle || "Your Offer Title"}
                    </h2>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {form.offerDescription || "Your offer promotion will appear here..."}
                    </p>
                    <button className="mt-2 bg-blue-600 text-white text-sm px-6 py-2 rounded-lg font-semibold">
                      Explore Now
                    </button>
                  </div>
                </div>

                <p className="text-center text-[10px] text-gray-400">
                  You received this because you subscribed to our promotions.
                </p>
              </div>
            </div>

            <div className="px-6 py-4 border-t flex justify-end gap-3">
              <button onClick={() => setPreview(false)} className="px-5 py-2 border rounded-xl text-sm hover:bg-gray-50">
                Close
              </button>
              <button
                onClick={() => { setPreview(false); handleSend(); }}
                className="px-5 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold flex items-center gap-2"
              >
                <Send size={15} /> Send Now
              </button>
            </div>
          </div>
        </div>
      )}

    </AdminLayout>
  );
}