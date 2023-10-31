import React from 'react';
import { WorkoutModalProps } from '../../types/types';

const WorkoutModal: React.FC<WorkoutModalProps> = ({ closeWorkoutModal} ) => {

  // will need to prop drill, subscribe to state with context or find a way to get date for saving with workout

  // will need to change data format later as well, because a user will wnat to select a wk,
  // reps and weight, but adjust number of sets later

  // first thoughts on this, display all the wk names for a selected day, but when clicked a modal appears
  // allowing users to customize the number of weight and reps for each logged set 
  // so if a wk for a selecetd day does not exist, then this component will add the first set to the modal
  // or maybe not a modal but a dropdown for the sets under a workout

  // a user somes in and if they do not have any workouts already for tyhe selected day(they'll show up when clicked)
  // they give these three fields, name, weight, reps
  // then an initial entry for the name is created for that day and an entry for the set
  // so any consecutive sets for that name are added under that name
  // so every exercise will have a time (current day/year), sets (mult entries in sets table in necc), 

  // 
  return (
    <div>
      <div>
        <button onClick={() => closeWorkoutModal()}>X</button>
      </div>
      <div className='flex flex-col'>
        <form>
          <label>
              Workout:
            <input type="text" name="name" />
          </label>
        </form>
        <form>
          <label>
              Weight:
            <input type="text" name="name" />
          </label>
        </form>
        {/* <form>
          <label>
              Sets:
            <input type="text" name="name" />
          </label>
        </form> */}
        <form>
          <label>
              Reps:
            <input type="text" name="name" />
          </label>
        </form>
      </div>
      <div>
        <button onClick={() => closeWorkoutModal()}>Save and Exit</button>
      </div>
    </div>
  );
};

export default WorkoutModal;

{/* <input type="submit" value="Submit" /> */}