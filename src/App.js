import "./App.css";
import SideMenu, { menuItems } from "./components/SideMenu";
import Home from "./components/Home";
import RestaurantDetails from "./components/RestaurantDetails";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import React, { useEffect, useState, useMemo } from "react";
import RightSideBar from "./components/RightSideBar";

function App() {
  const [inactive, setInactive] = useState(false);

  const [restaurants, setRestaurants] = useState([]);

  const [category, setCategory] = useState([]);

  const [inactiveRightSideBar, setInactiveRightSideBar] = useState(false);
  const computeCategories = useMemo(
    () => [
      ...new Set(
        restaurants
          .map((restaurant) => {
            return JSON.parse(restaurant.restaurantCategory);
          })
          .flat()
      )
    ],
    [restaurants]
  );

  useEffect(() => {
    let mounted = true;
    fetch(
      "https://api.sheety.co/bdcbafbc1f4197dda178b9e69f6ccee9/techAlchemyWebTest1/allRestaurants"
    )
      .then((data) => data.json())
      .then((items) => {
        if (mounted) {
          setRestaurants(items.allRestaurants);
          setCategory(computeCategories);
        }
      });
    return () => (mounted = false);
  }, [computeCategories]);

  return (
    <>
      <div className={"App " + (inactiveRightSideBar ? "backdrop" : "")}>
        <Router>
          <SideMenu
            onCollapse={(inactive) => {
              setInactive(inactive);
            }}
          />
          <div onClick={() => setInactiveRightSideBar(true)} className="header">
            <div className="toggle-menu-btn">
              <span className="material-icons-outlined">filter_list</span>
            </div>
          </div>
          <div className={`container ${inactive ? "inactive" : ""}`}>
            {/* improvememt, not recorded in video, its just looping through menuItems
          instead of hard coding all the routes */}
            {menuItems.map((menu, index) => (
              <>
                <Route
                  key={menu.name}
                  exact={menu.exact}
                  path={menu.to}
                ></Route>
              </>
            ))}

            {
              <Switch>
                <Route exact path={"/"}>
                  <Home restaurants={restaurants} category={category} />
                </Route>
                <Route
                  exact
                  path={"/restaurantdetails/:id"}
                  component={RestaurantDetails}
                />
              </Switch>
            }
          </div>
        </Router>
      </div>
      <RightSideBar
        onCollapse={(inactive) => {
          setInactiveRightSideBar(inactive);
        }}
        inactive={inactiveRightSideBar}
      />
    </>
  );
}

export default App;
