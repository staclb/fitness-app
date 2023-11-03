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
}

// export const postSet = async (data: any) => {
//   try {
//     console.log('data', data);
//     const response = await fetch('/api/workout/post', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data)
//     });
//     return response;
//   } catch (error) {
//     console.log('Error posting workout');
//   }
// }