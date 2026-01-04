import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { X, ArrowRight, Check } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType: 'tour' | 'lecture';
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, initialType }) => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    type: initialType,
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Reset form when modal opens with a new type
  useEffect(() => {
    if (isOpen) {
      setFormState(prev => ({ ...prev, type: initialType }));
      setIsSuccess(false);
      setIsSubmitting(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen, initialType]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const backdropVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants: Variants = {
    hidden: { x: '100%' },
    visible: { 
      x: 0,
      transition: { type: "spring", damping: 30, stiffness: 300 }
    },
    exit: { 
      x: '100%',
      transition: { duration: 0.3 }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex justify-end">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />

          {/* Side Drawer */}
          <motion.div
            className="relative w-full md:w-[600px] h-full bg-white shadow-2xl overflow-y-auto"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="p-8 md:p-12 min-h-full flex flex-col">
              {/* Header */}
              <div className="flex justify-between items-start mb-16">
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none">
                  Boek een<br />tour of lezing
                </h2>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={32} />
                </button>
              </div>

              {isSuccess ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
                    <Check size={40} />
                  </div>
                  <h3 className="text-3xl font-bold uppercase tracking-tight">Aanvraag Verstuurd</h3>
                  <p className="text-gray-600 max-w-xs">
                    Bedankt voor je interesse. We nemen zo snel mogelijk contact met je op om de details te bespreken.
                  </p>
                  <button 
                    onClick={onClose}
                    className="mt-8 px-8 py-3 bg-black text-white font-bold uppercase tracking-widest text-sm hover:bg-gray-800 transition-colors"
                  >
                    Sluiten
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex-1 flex flex-col space-y-12">
                  
                  {/* Type Selector */}
                  <div className="space-y-4">
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500">
                      Ik ben geïnteresseerd in
                    </label>
                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setFormState({ ...formState, type: 'tour' })}
                        className={`flex-1 py-4 border-2 font-bold uppercase tracking-wider transition-all duration-300 ${
                          formState.type === 'tour' 
                            ? 'border-black bg-black text-white' 
                            : 'border-gray-200 text-gray-400 hover:border-black hover:text-black'
                        }`}
                      >
                        Tour
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormState({ ...formState, type: 'lecture' })}
                        className={`flex-1 py-4 border-2 font-bold uppercase tracking-wider transition-all duration-300 ${
                          formState.type === 'lecture' 
                            ? 'border-black bg-black text-white' 
                            : 'border-gray-200 text-gray-400 hover:border-black hover:text-black'
                        }`}
                      >
                        Lezing
                      </button>
                    </div>
                  </div>

                  {/* Name */}
                  <div className="space-y-2 group">
                    <label htmlFor="name" className="block text-xs font-bold uppercase tracking-widest text-gray-500 group-focus-within:text-black transition-colors">
                      Naam *
                    </label>
                    <input
                      required
                      type="text"
                      id="name"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full py-2 border-b border-gray-300 focus:border-black outline-none font-medium text-lg bg-transparent transition-colors rounded-none"
                      placeholder="Je naam of organisatie"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2 group">
                    <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest text-gray-500 group-focus-within:text-black transition-colors">
                      Email *
                    </label>
                    <input
                      required
                      type="email"
                      id="email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full py-2 border-b border-gray-300 focus:border-black outline-none font-medium text-lg bg-transparent transition-colors rounded-none"
                      placeholder="jouw@email.com"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2 group">
                    <label htmlFor="message" className="block text-xs font-bold uppercase tracking-widest text-gray-500 group-focus-within:text-black transition-colors">
                      Bericht (Optioneel)
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full py-2 border-b border-gray-300 focus:border-black outline-none font-medium text-lg bg-transparent resize-none transition-colors rounded-none"
                      placeholder="Vertel ons meer over je aanvraag..."
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-8 mt-auto">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full group relative flex items-center justify-between px-8 py-5 bg-black text-white disabled:bg-gray-400 transition-all duration-300 overflow-hidden"
                    >
                      <span className="relative z-10 font-bold uppercase tracking-widest text-sm">
                        {isSubmitting ? 'Versturen...' : 'Aanvraag Versturen'}
                      </span>
                      <div className="relative z-10">
                        {isSubmitting ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        )}
                      </div>
                    </button>
                  </div>

                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;