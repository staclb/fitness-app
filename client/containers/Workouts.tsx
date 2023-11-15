import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import WorkoutModal from '../modals/WorkoutModal';
import {
  updateSet,
  deleteWorkout,
  deleteSet,
  postWorkout,
} from '../api/workoutData';
// import SetModal from '../modals/SetModal';
import { useWorkoutStore, userAuthStore } from '../zustand';
import ConfirmationModal from '../modals/ConfirmationModal';
import EditForm from '../components/EditForm';
// import { postWorkout } from '../api/workoutData';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];
// type date = string | null;

function Workouts() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [value, onChange] = useState<Value>(new Date());
  const [openWorkout, setOpenWorkout] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);
  // const [workouts, setWorkouts] = useState<{ [exercise: string]: Array<{ reps: number; weight: number; exerciseId: number; setId: number }> }>({});
  const [selectedExercise, setSelectedExercise] = useState('');
  const [openSetModal, setOpenSetModal] = useState(false);
  // for editing weight + reps for a set
  const [editingSetId, setEditingSetId] = useState(null);
  const [editFormData, setEditFormData] = useState({ reps: '', weight: '' });

  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [workoutToDelete, setWorkoutToDelete] = useState(null);

  const { workouts, refreshWorkouts } = useWorkoutStore();
  const { token } = userAuthStore();

  const openWorkoutModal = () => {
    setOpenWorkout(true);
  };

  const closeWorkoutModal = () => {
    setOpenWorkout(false);
  };

  const openCalendarModal = () => {
    setOpenCalendar(true);
  };

  const closeCalendarModal = (date: Date) => {
    setSelectedDate(date);
    setOpenCalendar(false);
  };

  const handleAddSet = async (exercise: string) => {
    try {
      const unixtime = selectedDate.getTime();
      const workoutData = {
        weight: Number(
          workouts[exercise][workouts[exercise].length - 1].weight,
        ),
        reps: Number(workouts[exercise][workouts[exercise].length - 1].reps),
        unixtime,
        name: exercise,
      };
      const response = await postWorkout(workoutData, token);
      if (response) {
        setSelectedExercise(exercise);
        await refreshWorkouts(unixtime, token);
      }
    } catch (error) {
      console.log('Error adding a set', error);
    }
  };

  const currentDate = (date: Date) => {
    // forms date string for display
    const todaysDate = `${date.getMonth() + 1}/${date.getDate()}`;
    return todaysDate;
  };

  const handleExerciseClick = (exercise: string) => {
    if (exercise === selectedExercise) {
      setSelectedExercise('');
    } else {
      setSelectedExercise(exercise);
    }
  };

  const handleDeleteSet = async (setId: number) => {
    const unixtime = selectedDate.getTime();
    // console.log(unixtime);
    const deleted = await deleteSet(setId, token);
    if (deleted) {
      refreshWorkouts(unixtime, token);
    }
    // error case?
  };

  // fix type for workout parameter
  const handleEditClick = (workout: any) => {
    setEditingSetId(workout.setId);
    setEditFormData({ reps: workout.reps, weight: workout.weight });
  };

  const handleSaveClick = async (setId: number) => {
    const updated = await updateSet(setId, editFormData, token);
    const unixtime = selectedDate.getTime();
    if (updated) {
      setEditingSetId(null);
      refreshWorkouts(unixtime, token);
    }
    // error case?
  };
  // fix typing here
  const openDeleteConfirmation = (exerciseId: any) => {
    setWorkoutToDelete(exerciseId);
    setIsConfirmationModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (workoutToDelete) {
      const deleted = await deleteWorkout(workoutToDelete, token);
      setWorkoutToDelete(null);
      if (deleted) {
        const unixtime = selectedDate.getTime();
        refreshWorkouts(unixtime, token);
      }
    }
    setIsConfirmationModalOpen(false);
  };

  // perhaps not needed, could combine with confirm function
  const handleCancelDelete = () => {
    setIsConfirmationModalOpen(false);
  };

  // for fetching workout data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const unixtime = selectedDate.getTime();
        await refreshWorkouts(unixtime, token);
      } catch (error) {
        console.log('Error fetching workouts by day data');
      }
    };
    fetchData();
  }, [selectedDate, refreshWorkouts]);

  return (
    <div className="flex flex-col relative h-full">
      <button
        className="bg-slate-300 text-white font-bold py-2 px-4 rounded text-[30px]"
        type="button"
        onClick={openCalendarModal}
      >
        {currentDate(selectedDate)}
      </button>
      <div className="">
        {Object.keys(workouts).map((exercise: string) => (
          <div className="pl-4" key={exercise}>
            <div className="flex justify-start">
              <div className="flex flex-col justify-start">
                <button
                  type="button"
                  onClick={() => {
                    handleAddSet(exercise);
                  }}
                  className="px-5 "
                >
                  <i className="material-icons text-[30px] text-red-500">add</i>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    openDeleteConfirmation(workouts[exercise][0].exerciseId)
                  }
                >
                  <i className="material-icons text-[30px] text-red-500">
                    delete
                  </i>
                </button>
              </div>
              <button
                className="text-[30px] text-red-500"
                onClick={() => {
                  handleExerciseClick(exercise);
                }}
                type="button"
              >
                {exercise}
              </button>
            </div>
            {selectedExercise === exercise && (
              <div className="border-1 border-red-500">
                <div className="flex justify-start px-2">
                  <span className="w-24 h-7 text-[15px] text-red-500 px-6">
                    Reps
                  </span>
                  <span className="w-24 h-7 text-[15px] text-red-500">
                    Weight
                  </span>
                </div>
                {workouts[exercise].map((workout) => (
                  <div
                    key={workout.setId}
                    className="border-1 border-red-500 flex flex-row"
                  >
                    {editingSetId === workout.setId ? (
                      // separated into another component
                      <EditForm
                        workout={workout}
                        editFormData={editFormData}
                        setEditFormData={setEditFormData}
                        handleSaveClick={handleSaveClick}
                        handleDeleteSet={handleDeleteSet}
                      />
                    ) : (
                      <div>
                        <button
                          className="px-8 text-[15px] text-red-500"
                          onClick={() => {
                            handleEditClick(workout);
                          }}
                          type="button"
                        >
                          {workout.reps}
                        </button>
                        <button
                          className="px-8 text-[15px] text-red-500"
                          onClick={() => {
                            handleEditClick(workout);
                          }}
                          type="button"
                        >
                          {workout.weight}
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        <ConfirmationModal
          isOpen={isConfirmationModalOpen}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          message="Are you sure you want to delete this workout?"
        />
      </div>
      <button
        className="absolute bottom-5 right-5 bg-slate-300 text-white font-bold rounded-full p-2 h-14 w-14"
        onClick={openWorkoutModal}
        type="button"
      >
        <i className="material-icons text-[40px]">add</i>
      </button>
      {openCalendar && (
        <Calendar
          onChange={onChange}
          defaultValue={selectedDate}
          onClickDay={closeCalendarModal}
        />
      )}

      {openWorkout && (
        <WorkoutModal
          closeWorkoutModal={closeWorkoutModal}
          selectedDate={selectedDate}
        />
      )}
    </div>
  );
}
export default Workouts;
