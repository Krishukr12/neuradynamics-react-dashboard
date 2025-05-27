import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useAppSelector } from "../redux/hook";

export const Layout = () => {
  const count = useAppSelector((state) => state.favorites.items.length);
  return (
    <div>
      <Navbar favoritesCount={count} />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
