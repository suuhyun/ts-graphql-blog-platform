export const handleAuthError = (error: any) => {
    if (error.name === 'JsonWebTokenError') {
      return new Error('Invalid token, authentication failed');
    }
  
    if (error.name === 'TokenExpiredError') {
      return new Error('Token has expired, please login again');
    }
  
    if (error.message === 'User not found' || error.message === 'Invalid credentials') {
      return new Error(error.message); // 로그인 관련 에러 메시지 전달
    }
  
    if (error.name === 'UnauthorizedError') {
      return new Error('Unauthorized access');
    }
  
    return new Error('Authentication error');
  };
  