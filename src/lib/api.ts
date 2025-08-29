// src/lib/api.ts

export type User = {
  id?: number;
  name: string;
  email: string;
  password: string; // NOTE: Storing password as plain text is only for demo purpose.
  avatar?: string;
};

const BASE_URL = "http://localhost:5000"; // Adjust to your API base URL

export async function signup(user: User): Promise<{ success: boolean; user?: User; error?: string }> {
  try {
    // Check if user exists
    const existing = await fetch(`${BASE_URL}/users?email=${user.email}`).then((res) => res.json());
    if (existing.length > 0) {
      return { success: false, error: "User already exists" };
    }
    // Create user
    const res = await fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const createdUser = await res.json();
    return { success: true, user: createdUser };
  } catch (error) {
    return { success: false, error: "Failed to signup" };
  }
}

export async function login(email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
  try {
    // Query user by email and password
    const users = await fetch(`${BASE_URL}/users?email=${email}&password=${password}`).then((res) => res.json());
    if (users.length === 1) {
      return { success: true, user: users[0] };
    } else {
      return { success: false, error: "Invalid credentials" };
    }
  } catch (error) {
    return { success: false, error: "Failed to login" };
  }
}
