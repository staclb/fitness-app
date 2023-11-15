import React from 'react';
import { EditFormProps } from '../../types/types';

const EditForm = ({
  workout,
  setEditFormData,
  editFormData,
  handleSaveClick,
  handleDeleteSet,
}: EditFormProps) => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await handleSaveClick(workout.setId);
  };
  return (
    <div className="flex flex-col">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-row items-center space-x-2">
          <input
            className="w-24 h-7 rounded"
            type="number"
            value={editFormData.reps}
            onChange={(e) =>
              setEditFormData({ ...editFormData, reps: e.target.value })
            }
          />
          <input
            className="w-24 h-7 rounded"
            type="number"
            value={editFormData.weight}
            onChange={(e) =>
              setEditFormData({ ...editFormData, weight: e.target.value })
            }
          />
        </div>
        <div className="flex flex-row items-center space-x-2">
          <button
            className="w-24 h-7"
            type="button"
            onClick={() => handleSaveClick(workout.setId)}
          >
            <i className="material-icons text-[20px] text-red-500">save</i>
          </button>
          <button
            onClick={() => handleDeleteSet(workout.setId)}
            className="w-32 h-8"
            type="button"
          >
            <i className="material-icons text-[20px] text-red-500 pr-10">
              delete
            </i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditForm;
