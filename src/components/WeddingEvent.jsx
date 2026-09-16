import React from 'react';
import { MapPin } from 'lucide-react';
import { INVITATION_DATA } from '../config/invitationData';

const formatImgUrl = (url) => {
  if (!url) return '';
  return url.replace(/^public\/?/, '/');
};

export const WeddingEvent = () => {
  const { resepsi, pemberkatan } = INVITATION_DATA.events;

  const eventList = [
    {
      id: 'pemberkatan',
      title: pemberkatan.title || 'Pemberkatan Nikah',
      dateStr: pemberkatan.fullDateStr,
      timeStr: pemberkatan.time,
      locationName: pemberkatan.locationName,
      googleMapsUrl: pemberkatan.googleMapsUrl,
      bgImage: formatImgUrl(pemberkatan.bgImage) || '/assets/images/THE_4065.jpg'
    },
    {
      id: 'resepsi',
      title: resepsi.title || 'Resepsi Nikah',
      dateStr: resepsi.fullDateStr,
      timeStr: resepsi.time,
      locationName: resepsi.locationName,
      googleMapsUrl: resepsi.googleMapsUrl,
      bgImage: formatImgUrl(resepsi.bgImage) || '/assets/images/THE_4140.jpg'
    }
  ];

  return (
    <section className="event-section">
      <div className="container">

        {/* SHADOWED TITLE WEDDING EVENT (Matching Screenshot) */}
        <div className="shadow-title-wrapper">
          <h2 className="shadow-title-main">WEDDING EVENT</h2>
          <span className="shadow-title-bg">WEDDING EVENT</span>
        </div>

        {/* LIST OF ASYMMETRIC CURVED EVENT CARDS */}
        <div className="event-cards-list">
          {eventList.map((event) => (
            <div key={event.id} className="event-asymmetric-card reveal">
              {/* PHOTO BACKGROUND WITH DARK OVERLAY */}
              <div
                className="event-card-bg"
                style={{ backgroundImage: `url('${event.bgImage}')` }}
              />
              <div className="event-card-overlay" />

              {/* CARD CONTENT */}
              <div className="event-card-body text-center">

                {/* SHADOWED SCRIPT TITLE FOR EVENT */}
                <div className="event-shadow-title-box">
                  <h3 className="event-script-main">{event.title}</h3>
                  <span className="event-script-bg">{event.title}</span>
                </div>

                <p className="event-date-line">{event.dateStr}</p>
                <p className="event-time-line">{event.timeStr}</p>

                {/* MAP ICON */}
                <div className="event-map-icon-box">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                    <line x1="9" y1="3" x2="9" y2="18" />
                    <line x1="15" y1="6" x2="15" y2="21" />
                  </svg>
                </div>

                <p className="event-location-text">{event.locationName}</p>

                {/* DARK PILL BUTTON: LIHAT LOKASI */}
                <a
                  href={event.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-lihat-lokasi"
                >
                  <MapPin size={16} /> Lihat Lokasi
                </a>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
