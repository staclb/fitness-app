export const fetchWorkoutsByDay = async (
  unixtime: number,
  token: string | null,
) => {
  try {
    const response = await fetch(`/api/workout/getByDay?unixtime=${unixtime}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error fetching workouts by day');
    return null;
  }
};

// fix data and typing => any
export const postWorkout = async (data: any, token: string | null) => {
  try {
    const response = await fetch('/api/workout/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return response;
  } catch (error) {
    console.log('Error posting a workout');
    return null;
  }
};

export const deleteWorkout = async (
  exerciseId: number,
  token: string | null,
) => {
  // const { workouts, refreshWorkouts } = useWorkoutStore();
  // console.log('selectedDate', selectedDate)
  // console.log(token)
  try {
    const response = await fetch(`/api/workout/delete/${exerciseId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.ok;
  } catch (error) {
    console.log('Error deleting a workout');
    return null;
  }
};

export const deleteSet = async (setId: number, token: string | null) => {
  // console.log(token)
  try {
    const response = await fetch(`/api/workout/deleteSet/${setId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.ok;
  } catch (error) {
    console.log('Error deleting a set');
    return null;
  }
};
// fix types here for editFormData
export const updateSet = async (
  setId: number,
  editFormData: any,
  token: string | null,
) => {
  // console.log(token)
  try {
    const response = await fetch(`/api/workout/updateSet/${setId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editFormData),
    });
    return response.ok;
  } catch (error) {
    console.log('Error updating workout');
    return null;
  }
};

export const login = async (username: string, password: string) => {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    // if (!response) {
    //   throw new Error('No response from server')
    // }
    const data = await response.json();
    return data;
    // return { data, status: response.status };
  } catch (error) {
    console.log('Error logging in');
    return null;
  }
};

export const signUp = async (
  username: string,
  password: string,
  email: string,
) => {
  try {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, email }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error logging in');
  }
};
