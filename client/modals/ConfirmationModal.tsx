import React from 'react';
import { ConfirmationModalProps } from '../../types/types';

const ConfirmationModal = ({
  onConfirm,
  onCancel,
  isOpen,
  message,
}: ConfirmationModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg z-50">
        <p className="text-black">{message}</p>
        <div className="flex justify-around mt-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
            type="button"
            onClick={onCancel}
          >
            No
          </button>
          <button
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            type="button"
            onClick={onConfirm}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
