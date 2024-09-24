import React from "react";
import { ClipLoader } from "react-spinners";

type Props = {
  isLoading?: boolean;
};

const Spinner = ({ isLoading = true }: Props) => {
  return (
    <>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2">
        <ClipLoader
          color="blue"
          loading={isLoading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loading-spinner"
        />
      </div>
    </>
  );
};

export default Spinner;
