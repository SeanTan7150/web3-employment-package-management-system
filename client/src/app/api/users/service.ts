export interface User {
  id: string;
  auth: string;
  email: string;
  first_name: string;
  last_name: string;
  registered: Date;
}

// Create user
export const createUser = async (
  auth: string,
  email: string,
  first_name: string,
  last_name: string
): Promise<void> => {
  try {
    const response = await fetch("/api/users/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        auth,
        email,
        first_name,
        last_name,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }
    console.log("User created successfully");
  } catch (error) {
    console.error("Failed to create user: ", error);
  }
};

// Read user
export const readUser = async (auth?: string) => {
  try {
    const url = auth
      ? `/api/users/read?auth=${encodeURIComponent(auth)}`
      : `/api/users/read`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    const data = await response.json();
    console.log("User fetched successfully");
    return auth ? { user: data.user } : { users: data.users };
  } catch (error) {
    console.error("Failed to fetch user: ", error);
    return [];
  }
};
