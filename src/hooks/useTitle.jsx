import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = `LocalChefBazaar | ${title}`;
  }, [title]);
};

export default useTitle;
