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

// Read all users
export const readUsers = async () => {
  try {
    const url = "/api/users/read";
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
    return { users: data.users };
  } catch (error) {
    console.error("Failed to fetch user: ", error);
    return { users: [] };
  }
};

// Read user by address
export const readUserByAddress = async (auth: string) => {
  try {
    const url = `/api/users/read/${encodeURIComponent(auth)}`;
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
    return { fetched: true, user: data.user };
  } catch (error) {
    console.error("Failed to fetch user: ", error);
    return { fetched: false, user: {} };
  }
};

// Update user activate
export const activateUser = async (auth: string): Promise<void> => {
  try {
    const response = await fetch("/api/users/activate", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        auth,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to activate user");
    }
    console.log("User activated successfully");
  } catch (error) {
    console.error("Failed to activate user: ", error);
  }
};

// Update user deactivate
export const deactivateUser = async (auth: string): Promise<void> => {
  try {
    const response = await fetch("/api/users/deactivate", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        auth,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to deactivate user");
    }
    console.log("User deactivated successfully");
  } catch (error) {
    console.error("Failed to deactivate user: ", error);
  }
};

// Update user profile image
export const updateUserProfileImage = async (
  auth: string,
  profile_image: string
): Promise<void> => {
  try {
    const response = await fetch("/api/users/updateProfileImage", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        auth,
        profile_image,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update profile image");
    }
    console.log("Profile image updated successfully");
  } catch (error) {
    console.error("Failed to update profile image: ", error);
  }
};

export const uploadImageToServer = async (
  base64Image: string
): Promise<string> => {
  const filename = `${Date.now()}.png`;

  const response = await fetch("/api/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image: base64Image, filename }),
  });

  if (response.ok) {
    const data = await response.json();
    return data.filename;
  } else {
    throw new Error("Failed to upload image");
  }
};
