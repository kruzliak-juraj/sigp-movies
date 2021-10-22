import { useEffect } from "react";

const PageNotFound = (props) => {
  useEffect(()=> {
    props.setPageTitle("404")
  },[])
  return <p>BOOP, something went wrong!</p>;
};

export default PageNotFound;
