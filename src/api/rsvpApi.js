/**
 * RSVP Local Storage Service (Tanpa Database)
 * 
 * Mengelola data RSVP dan ucapan secara lokal di browser menggunakan LocalStorage.
 * Tidak memerlukan koneksi database atau backend PHP.
 */

// Key penyimpanan komentar lokal
const STORAGE_KEY = 'wedding_pian_rista_real_comments_v1';

// Mengambil komentar RSVP dari LocalStorage
export const getRsvpComments = async () => {
  return getLocalStorageComments();
};

// Menyimpan komentar RSVP baru ke LocalStorage
export const submitRsvpComment = async (commentData) => {
  const newComment = {
    id: Date.now(),
    name: commentData.name,
    attendance: commentData.attendance,
    guestCount: commentData.guestCount,
    message: commentData.message,
    createdAt: new Date().toISOString()
  };
  return saveLocalStorageComment(newComment);
};

// Helper LocalStorage
function getLocalStorageComments() {
  // Hapus semua data ucapan tes sebelumnya dari browser
  try {
    localStorage.removeItem('pian_rista_rsvp_comments');
    localStorage.removeItem('pian_rista_comments');
  } catch (e) {
    // ignore
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    return [];
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return [];
  }
}

function saveLocalStorageComment(comment) {
  const current = getLocalStorageComments();
  const updated = [comment, ...current];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return comment;
}
