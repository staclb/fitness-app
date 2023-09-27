import React from 'react';
import { WorkoutModalProps } from '../../types/types';

const WorkoutModal: React.FC<WorkoutModalProps> = ({ closeWorkoutModal} ) => {
  return (
    <div>
      <div>
        <button onClick={() => closeWorkoutModal()}>Nevermind!</button>
      </div>
      <div>
        Content
      </div>
      <div>
        <button onClick={() => closeWorkoutModal()}>Good To Go!</button>
      </div>
    </div>
  );
};

export default WorkoutModal;