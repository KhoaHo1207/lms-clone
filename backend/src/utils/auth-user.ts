type AuthUserSource = {
  _id: { toString(): string };
  name: string;
  email: string;
  role: string;
  isEmailVerified: boolean;
};

export const toAuthUser = (user: AuthUserSource) => ({
  id: user._id.toString(),
  name: user.name,
  email: user.email,
  role: user.role,
  isEmailVerified: user.isEmailVerified,
});
