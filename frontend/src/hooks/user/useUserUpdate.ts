import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../graphql/mutations/userMutations";

export const useUserUpdate = (options: {
  onCompleted: () => void;
  onError: (err: Error) => void;
}) => {
  const [update, { loading, error }] = useMutation(UPDATE_USER, {
    onCompleted: options.onCompleted,
    onError: options.onError,
  });

  const updateUser = async (userData: any) => {
    try {
        console.log(userData)
      const response = await update({
        variables: {
            user: userData
        }
      })
      return response;
    } catch (err) {
      throw new Error("Failed to update user");
    }
  };

  return {
    updateUser,
    loading,
    error,
  };
};
