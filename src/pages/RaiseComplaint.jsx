import React, { useState, useEffect } from 'react';
import { Sparkles, MapPin, Upload, ArrowRight, CheckCircle2, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LOCATIONS, CATEGORIES } from '../data/mockData';

export const RaiseComplaint = () => {
  const { addComplaint, analyzeComplaintWithAI } = useApp();

  const [title, setTitle] = useState('');
  const [location, setLocation] = useState(LOCATIONS[0]);
  const [category, setCategory] = useState(CATEGORIES[0].id);
  const [description, setDescription] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [manualPriority, setManualPriority] = useState(null);

  const [aiPrediction, setAiPrediction] = useState({
    priority: 'Medium',
    score: 50,
    category: 'General',
    reasoning: 'Fill out description to trigger AI severity analysis.'
  });

  useEffect(() => {
    if (description.length > 3 || title.length > 3) {
      const res = analyzeComplaintWithAI(title, description);
      setAiPrediction(res);
    }
  }, [title, description]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) return;

    addComplaint({
      title,
      location,
      category,
      description,
      manualPriority,
      imagePreview
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in pb-12">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="p-2 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-xl">
            <Sparkles className="w-5 h-5" />
          </span>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Raise New Maintenance Complaint</h1>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Our AI assistant automatically classifies priority to ensure fast response times.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Form */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-soft space-y-5">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Issue Title */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Issue Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Water leak from bathroom pipe or AC not cooling"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
              />
            </div>

            {/* Location Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Location / Building <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                >
                  {LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Category Selector Pills */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Category
              </label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                      category === cat.id
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Detailed Description <span className="text-rose-500">*</span>
              </label>
              <textarea
                required
                rows={4}
                placeholder="Describe what is broken, room number, or hazards (sparks, active water flow, broken glass)..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all resize-none"
              />
            </div>

            {/* Photo Upload Simulator */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Attach Photo Proof (Optional)
              </label>
              
              {imagePreview ? (
                <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 max-h-48 group">
                  <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover" />
                  <button
                    type="button"
                    onClick={() => setImagePreview(null)}
                    className="absolute top-2 right-2 p-1.5 bg-slate-900/80 text-white rounded-full hover:bg-rose-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-blue-500 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer bg-slate-50/50 dark:bg-slate-900/50 hover:bg-blue-50/20 transition-all text-center">
                  <Upload className="w-8 h-8 text-blue-500 mb-2" />
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Click to upload photo snippet</span>
                  <span className="text-[10px] text-slate-400 mt-0.5">PNG, JPG, or WEBP up to 5MB</span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Submit & Run AI Triage</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </form>
        </div>

        {/* AI Live Assistant Sidebar Box */}
        <div className="space-y-5">
          <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-2xl p-5 shadow-xl border border-blue-800 space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-400 animate-pulse" />
              <h3 className="text-sm font-bold tracking-tight">AI Smart Triage Engine</h3>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              As you type, CampusFix AI analyzes natural language keywords to auto-determine severity and category.
            </p>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-medium">Predicted Priority:</span>
                <span className={`font-bold px-2 py-0.5 rounded text-xs ${
                  aiPrediction.priority === 'Urgent' ? 'bg-rose-500 text-white' :
                  aiPrediction.priority === 'High' ? 'bg-orange-500 text-white' : 'bg-blue-500 text-white'
                }`}>
                  {aiPrediction.priority}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-medium">AI Severity Score:</span>
                <span className="font-mono font-bold text-blue-300 text-sm">{aiPrediction.score} / 100</span>
              </div>

              <div className="pt-2 border-t border-white/10 text-[11px] text-slate-300 leading-relaxed">
                <strong>Reasoning:</strong> {aiPrediction.reasoning}
              </div>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 text-xs space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Fast-Track Protocol
            </h4>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              Complaints flagged as <strong>Urgent</strong> immediately trigger push notifications to available technicians on shift.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
