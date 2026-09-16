import React from 'react';
import { Copy } from 'lucide-react';
import { INVITATION_DATA } from '../config/invitationData';

export const DigitalGift = ({ onShowToast }) => {
  const { bankAccounts } = INVITATION_DATA;

  const handleCopy = (rawNumber, bankName) => {
    navigator.clipboard.writeText(rawNumber);
    onShowToast(`Nomor rekening ${bankName} berhasil disalin!`);
  };

  return (
    <section className="gift-section">
      <div className="container">

        <div className="shadow-title-wrapper">
          <h2 className="shadow-title-main">AMPLOP DIGITAL</h2>
          <span className="shadow-title-bg">AMPLOP DIGITAL</span>
        </div>

        <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.8)', maxWidth: '360px', margin: '0 auto 20px' }}>
          Doa restu Anda merupakan hadiah terindah bagi kami. Namun jika memberi adalah ungkapan tanda kasih Anda, Anda dapat memberi secara cashless:
        </p>

        <div className="bank-card-container">
          {bankAccounts.map((account, idx) => (
            <div key={idx} className="bank-card reveal">
              <span className="bank-badge">{account.bankName}</span>
              <div className="account-number">{account.accountNumber}</div>
              <div className="account-holder">{account.accountHolder}</div>
              <button
                className="btn-copy"
                onClick={() => handleCopy(account.rawNumber, account.bankName)}
              >
                <Copy size={14} /> Salin No. Rekening
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
