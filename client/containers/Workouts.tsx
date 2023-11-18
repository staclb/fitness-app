import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
// import WorkoutModal from '../modals/WorkoutModal';
import { useNavigate } from 'react-router-dom';
import {
  updateSet,
  deleteWorkout,
  deleteSet,
  postWorkout,
} from '../api/workoutData';
// import SetModal from '../modals/SetModal';
import { useWorkoutStore, useAuthStore } from '../zustand';
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
  // const [openSetModal, setOpenSetModal] = useState(false);
  // for editing weight + reps for a set
  const [editingSetId, setEditingSetId] = useState(null);
  const [editFormData, setEditFormData] = useState({ reps: '', weight: '' });

  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [workoutToDelete, setWorkoutToDelete] = useState(null);

  const { workouts, refreshWorkouts } = useWorkoutStore();
  const { token } = useAuthStore();
  const navigate = useNavigate();
  // console.log('workouts: ', workouts)

  // workout modal functions => might rework
  const openWorkoutModal = () => {
    setOpenWorkout(true);
  };

  const closeWorkoutModal = () => {
    setOpenWorkout(false);
  };
  // Calendar modal functions
  const openCalendarModal = () => {
    setOpenCalendar(true);
  };
  const closeCalendarModal = (date: Date) => {
    setSelectedDate(date);
    setOpenCalendar(false);
  };
  const cancelCalendarModal = () => {
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
    // const updated =
    await updateSet(setId, editFormData, token);
    const unixtime = selectedDate.getTime();
    // if (updated) {
    setEditingSetId(null);
    refreshWorkouts(unixtime, token);
    // }
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

  const handleSearchExerise = () => {
    navigate('/search', { state: { selectedDate } });
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
    <div className="flex flex-col relative h-screen">
      <button
        className="bg-gray-500 text-white font-bold py-2 px-4 rounded text-[30px] sticky top-0 z-10"
        type="button"
        onClick={openCalendarModal}
      >
        <div className="hover:text-gray-400">{currentDate(selectedDate)}</div>
      </button>
      <div className="pt-3">
        {Object.keys(workouts).map((exercise: string) => (
          <div className="pl-4" key={exercise}>
            <div className="flex justify-start">
              <div className="flex flex-col justify-start">
                <button
                  type="button"
                  onClick={() => {
                    handleAddSet(exercise);
                  }}
                  className="px-5"
                >
                  <i className="material-icons text-[30px] text-red-500 hover:bg-slate-900 rounded">
                    add
                  </i>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    openDeleteConfirmation(workouts[exercise][0].exerciseId)
                  }
                  className="px-5"
                >
                  <i className="material-icons text-[30px] text-red-500 hover:bg-slate-900 rounded">
                    delete
                  </i>
                </button>
              </div>
              <button
                className="text-[30px] text-red-500 hover:underline hover:underline-offset-2 hover:text-red-600"
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
        className="fixed bottom-20 right-5 bg-gray-500 text-white font-bold rounded-full p-2 h-14 w-14 hover:bg-gray-400 rounded"
        onClick={handleSearchExerise}
        type="button"
      >
        <i className="material-icons text-[40px]">add</i>
      </button>
      {openCalendar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center flex-col">
          <div className="pb-2">
            <button
              type="button"
              onClick={() => cancelCalendarModal()}
              className="bg-red-500 hover:bg-white text-black hover:text-red-500 font-bold p-2 rounded-full inline-flex items-center justify-center w-10 h-10"
            >
              <span className="text-xl font-bold">X</span>
            </button>
          </div>
          <Calendar
            onChange={onChange}
            defaultValue={selectedDate}
            onClickDay={closeCalendarModal}
          />
        </div>
      )}
      {/* {openWorkout && (
        <WorkoutModal
          closeWorkoutModal={closeWorkoutModal}
          selectedDate={selectedDate}
        />
      )} */}
    </div>
  );
}
export default Workouts;
