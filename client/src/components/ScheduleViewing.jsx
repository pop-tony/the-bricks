import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { Clock, X, CheckCircle2 } from 'lucide-react';
import { format, addDays, isBefore, startOfToday } from 'date-fns';
import 'react-day-picker/dist/style.css';

const VIEWING_FEE = 100; // GHS 100

export default function ScheduleViewing({ property, isOpen, onClose }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [step, setStep] = useState('calendar'); // calendar | payment | success
  const [bookingRef, setBookingRef] = useState('');
  const [isPaying, setIsPaying] = useState(false);

  // Replace with API call to /api/availability/:propertyId
  const unavailableDates = [
    addDays(new Date(), 2),
    addDays(new Date(), 5),
  ];

  const timeSlots = ['10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM'];

  const disabledDays = [
    { before: startOfToday() },
  ...unavailableDates,
    { dayOfWeek: [0] } // No Sundays
  ];

  const handlePayment = () => {
    if (!window.PaystackPop) {
      alert('Payment system not loaded. Please refresh.');
      return;
    }

    setIsPaying(true);
    const reference = `VIEW_${property.id}_${Date.now()}`;

    const handler = window.PaystackPop.setup({
      key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY, // Your pk_test or pk_live
      email: 'customer@example.com', // Get from user auth/context
      amount: VIEWING_FEE * 100, // kobo
      ref: reference,
      metadata: {
        custom_fields: [
          { display_name: "Property ID", variable_name: "property_id", value: property.id },
          { display_name: "Property", variable_name: "property_title", value: property.title },
          { display_name: "Date", variable_name: "viewing_date", value: format(selectedDate, 'yyyy-MM-dd') },
          { display_name: "Time", variable_name: "viewing_time", value: selectedTime }
        ]
      },
      callback: function(response) {
        // Payment complete - verify on backend
        verifyAndSecureBooking(response.reference);
      },
      onClose: function() {
        setIsPaying(false);
      }
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
        const data = await res.json();
        setBookingRef(paymentRef);
        setStep('success');
      } else {
        alert('Booking failed. Please contact support.');
      }
    } catch (err) {
      console.error('Booking error:', err);
      alert('Network error. Please try again.');
    } finally {
      setIsPaying(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-brick-card">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg bg-brick-navy p-2 text-white hover:bg-brick-navy/80"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-6">
          {step === 'calendar' && (
            <>
              <h2 className="text-2xl font-bold text-white">Schedule Viewing</h2>
              <p className="mt-1 text-sm text-zinc-400">{property.title}</p>

              <div className="mt-6 flex justify-center">
                <DayPicker
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={disabledDays}
                  className="text-white"
                  styles={{
                    caption: { color: '#fff' },
                    head_cell: { color: '#D4AF37' }
                  }}
                  classNames={{
                    day_selected: 'bg-brick-gold text-brick-navy hover:bg-brick-gold',
                    day_today: 'text-brick-gold font-bold',
                    day_disabled: 'text-zinc-600',
                  }}
                />
              </div>

              {selectedDate && (
                <div className="mt-6">
                  <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-white">
                    <Clock className="h-4 w-4" /> Select Time
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map(time => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                          selectedTime === time
                          ? 'bg-brick-gold text-brick-navy'
                            : 'bg-brick-navy text-white hover:bg-brick-navy/80'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button
                disabled={!selectedDate ||!selectedTime}
                onClick={() => setStep('payment')}
                className="mt-6 w-full rounded-xl bg-brick-gold py-4 font-bold text-brick-navy disabled:opacity-50"
              >
                Continue to Payment
              </button>
            </>
          )}

          {step === 'payment' && (
            <>
              <h2 className="text-2xl font-bold text-white">Confirm Booking</h2>
              <div className="mt-6 space-y-4 rounded-xl bg-brick-navy p-4">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Property</span>
                  <span className="font-semibold text-white">{property.title}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Date</span>
                  <span className="font-semibold text-white">{format(selectedDate, 'PPP')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Time</span>
                  <span className="font-semibold text-white">{selectedTime}</span>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-4 text-lg">
                  <span className="font-bold text-white">Viewing Fee</span>
                  <span className="font-black text-brick-gold">GHS {VIEWING_FEE}</span>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={isPaying}
                className="mt-6 w-full rounded-xl bg-green-600 py-4 font-bold text-white hover:bg-green-700 disabled:opacity-50"
              >
                {isPaying? 'Processing...' : `Pay GHS ${VIEWING_FEE}`}
              </button>

              <button
                onClick={() => setStep('calendar')}
                className="mt-3 w-full text-sm text-zinc-400 hover:text-white"
              >
                Change date/time
              </button>
            </>
          )}

          {step === 'success' && (
            <div className="py-8 text-center">
              <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
              <h2 className="mt-4 text-2xl font-bold text-white">Booking Confirmed!</h2>
              <p className="mt-2 text-zinc-400">
                Your viewing is set for {format(selectedDate, 'PPP')} at {selectedTime}
              </p>
              <p className="mt-4 text-xs text-zinc-500">Ref: {bookingRef}</p>
              <button
                onClick={onClose}
                className="mt-6 w-full rounded-xl bg-brick-gold py-4 font-bold text-brick-navy"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
