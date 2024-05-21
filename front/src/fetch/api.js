// fonction asyn pour connexion, et récupération token
export async function logInUser(email, password) {
  const response = await fetch("http://localhost:3001/api/v1/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
}

// fonction de récupération du profil de l'utilisateur connecté
export async function getUserProfile(token) {
  const response = await fetch("http://localhost:3001/api/v1/user/profile", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}
