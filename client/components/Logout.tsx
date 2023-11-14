import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const navigate = useNavigate();

  const areYouSure = () => {
    setOpenLogoutModal(true);
  };

  const handleLogout = () => {
    navigate('/');
    setOpenLogoutModal(false);
  };

  const handleClose = () => {
    setOpenLogoutModal(false);
  };

  return (
    <div>
      <button className="" type="submit" onClick={areYouSure}>
        <i className="material-icons text-[20px]">logout</i>
      </button>
      {openLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg z-50">
            <p className="text-black">Are you sure?</p>
            <div className="flex justify-around mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                type="button"
                onClick={handleClose}
              >
                No
              </button>
              <button
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                type="button"
                onClick={handleLogout}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Logout;
