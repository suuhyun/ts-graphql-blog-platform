import { useMutation } from "@apollo/client";
import { LOGIN } from "../../graphql/mutations/authMutaions";

export const useLogin = (options: {
  onCompleted: (user: any) => void;
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
      return response?.data?.login;
    } catch (err: any) {
      throw new Error(`Login failed: ${err.message}`);
    }
  };

  return {
    loginUser,
    loading,
    error,
  };
};
