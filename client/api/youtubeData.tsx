export const youtubeAuth = async () => {
  try {
    console.log('hi fro teh api layer');
    const response = await fetch('/api/auth/youtube', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify({ username, password }),
    });
    const data = response.json();
    return data;
    // window.location.href = 'http://localhost:3000/api/auth/youtube';
  } catch (error) {
    console.log(`Error in youtubeAuth api layer, ${error}`);
    return null;
  }
};

export const youtubeShorts = async () => {
  try {
    console.log('hi');
  } catch (error) {
    console.log('Error logging in');
    return null;
  }
};
