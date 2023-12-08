export const youtubeAuth = async (token: string | null) => {
  try {
    const response = await fetch('/api/auth/youtube', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    // return data;
    window.location.href = data.url;
  } catch (error) {
    console.log(`Error in youtubeAuth api layer, ${error}`);
    return null;
  }
};

export const youtubeShorts = async (exercise: string, token: string | null) => {
  try {
    const response = await fetch(`/api/exercise/shorts?exercise=${exercise}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data.id.videoId;
  } catch (error) {
    console.log(`Error logging in youtubeShorts, ${error}`);
    return null;
  }
};
