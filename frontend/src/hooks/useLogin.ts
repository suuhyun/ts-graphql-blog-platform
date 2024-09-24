import { useMutation } from "@apollo/client";
import { LOGIN } from "../graphql/mutations/userMutaions";

export const useLogin = (options: {
  onCompleted: () => void;
  onError: (err: Error) => void;
}) => {
  const [login, { loading, error }] = useMutation(LOGIN, {
    onCompleted: options.onCompleted,
    onError: options.onError,
  });

  const loginUser = async (userData: any) => {
    try {
      const response = await login({
        variables: {
          email: userData.email,
          password: userData.password,
        },
      });
      localStorage.setItem("accessToken", response.data.login.accessToken);
      localStorage.setItem("refreshToken", response.data.login.refreshToken);
      return response;
    } catch (err) {
      throw new Error("Login failed");
    }
  };

  return {
    loginUser,
    loading,
    error,
  };
};
