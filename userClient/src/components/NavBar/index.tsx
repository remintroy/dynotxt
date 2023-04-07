import "./style.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { Avatar, Badge, Button } from "@mui/material";
import { useState } from "react";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";

const NavBar = () => {
  const [isScrolled, setIsScorlled] = useState(false);
  const thisIsPc = useAppSelector((state) => state.config.thisIsPc);
  const user = useAppSelector((state) => state.user.data);
  const navigate = useNavigate();

  return (
    <>
      {thisIsPc && (
        <>
          <div className={`NavBar PC ${isScrolled ? "shadow" : ""} `}>
            <div className="left">
              <div className="logo">
                <Link to={"/"}>
                  <img src="/logo.png" alt="Logo" />
                </Link>
              </div>
              <div className="buttons">
                <Button variant="text" startIcon={<ShoppingBagIcon />} onClick={() => navigate("/shop")}>
                  Shop
                </Button>
              </div>
            </div>
            <div>search</div>
            {/* <SearchBar type={thisIsPc ? "pc" : "mb"} /> */}
            <div className="right">
              <Badge
                className="cart"
                onClick={() => {
                  navigate("/cart");
                }}
                badgeContent={2}
                color="primary"
              >
                <LocalGroceryStoreIcon />
              </Badge>
              {user && (
                <Avatar className="Avathar" onClick={() => navigate("/settings")} alt={user.email} src={user.photoURL} />
              )}
              {!user && (
                <Button   onClick={() => navigate("/signin")}>
                  Login
                </Button>
              )}
            </div>
          </div>
        </>
      )}

      <div className="content">
        <Outlet />
      </div>
    </>
  );
};

export default NavBar;
