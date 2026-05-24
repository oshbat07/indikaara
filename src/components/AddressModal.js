import React from "react";
import { countries } from "../data/countries";

const AddressModal = ({
  show,
  onClose,
  onSave,
  form,
  setForm,
  isSaving,
  error,
  title,
  saveLabel,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center py-5 px-4 sm:px-6">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col"
        style={{ maxHeight: "80vh" }}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-slate-50 shrink-0">
          <h3 className="text-lg sm:text-xl font-semibold text-slate-950">
            {title || "Add Address"}
          </h3>
          <button
            aria-label="Close"
            onClick={onClose}
            className="text-slate-600 hover:text-slate-900 p-2 rounded-md"
          >
            ✕
          </button>
        </div>

        <div className="p-4 sm:p-5 overflow-y-auto flex-1 min-h-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="sm:col-span-2">
              <label className="text-sm font-semibold text-slate-900">
                Full name *
              </label>
              <input
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ac1f23]"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-900">
                Phone *
              </label>
              <input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ac1f23]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-sm font-semibold text-slate-900">
                Address *
              </label>
              <textarea
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="mt-2 w-full border border-gray-300 rounded-md px-2.5 py-2 h-20 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ac1f23]"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-900">
                City *
              </label>
              <input
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ac1f23]"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-900">
                State *
              </label>
              <input
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
                className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ac1f23]"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-900">
                Postal Code *
              </label>
              <input
                value={form.postalCode}
                onChange={(e) =>
                  setForm({ ...form, postalCode: e.target.value })
                }
                className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ac1f23]"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-900">
                Country
              </label>
              <select
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
                className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#ac1f23]"
              >
                {countries.map((country) => (
                  <option key={country.code} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="text-sm font-semibold text-slate-900">
                Label
              </label>
              <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-3">
                <select
                  value={form.label}
                  onChange={(e) => setForm({ ...form, label: e.target.value })}
                  className="border border-gray-300 rounded-md px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#ac1f23]"
                >
                  <option>Home</option>
                  <option>Office</option>
                  <option>Other</option>
                </select>
                {form.label === "Other" && (
                  <input
                    placeholder="Custom label"
                    value={form.customLabel}
                    onChange={(e) =>
                      setForm({ ...form, customLabel: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ac1f23]"
                  />
                )}
              </div>
            </div>

            <div className="sm:col-span-2 flex items-center gap-2 mt-2">
              <input
                id="isDefault"
                type="checkbox"
                checked={form.isDefault}
                onChange={(e) =>
                  setForm({ ...form, isDefault: e.target.checked })
                }
                className="h-4 w-4 text-[#ac1f23] rounded border-gray-300 focus:ring-[#ac1f23]"
              />
              <label htmlFor="isDefault" className="text-sm text-slate-900">
                Make default address
              </label>
            </div>
          </div>
        </div>

        {error && (
          <div className="px-6 pb-4 text-sm text-red-700 bg-red-50 border-t border-red-200">
            {error}
          </div>
        )}

        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-3 py-2.5 rounded-md border border-gray-200 bg-white text-slate-900 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            disabled={isSaving}
            className={`w-full sm:w-auto px-3 py-2.5 rounded-md text-white ${
              isSaving
                ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                : "bg-[#ac1f23] hover:bg-[#8f1a1d]"
            }`}
          >
            {isSaving ? "Saving..." : saveLabel || "Save address"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressModal;
