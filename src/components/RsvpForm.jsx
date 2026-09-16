import React, { useState, useEffect } from 'react';
import { Send, MessageSquare } from 'lucide-react';
import { getRsvpComments, submitRsvpComment } from '../api/rsvpApi';

export const RsvpForm = ({ onShowToast }) => {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState('Hadir');
  const [guestCount, setGuestCount] = useState('1 Orang');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadComments();
  }, []);

  const loadComments = async () => {
    const data = await getRsvpComments();
    setComments(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);
    try {
      await submitRsvpComment({ name, attendance, guestCount, message });
      setName('');
      setMessage('');
      onShowToast('Ucapan dan konfirmasi Anda berhasil dikirim!');
      await loadComments();
    } catch (error) {
      onShowToast('Gagal mengirim ucapan. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="rsvp-section">
      <div className="container">

        <div className="shadow-title-wrapper">
          <h2 className="shadow-title-main">RSVP & UCAPAN</h2>
          <span className="shadow-title-bg">RSVP & UCAPAN</span>
        </div>

        <div className="rsvp-card reveal">
          <h3><MessageSquare size={20} /> Kirim Doa & Ucapan</h3>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="rsvp-name">Nama Lengkap</label>
              <input
                id="rsvp-name"
                type="text"
                placeholder="Masukkan Nama Anda"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="rsvp-attendance">Konfirmasi Kehadiran</label>
              <select
                id="rsvp-attendance"
                value={attendance}
                onChange={(e) => setAttendance(e.target.value)}
              >
                <option value="Hadir">Saya Akan Hadir</option>
                <option value="Tidak Hadir">Maaf, Tidak Bisa Hadir</option>
                <option value="Masih Ragu">Masih Ragu / Belum Pasti</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="rsvp-guests">Jumlah Tamu</label>
              <select
                id="rsvp-guests"
                value={guestCount}
                onChange={(e) => setGuestCount(e.target.value)}
              >
                <option value="1 Orang">1 Orang</option>
                <option value="2 Orang">2 Orang</option>
                <option value="3+ Orang">Lebih dari 2 Orang</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="rsvp-message">Pesan & Doa Restu</label>
              <textarea
                id="rsvp-message"
                rows="4"
                placeholder="Tuliskan ucapan dan doa Anda..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn-submit-rsvp" disabled={isSubmitting}>
              {isSubmitting ? 'Mengirim...' : <><Send size={16} /> Kirim Ucapan</>}
            </button>
          </form>

          {/* COMMENTS FEED */}
          {comments.length > 0 ? (
            <div className="comments-feed">
              {comments.map((item) => (
                <div key={item.id} className="comment-item">
                  <div className="comment-header">
                    <span className="comment-author">{item.name}</span>
                    <span className="comment-badge">{item.attendance}</span>
                  </div>
                  <p className="comment-text">{item.message}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-comments-feed">
              <p>Belum ada ucapan. Jadilah yang pertama memberikan doa restu untuk kedua mempelai!</p>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
