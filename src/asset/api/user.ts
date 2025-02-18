interface User {
    name: string;
    email: string;
    password: string;
  }
  
  export const user: User[] = [
    { name: "Saksithon Matcharet", email: "admin@gmail.com", password: "1234" },
    { name: "John Doe", email: "john.doe@example.com", password: "password123" },
    { name: "Jane Smith", email: "jane.smith@example.com", password: "password456" },
  ];
  
  export function findUserByEmail(email: string): User | undefined {
    return user.find(user => user.email === email);
  }
  
  export function addUser(name: string, email: string, password: string): User {
    const newUser = { name, email, password };
    user.push(newUser);
    return newUser;
  }
  