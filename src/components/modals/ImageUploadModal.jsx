import React, { useState } from 'react';
import { X, Camera, Upload, Trash2, Image as ImageIcon } from 'lucide-react';

export default function ImageUploadModal({ complaint, onClose, onUploadImage, onDeleteImage }) {
  if (!complaint) return null;

  const [phase, setPhase] = useState('after');
  const [caption, setCaption] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');

  const samplePresets = [
    { label: 'Repaired Panel Wiring', url: '/assets/repair_pipe_fixed.jpg' },
    { label: 'New Air Filter & Fan Assembly', url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80' },
    { label: 'Sealed Pipe Line & Valve', url: '/assets/complaint_pipe_leak.jpg' }
  ];

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!previewUrl) return;
    onUploadImage(complaint.id, phase, previewUrl, caption || `${phase === 'before' ? 'Before' : 'After'} repair photo`);
    setPreviewUrl('');
    setCaption('');
  };

  const beforeImages = complaint.repairImages?.before || [];
  const afterImages = complaint.repairImages?.after || [];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-700" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700 mb-4">
          <div className="flex items-center gap-2">
            <Camera size={20} className="text-blue-600 dark:text-blue-400" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Repair Image Manager</h2>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg">
            <X size={20} />
          </button>
        </div>

        <div className="text-xs text-slate-500 mb-4">
          Ticket: <strong className="text-slate-800 dark:text-slate-200">{complaint.ticketNo || complaint.id}</strong> — {complaint.title || complaint.description}
        </div>

        <form onSubmit={handleUploadSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Photo Phase</label>
              <select
                value={phase}
                onChange={(e) => setPhase(e.target.value)}
                className="w-full text-xs p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100"
              >
                <option value="before">Before Repair (Initial Inspection)</option>
                <option value="after">After Repair (Completion Proof)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Caption</label>
              <input
                type="text"
                placeholder="e.g. Replaced leaking valve gasket"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full text-xs p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100"
              />
            </div>
          </div>

          <div
            onClick={() => document.getElementById('photo-input').click()}
            className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-4 text-center cursor-pointer hover:border-blue-500 transition-colors"
          >
            <input id="photo-input" type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />
            <Upload size={24} className="mx-auto text-blue-500 mb-1" />
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">Click to upload photo from computer</p>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-slate-400 block mb-1">Or choose sample preset photo:</span>
            <div className="flex flex-wrap gap-2">
              {samplePresets.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => { setPreviewUrl(preset.url); setCaption(preset.label); }}
                  className="text-xs px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-blue-950 flex items-center gap-1 text-slate-700 dark:text-slate-300"
                >
                  <ImageIcon size={12} /> {preset.label}
                </button>
              ))}
            </div>
          </div>

          {previewUrl && (
            <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800 flex items-center justify-between gap-3">
              <img src={previewUrl} alt="Preview" className="w-16 h-12 object-cover rounded-lg" />
              <div className="flex-1 text-xs">
                <span className="font-bold text-blue-700 dark:text-blue-300">Ready to save ({phase} photo)</span>
                <p className="text-slate-500">{caption || 'No caption'}</p>
              </div>
              <button type="submit" className="px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700">
                Upload Photo
              </button>
            </div>
          )}
        </form>

        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl">
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
