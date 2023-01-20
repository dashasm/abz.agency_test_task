const API_URL = "https://frontend-test-assignment-api.abz.agency/api/v1";

export async function getUsers(count: number) {
  return await fetch(`${API_URL}/users?page=1&count=${count}`)
    .then(async (res) => {
      return await res.json();
    })
    .catch(() => ({
      response: "False",
      error: "unexpected error",
    }));
}

export async function getToken() {
  return await fetch(`${API_URL}/token`)
    .then(async (res) => {
      return await res.json();
    })
    .catch(() => ({
      response: "False",
      error: "unexpected error",
    }));
}

export async function addUser(formData: FormData) {
  const token = await getToken().then((res) => res.token);
  return await fetch(`${API_URL}/users`, {
    method: "POST",
    body: formData,
    headers: {
      Token: token,
    },
  })
    .then(async (res) => {
      return await res.json();
    })
    .catch(() => ({
      response: "False",
      error: "unexpected error",
    }));
}

export async function getPositions() {
  return await fetch(`${API_URL}/positions`)
    .then(async (res) => {
      return await res.json();
    })
    .catch(() => ({
      response: "False",
      error: "unexpected error",
    }));
}
