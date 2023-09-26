import React from 'react';
import { WorkoutModalProps } from '../../types/types';

const WorkoutModal: React.FC<WorkoutModalProps> = ({ closeModal} ) => {
  return (
    <div>
      <div>
        <button onClick={() => closeModal()}>Nevermind!</button>
      </div>
      <div>
        Content
      </div>
      <div>
        <button onClick={() => closeModal()}>Good To Go!</button>
      </div>
    </div>
  );
};

export default WorkoutModal;