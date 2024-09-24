import { useMutation } from "@apollo/client";
import { LOGIN } from "../../graphql/mutations/authMutaions";

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
      console.log("useLogin userData", userData);
      const response = await login({
        variables: {
          email: userData.email,
          password: userData.password,
        },
      });
      console.log("useLogin response", response);
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
