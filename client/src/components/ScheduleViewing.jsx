import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { Clock, X, CheckCircle2 } from 'lucide-react';
import { format, addDays, startOfToday } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import 'react-day-picker/dist/style.css';

const ease = [0.22, 1, 0.36, 1];
const VIEWING_FEE = 100;

export default function ScheduleViewing({ property, isOpen, onClose }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [step, setStep] = useState('calendar');
  const [bookingRef, setBookingRef] = useState('');
  const [isPaying, setIsPaying] = useState(false);

  const unavailableDates = [addDays(new Date(), 2), addDays(new Date(), 5)];
  const timeSlots = ['10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM'];
  const disabledDays = [{ before: startOfToday() },...unavailableDates, { dayOfWeek: [0] }];

  const handlePayment = () => {
    if (!window.PaystackPop) return alert('Payment system not loaded.');
    setIsPaying(true);
    const reference = `VIEW_${property.id}_${Date.now()}`;

    const handler = window.PaystackPop.setup({
      key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
      email: 'customer@example.com',
      amount: VIEWING_FEE * 100,
      ref: reference,
      metadata: {
        custom_fields: [
          { display_name: "Property ID", variable_name: "property_id", value: property.id },
          { display_name: "Date", variable_name: "viewing_date", value: format(selectedDate, 'yyyy-MM-dd') },
          { display_name: "Time", variable_name: "viewing_time", value: selectedTime }
        ]
      },
      callback: (res) => verifyAndSecureBooking(res.reference),
      onClose: () => setIsPaying(false)
    });
    handler.openIframe();
  };

  const verifyAndSecureBooking = async (paymentRef) => {
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          propertyId: property.id,
          date: format(selectedDate, 'yyyy-MM-dd'),
          time: selectedTime,
          paymentRef,
          amount: VIEWING_FEE
        })
      });
      if (res.ok) {
        setBookingRef(paymentRef);
        setStep('success');
      } else {
        alert('Booking failed. Please contact support.');
      }
    } catch (err) {
      alert('Network error. Please try again.');
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease }}
            onClick={onClose}
            className="absolute inset-0 bg-brick-black/70 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.6, ease }}
            className="relative max-h- w-full max-w-lg overflow-y-auto bg-brick-white shadow-luxe"
          >
            <button
              onClick={onClose}
              className="absolute right-6 top-6 p-2 text-brick-muted transition-luxe hover:text-brick-charcoal"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="p-10">
              <AnimatePresence mode="wait">
                {step === 'calendar' && (
                  <motion.div
                    key="calendar"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.5, ease }}
                  >
                    <p className="text-brick-gold text-xs tracking-[0.2em] uppercase">Schedule Viewing</p>
                    <h2 className="font-serif mt-2 text-3xl text-brick-black">{property.title}</h2>

                    <div className="mt-8 flex justify-center">
                      <DayPicker
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={disabledDays}
                        className="text-brick-charcoal"
                        styles={{
                          caption: { color: '#1C1C1C', fontFamily: 'Playfair Display' },
                          head_cell: { color: '#B89B5E', fontSize: '0.75rem', textTransform: 'uppercase' }
                        }}
                        classNames={{
                          day_selected: 'bg-brick-gold text-brick-black hover:bg-brick-gold',
                          day_today: 'text-brick-gold font-semibold',
                          day: 'rounded-none hover:bg-brick-card',
                        }}
                      />
                    </div>

                    {selectedDate && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-8"
                      >
                        <p className="text-brick-gold text-xs tracking-[0.2em] uppercase mb-4">Select Time</p>
                        <div className="grid grid-cols-2 gap-3">
                          {timeSlots.map((time, i) => (
                            <motion.button
                              key={time}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.05, duration: 0.4, ease }}
                              onClick={() => setSelectedTime(time)}
                              className={`border py-3 text-xs font-medium uppercase tracking-[0.1em] transition-luxe ${
                                selectedTime === time
                                 ? 'border-brick-gold bg-brick-gold text-brick-black'
                                  : 'border-brick-subtle text-brick-muted hover:border-brick-charcoal hover:text-brick-charcoal'
                              }`}
                            >
                              {time}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      disabled={!selectedDate ||!selectedTime}
                      onClick={() => setStep('payment')}
                      className="mt-10 w-full bg-brick-charcoal py-4 text-xs font-medium uppercase tracking-[0.2em] text-brick-white transition-luxe hover:bg-brick-gold hover:text-brick-black disabled:opacity-30"
                    >
                      Continue to Payment
                    </motion.button>
                  </motion.div>
                )}

                {step === 'payment' && (
                  <motion.div
                    key="payment"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.5, ease }}
                  >
                    <p className="text-brick-gold text-xs tracking-[0.2em] uppercase">Confirm Booking</p>
                    <h2 className="font-serif mt-2 text-3xl text-brick-black">Review Details</h2>

                    <div className="mt-8 space-y-5 border-y border-brick-subtle py-6 text-sm">
                      <div className="flex justify-between">
                        <span className="text-brick-muted">Property</span>
                        <span className="text-right font-medium text-brick-charcoal">{property.title}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-brick-muted">Date</span>
                        <span className="font-medium text-brick-charcoal">{format(selectedDate, 'PPP')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-brick-muted">Time</span>
                        <span className="font-medium text-brick-charcoal">{selectedTime}</span>
                      </div>
                      <div className="flex justify-between items-baseline pt-2">
                        <span className="font-serif text-lg text-brick-black">Viewing Fee</span>
                        <span className="font-serif text-2xl text-brick-black">GHS {VIEWING_FEE}</span>
                      </div>
                    </div>

                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={handlePayment}
                      disabled={isPaying}
                      className="mt-8 w-full bg-brick-gold py-4 text-xs font-medium uppercase tracking-[0.2em] text-brick-black shadow-luxe transition-luxe hover:shadow-[0_20px_40px_-10px_rgba(184,155,94,0.4)] disabled:opacity-50"
                    >
                      {isPaying? 'Processing...' : `Pay GHS ${VIEWING_FEE}`}
                    </motion.button>

                    <button
                      onClick={() => setStep('calendar')}
                      className="mt-4 w-full text-xs text-brick-muted hover:text-brick-charcoal transition-luxe"
                    >
                      Change date/time
                    </button>
                  </motion.div>
                )}

                {step === 'success' && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease }}
                    className="py-12 text-center"
                  >
                    <CheckCircle2 className="mx-auto h-12 w-12 text-brick-gold" />
                    <h2 className="font-serif mt-6 text-3xl text-brick-black">Booking Confirmed</h2>
                    <p className="mt-3 text-sm text-brick-muted">
                      {format(selectedDate, 'PPP')} at {selectedTime}
                    </p>
                    <p className="mt-6 text- uppercase tracking-[0.2em] text-brick-muted">Ref: {bookingRef}</p>
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={onClose}
                      className="mt-8 w-full bg-brick-charcoal py-4 text-xs font-medium uppercase tracking-[0.2em] text-brick-white transition-luxe hover:bg-brick-gold hover:text-brick-black"
                    >
                      Done
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}