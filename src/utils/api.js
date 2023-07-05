export const backendServerUrl = process.env.REACT_APP_BACKEND_SERVER_LOCATION;

export const getUserInfo = async (token) => {
  const response = await fetch(`${backendServerUrl}/api/users/123`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
};
