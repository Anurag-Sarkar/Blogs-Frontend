import Center, { type AppDispatch } from "./Center";
// import LeftFilter from "./LeftFilter";
// import { fetchAllCategories } from "../../store/actions/categoryAction";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../Types/types";
import { useEffect } from "react";
import { fetchAllCategories } from "../../store/actions/categoryAction";

const MainLayout = () => {
  // For fetching categories

  // const [loading, setLoading] = useState(true);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const fetch = async () => {
      // setLoading(true);
      await dispatch(fetchAllCategories());
      // setLoading(false);
    };
    fetch();
  }, [dispatch]);



  const categories = useSelector(
    (state: RootState) => state.categoryReducer.allCategories
  );
  return (
    <div className="w-full min-h-[83vh] max-h-[83vh] flex gap-3 mt-3 ">
      {/* <LeftFilter categories={categories} loading={loading} /> */}

      {/* <div className=" rounded-xl  w-1/2 bg-white flex-1 overflow-y-auto "> */}
      <Center categories={categories.map((c) => c.name)} />
      {/* </div> */}
      {/* Placeholder for right sidebar or additional content */}
      {/* Uncomment if you want to add a right sidebar in the future */}
      {/* <div className=" rounded-xl p-4 shrink-0 bg-white w-1/4 "></div> */}
    </div>
  );
};

export default MainLayout;
