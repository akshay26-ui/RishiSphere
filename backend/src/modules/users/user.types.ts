export interface RegisterUserInput {
  enrollmentNumber: string;

  name: string;

  email: string;

  password: string;
}

export interface LoginUserInput {
  email: string;

  password: string;
}
