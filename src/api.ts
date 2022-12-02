export const BASE_URL = "http://localhost:3030/users/";

export const getAllUsers = () => {
  return fetch(BASE_URL).then((res) => res.json());
};

export const addUser = (userData: UserData) => {
  return fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: Number(new Date()),
      name: userData.name,
      phone: userData.phone,
      email: userData.email,
      address: userData.address,
      country: userData.country,
    }),
  }).then(async (res) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return res.json();
  });
};
