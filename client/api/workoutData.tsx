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
    console.log('Error posting workout');
  }
};

export const deleteWorkout = async (exercise_id: number) => {
  try {
    // console.log('exercise_id', exercise_id);
    const response = await fetch(`/api/workout/delete/${exercise_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.log('Error posting workout');
  }
};

export const deleteSet = async (set_id: number) => {
  try {
    // console.log('hi from delete set API FE')
    // console.log('set_id', set_id);
    const response = await fetch(`/api/workout/deleteSet/${set_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('response', response)
    return response;
  } catch (error) {
    console.log('Error posting workout');
  }
};