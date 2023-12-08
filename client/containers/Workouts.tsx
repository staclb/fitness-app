import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  updateSet,
  deleteWorkout,
  deleteSet,
  postWorkout,
} from '../api/workoutData';
import { useWorkoutStore, useAuthStore } from '../zustand';
import ConfirmationModal from '../modals/ConfirmationModal';
import EditForm from '../modals/EditForm';
import { WorkoutSet } from '../../types/types';
import { youtubeShorts } from '../api/youtubeData';
import YoutubeModal from '../modals/YoutubeModal';

// types for date, extended to array (range) if neccessary
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

function Workouts() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [value, setValue] = useState<Value>(new Date());
  const [openCalendar, setOpenCalendar] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState('');
  // state for editing weight + reps for a set
  const [editingSetId, setEditingSetId] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState({ reps: '', weight: '' });

  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [workoutToDelete, setWorkoutToDelete] = useState<number | null>(null);

  const [openYoutubeModal, setOpenYoutubeModal] = useState(false);
  const [youtubeVideoId, setYoutubeVideoId] = useState(null);

  const { workouts, refreshWorkouts } = useWorkoutStore();
  const { token } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const currentDate = (date: Date) => {
    // forms date string for display
    const todaysDate = `${date.getMonth() + 1}/${date.getDate()}`;
    return todaysDate;
  };

  // combined into a single function with action for specification
  const toggleCalendarModal = (date?: Date | null, action = '') => {
    if (action === 'open') {
      setOpenCalendar(true);
    } else if (action === 'close' && date) {
      setSelectedDate(date);
      setOpenCalendar(false);
    } else {
      setOpenCalendar(false);
    }
  };

  // put into another file?
  const handleAddSet = async (exercise: string) => {
    try {
      const unixtime = selectedDate.getTime();
      // has to be here because workouts is from zustand, accessed by a hook
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

  const handleDeleteSet = async (setId: number) => {
    const unixtime = selectedDate.getTime();
    const deleted = await deleteSet(setId, token);
    if (deleted) {
      refreshWorkouts(unixtime, token);
    } else {
      console.log('error deleting a set');
    }
  };

  const handleExerciseClick = (exercise: string) => {
    if (exercise === selectedExercise) {
      setSelectedExercise('');
    } else {
      setSelectedExercise(exercise);
    }
  };

  const handleEditClick = (workout: WorkoutSet) => {
    setEditingSetId(workout.setId);
    setEditFormData({
      reps: String(workout.reps),
      weight: String(workout.weight),
    });
  };

  const handleSaveClick = async (setId: number) => {
    await updateSet(setId, editFormData, token);
    const unixtime = selectedDate.getTime();
    setEditingSetId(null);
    refreshWorkouts(unixtime, token);
  };

  const handleSearchExerise = () => {
    // navigate should only pass serializable data, not functions
    navigate('/search', { state: { selectedDate } });
  };

  // combined confirm function with action variable
  const handleDeleteWorkout = async (
    action: string,
    exerciseId: number | null,
  ) => {
    setIsConfirmationModalOpen(false);
    if (action === 'open') {
      setWorkoutToDelete(exerciseId);
      setIsConfirmationModalOpen(true);
    } else if (action === 'confirm') {
      if (workoutToDelete) {
        const deleted = await deleteWorkout(workoutToDelete, token);
        setWorkoutToDelete(null);
        if (deleted) {
          const unixtime = selectedDate.getTime();
          refreshWorkouts(unixtime, token);
        }
      }
    } else if (action === 'cancel') {
      setIsConfirmationModalOpen(false);
    }
  };

  const handleYoutubeShorts = async (exercise: string) => {
    const response = await youtubeShorts(exercise, token);
    // const response = await youtubeShorts(exercise, token);
    if (response) {
      setYoutubeVideoId(response);
      setOpenYoutubeModal(true);
    }
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

    if (location.state && 'newSetId' in location.state) {
      setEditingSetId(location.state.newSetId);
      handleExerciseClick(location.state.exerciseName);
    }
  }, [selectedDate, location.state]);

  return (
    <div className="flex flex-col relative h-screen">
      <button
        className="bg-gray-500 text-white font-bold py-2 px-4 rounded text-[30px] sticky top-0 z-10"
        type="button"
        onClick={() => toggleCalendarModal(undefined, 'open')}
      >
        <div className="hover:text-gray-400">{currentDate(selectedDate)}</div>
      </button>
      <div className="pt-3">
        {Object.keys(workouts).map((exercise: string) => (
          <div className="pl-4 pb-5" key={exercise}>
            <div className="flex justify-start">
              <div className="flex flex-col justify-start">
                <button
                  type="button"
                  onClick={() =>
                    handleDeleteWorkout(
                      'open',
                      workouts[exercise][0].exerciseId,
                    )
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
              <button
                className="text-[30px] text-red-500 hover:underline hover:underline-offset-2 hover:text-red-600"
                type="button"
                onClick={() => handleYoutubeShorts(exercise)}
              >
                <i className="material-icons text-[30px] text-red-500 hover:bg-slate-900 rounded">
                  play_arrow
                </i>
              </button>
            </div>
            {selectedExercise === exercise && (
              <div className="">
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
          onConfirm={() => handleDeleteWorkout('confirm', null)}
          onCancel={() => handleDeleteWorkout('cancel', null)}
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
              onClick={() => toggleCalendarModal()}
              className="bg-red-500 hover:bg-white text-black hover:text-red-500 font-bold p-2 rounded-full inline-flex items-center justify-center w-10 h-10"
            >
              <span className="text-xl font-bold">X</span>
            </button>
          </div>
          <Calendar
            onChange={setValue}
            value={selectedDate}
            onClickDay={(date) => toggleCalendarModal(date, 'close')}
            tileClassName={({ date, view }) =>
              view === 'month' && date.getTime() === selectedDate.getTime()
                ? 'bg-red-500'
                : null
            }
          />
        </div>
      )}
      {openYoutubeModal && (
        <YoutubeModal
          videoId={youtubeVideoId}
          onClose={() => setOpenYoutubeModal(false)}
        />
      )}
    </div>
  );
}
export default Workouts;
