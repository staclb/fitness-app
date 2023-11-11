import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import WorkoutModal from '../modals/WorkoutModal';
import { fetchWorkoutsByDay, updateSet, deleteWorkout, deleteSet } from '../api/workoutData';
import SetModal from '../modals/SetModal';
// import { deleteWorkout, deleteSet } from '../api/workoutData';
import { useWorkoutStore } from '../zustand';



type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];
// type date = string | null;

const Workouts = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [value, onChange] = useState<Value>(new Date());
  const [openWorkout, setOpenWorkout] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);
  // const [workouts, setWorkouts] = useState<{ [exercise: string]: Array<{ reps: number; weight: number; exercise_id: number; set_id: number }> }>({});
  const [selectedExercise, setSelectedExercise] = useState('');
  const [openSetModal, setOpenSetModal] = useState(false);
  // for editing weight + reps for a set
  const [editingSetId, setEditingSetId] = useState(null);
  const [editFormData, setEditFormData] = useState({reps: '', weight: ''});

  const { workouts, refreshWorkouts } = useWorkoutStore();

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

  const toggleSetModal = (exercise: string) => {
    // needed to pass down exercise name to child comp
    setSelectedExercise(exercise);
    // try setOpenSetModal(!xxx); =? bang operator, the ntry with otehr modal fucntions
    if (openSetModal) {
      setOpenSetModal(false);
    } else {
      setOpenSetModal(true);
    }
  };

  const currentDate = (date: Date) => {
    // const timestamp = new Date().getTime();
    const todaysDate = date.getMonth() + 1 + '/' + date.getDate();
    return todaysDate;
  };

  const handleExerciseClick = (exercise: string) => {
    if (exercise === selectedExercise) {
      setSelectedExercise('');
    } else {
      setSelectedExercise(exercise);
    }
  };

  //  have to have this functon because the hooks cannot be used in the api layer
  const handleDeleteWorkout = async (exercise_id: number) => {
    // change later when adding user auth
    const user_id = 1;
    const unixtime = selectedDate.getTime();
    console.log(unixtime);
    const deleted = await deleteWorkout(exercise_id);
    if (deleted) {
      refreshWorkouts(unixtime, user_id);
    }
  };

  const handleDeleteSet = async (exercise_id: number) => {
    // change later when adding user auth
    const user_id = 1;
    const unixtime = selectedDate.getTime();
    console.log(unixtime);
    const deleted = await deleteSet(exercise_id);
    if (deleted) {
      refreshWorkouts(unixtime, user_id);
    }
    // error case?
  };

  // fix type for workout parameter
  const handleEditClick = (workout: any) => {
    console.log('hi from edit function');
    setEditingSetId(workout.set_id);
    setEditFormData({ reps: workout.reps, weight: workout.weight });
  };

  // fix type for workout parameter
  const handleSaveClick = async(setId: any) => {
    console.log('hi from save function');
    console.log(editFormData)
    const updated = await updateSet(setId, editFormData);
    const user_id = 1;
    const unixtime = selectedDate.getTime();
    if (updated) {
      setEditingSetId(null);
      refreshWorkouts(unixtime, user_id);
    }
    // error case?
  };

  // for fetching workout data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const unixtime = selectedDate.getTime();
        const user_id = 1;
        const data = await fetchWorkoutsByDay(unixtime, user_id);
        await refreshWorkouts(unixtime, user_id);
      } catch (error) {
        console.log('Error fetching workouts by day data');
      }
    };
    fetchData();
  }, [selectedDate, refreshWorkouts]);

  return (
    <div className='flex flex-col'>
      <button className="bg-blue-500 text-white font-bold " onClick={openCalendarModal}>
        {currentDate(selectedDate)}
      </button>
      <div>
        {Object.keys(workouts).map((exercise: string) => (
          <div key={exercise}>
            <h2 onClick={() => handleExerciseClick(exercise)}>{exercise}</h2>
            <button onClick={() => toggleSetModal(exercise)} className='text-[40px] px-8'>+</button>
            <button onClick={() => handleDeleteWorkout(workouts[exercise][0].exercise_id)} className='text-[40px]'>-</button>
            {selectedExercise === exercise && (
              <div>
                {workouts[exercise].map((workout) => (
                  <div key={workout.set_id} className='flex'>
                    {editingSetId === workout.set_id ? (
                      <div>
                        <input type='number' value={editFormData.reps} onChange={(e) => setEditFormData({ ...editFormData, reps: e.target.value })}></input>
                        <input type='number' value={editFormData.weight} onChange={(e) => setEditFormData({ ...editFormData, weight: e.target.value })}></input>
                        <button onClick={() => handleSaveClick(workout.set_id)}>SAVE</button>
                      </div>
                    ) : (
                      <div>
                        <p onClick={() => handleEditClick(workout)} className='px-8'>Reps: {workout.reps}</p>
                        <p onClick={() => handleEditClick(workout)} >Weight: {workout.weight}</p>
                      </div>
                    )}
                    <button onClick={() => handleDeleteSet(workout.set_id)} className='text-[40px]'>-</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <button className="bg-green-500 text-white font-bold py-2 px-4 rounded" onClick={openWorkoutModal}>
        +
      </button>
      {openCalendar && <Calendar onChange={onChange} defaultValue={selectedDate} onClickDay={closeCalendarModal}/>}

      {openWorkout && <WorkoutModal closeWorkoutModal={closeWorkoutModal} selectedDate={selectedDate}/>}

      {openSetModal && <SetModal toggleSetModal={toggleSetModal} selectedDate={selectedDate} selectedExercise={selectedExercise}/>}
    </div>
  );
};
export default Workouts;
