// hooks/useSignup.ts
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../../graphql/mutations/authMutaions";

export const useSignup = (options: {
  onCompleted: () => void;
  onError: (err: Error) => void;
}) => {
  const [createUser, { loading, error }] = useMutation(CREATE_USER, {
    onCompleted: options.onCompleted,
    onError: options.onError,
  });

  const signup = async (userData: any) => {
    try {
      const response = await createUser({ variables: { user: userData } });
      return response;
    } catch (err: Error | any) {
      console.log(err.message)
      throw new Error(`Signup failed: ${err.message}`);
    }
  };

  return {
    signup,
    loading,
    error,
  };
};
