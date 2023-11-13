// import { useWorkoutStore } from '../zustand';
// const { workouts, refreshWorkouts } = useWorkoutStore();

export const fetchWorkoutsByDay = async (unixtime: number, user_id: number) => {
  try {
    const response = await fetch(`/api/workout/getByDay?unixtime=${unixtime}&user_id=${user_id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error fetching workouts by day');
  }
};

// fix data and typing => any
export const postWorkout = async (data: any) => {
  try {
    console.log('data', data);
    const response = await fetch('/api/workout/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    return response;
  } catch (error) {
    console.log('Error posting a workout');
  }
};

export const deleteWorkout = async (exercise_id: number) => {
  // const { workouts, refreshWorkouts } = useWorkoutStore();
  // console.log('selectedDate', selectedDate)
  try {
    const response = await fetch(`/api/workout/delete/${exercise_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.ok;
  } catch (error) {
    console.log('Error deleting a workout');
  }
};

export const deleteSet = async (set_id: number) => {
  try {
    const response = await fetch(`/api/workout/deleteSet/${set_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.ok;
  } catch (error) {
    console.log('Error deleting a set');
  }
};
// fix types here for editFormData
export const updateSet = async (set_id: number, editFormData: any) => {
  try {
    const response = await fetch(`/api/workout/updateSet/${set_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editFormData)
    });
    return response.ok;
  } catch (error) {
    console.log('Error updating workout');
  }
};

export const login = async (username: string, password: string) => {
  try {
    console.log('creds', username, password);
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password })
    });

    // if (!response) {
    //   throw new Error('No response from server')
    // }
    const data = await response.json();
    return data;
    // return { data, status: response.status };
  } catch (error) {
    console.log('Error logging in');
  }
};