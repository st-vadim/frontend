const getData = async (url) => {
  try {
    const response = await fetch(url);
    if (response.status !== 200) {
      throw new Error("Ошибка получения данных");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

const normalizeDataObject = (obj) => {
  let str = JSON.stringify(obj);

  str = str.replaceAll("_id", "id");
  const newObj = JSON.parse(str);
  const result = { ...newObj, category: newObj.categories };
  return result;
};

export const normalizeData = (data) => {
  return data.map((item) => {
    return normalizeDataObject(item);
  });
};

export const isResponseOk = (response) => {
  return !(response instanceof Error);
};

export const getNormalizedGameDataById = async (url, id) => {
  const data = await getData(`${url}/${id}`);
  return isResponseOk(data) ? normalizeDataObject(data) : data;
  s;
};

export const getNormalizedGamesDataByCategory = async (url, category) => {
  const data = await getData(`${url}?categories.name=${category}`);
  return isResponseOk(data) ? normalizeData(data) : data;
};

// Registration new user
export const register = async (url, data) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (response.status !== 200) {
      throw new Error("Ошибка регистрации");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};

// Authorization user
export const authorize = async (url, data) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (response.status !== 200) {
      throw new Error("Ошибка авторизации");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};

// Get information user
export const getMe = async (url, jwt) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { Authorization: `Bearer ${jwt}` },
    });
    if (response.status !== 200) {
      throw new Error("Ошибка получения данных");
    }
    const result = response.json();
    return result;
  } catch (error) {
    return error;
  }
};

// JWT token
export const setJWT = (jwt) => {
  document.cookie = `jwt=${jwt}`;
  localStorage.setItem("jwt", jwt);
};

export const getJWT = () => {
  if (document.cookie === "") {
    return localStorage.getItem("jwt");
  }
  const jwt = document.cookie.split(";").find((item) => item.includes("jwt"));
  return jwt ? jwt.split("=")[1] : null;
};

export const removeJWT = () => {
  document.cookie = "jwt=;";
  localStorage.removeItem("jwt");
};

// Check auth user
export const checkIfUserVoted = (game, userId) => {
  return game.users.find((user) => user.id === userId);
};

// Update votes
export const vote = async (url, jwt, usersArray) => {
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({ users: usersArray }),
    });
    if (response.status !== 200) {
      throw new Error("Ошибка голосования");
    }
    const result = response.json();
    return result;
  } catch (error) {
    return error;
  }
};
