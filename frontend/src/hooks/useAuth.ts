import { useMutation } from "@apollo/client";
import { useState } from "react";
import { REFRESH_TOKEN, VALIDATE_TOKEN } from "../graphql/mutations/userMutaions";

export const useAuth = () => {
  const [error, setError] = useState<string | null>(null);

  const [refreshTokenMutation, { loading: refreshLoading }] = useMutation(REFRESH_TOKEN);
  const [validateTokenMutation, { loading: validateLoading }] = useMutation(VALIDATE_TOKEN);

  // 엑세스 토큰 유효성 검사
  const validateAccessToken = async (accessToken: string) => {
    try {
      const response = await validateTokenMutation({
        variables: { accessToken: accessToken },
      });
      console.log(response)
      return response?.data?.validateToken ? true : false;
    } catch (err: any) {
      if (err.message === "TokenExpiredError") {
        console.log("Access token has expired");
        return false;
      }
      setError("Access token validation failed");
      return false;
    }
  };

  // 리프레시 토큰으로 엑세스 토큰 갱신
  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      setError("No refresh token found");
      return null;
    }

    try {
      const response = await refreshTokenMutation({
        variables: { refreshToken },
      });
      const { accessToken } = response?.data?.refreshToken;
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        return accessToken;
      } else {
        setError("Failed to refresh access token");
        return null;
      }
    } catch (err) {
      setError("Failed to refresh token");
      return null;
    }
  };

  // 인증 로직 (엑세스 토큰 -> 유효성 검사 -> 리프레시)
  const authenticate = async () => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      const isValid = await validateAccessToken(accessToken);
      if (isValid) {
        return accessToken; // 유효한 토큰이면 그대로 사용
      } else {
        return await refreshAccessToken(); // 유효하지 않으면 리프레시
      }
    } else {
      setError("No access token found");
      return null;
    }
  };

  const loading = refreshLoading || validateLoading;

  return {
    authenticate,
    loading,
    error,
  };
};
