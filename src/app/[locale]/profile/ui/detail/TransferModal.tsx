/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { UserApi } from '@/api/user/user.api'; // Импортируйте UserApi

interface TransferModalProps {
  onClose: () => void;
  balance: number;
  token: string;
  steamID: string;
}

const TransferModal: React.FC<TransferModalProps> = ({
  onClose,
  balance,
  token,
  steamID,
}) => {
  const [amount, setAmount] = useState<number>(0);
  const [recipient, setRecipient] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  console.log('steamid: ' + steamID);

  const handleTransfer = async () => {
    setError(null); // Сбрасываем ошибки перед началом передачи

    if (amount <= 0) {
      setError('Сумма должна быть больше 0.');
      return;
    }
    if (amount > balance) {
      setError('Недостаточно средств.');
      return;
    }

    try {
      await UserApi.transferFunds(token, steamID, recipient, amount); // Здесь укажите свой senderSteamId
      alert(`Переведено: ${amount} рублей пользователю ${recipient}`);
      onClose();
    } catch (err) {
      setError(err + 'Ошибка при переводе средств. Попробуйте еще раз.');
    }
  };

  const isTransferButtonDisabled =
    !recipient || amount <= 0 || amount > balance;

  return (
    <div
      style={{
        backgroundColor: '#2c003e',
        padding: '30px',
        borderRadius: '10px',
        color: '#ffffff',
        width: '300px',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1000,
      }}
    >
      <h2 style={{ color: '#ffffff', marginBottom: '20px' }}>
        Перевод средств
      </h2>
      <button
        onClick={onClose}
        style={{
          background: 'transparent',
          border: 'none',
          color: '#ffffff',
          fontSize: '24px',
          position: 'absolute',
          top: '15px',
          right: '15px',
        }}
      >
        &times;
      </button>
      <p style={{ color: '#ffffff', marginBottom: '15px' }}>
        Может быть переведено: {balance} рублей
      </p>
      {error && <p style={{ color: 'red', marginBottom: '15px' }}>{error}</p>}
      <div style={{ marginBottom: '20px' }}>
        <label
          style={{ color: '#ffffff', marginBottom: '5px', display: 'block' }}
        >
          Пользователь:
        </label>
        <input
          type="text"
          placeholder="Введите SteamID"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            backgroundColor: '#4b007f',
            color: '#ffffff',
          }}
        />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label
          style={{ color: '#ffffff', marginBottom: '5px', display: 'block' }}
        >
          Введите сумму:
        </label>
        <input
          type="number"
          value={amount === 0 ? '' : amount}
          onChange={(e) =>
            setAmount(e.target.value ? parseFloat(e.target.value) : 0)
          }
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            backgroundColor: '#4b007f',
            color: '#ffffff',
          }}
        />
      </div>
      <p style={{ color: '#ffffff', marginBottom: '20px' }}>
        Транзакция выполняется от 15 минут до 24 часов.
      </p>
      <button
        onClick={handleTransfer}
        style={{
          backgroundColor: isTransferButtonDisabled ? '#aaa' : '#5a9be6',
          color: '#ffffff',
          border: 'none',
          borderRadius: '5px',
          padding: '12px',
          cursor: isTransferButtonDisabled ? 'not-allowed' : 'pointer',
          width: '100%',
          transition: 'background-color 0.3s',
        }}
        disabled={isTransferButtonDisabled}
      >
        Подтвердить
      </button>
    </div>
  );
};

export default TransferModal;
