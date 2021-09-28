import React, { useState, useEffect } from "react";
import "./Home.css";
import { useHistory } from "react-router-dom";

const Home = (props) => {
  const history = useHistory();
  const category = props.category;
  const restaurants = props.restaurants;

  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);

  const openRestaurantDetails = (id) => {
    history.push("/restaurantdetails/" + id);
  };

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      setFilteredRestaurants(restaurants);
    }

    return () => (mounted = false);
  }, [restaurants.length]);

  const filterCategories = (category) => {
    setFilteredRestaurants(
      restaurants.filter((restaurant) => {
        return JSON.parse(restaurant.restaurantCategory).includes(category);
      })
    );
  };

  return (
    <>
      <h2>Category</h2>
      <div style={{ display: "flex", margin: "32px 0" }}>
        {category &&
          category.map((category, index) => {
            return (
              <span
                key={index}
                style={{ display: "inline-flex", alignItems: "center" }}
              >
                <img
                  onClick={() => filterCategories(category)}
                  style={{
                    maxWidth: "30px",
                    maxHeight: "30px",
                    marginRight: "20px"
                  }}
                  src={
                    parseInt(index + 1, 10) < 5
                      ? "./assets/images/category" +
                        parseInt(index + 1, 10) +
                        ".png"
                      : "./assets/images/category" + 4 + ".png"
                  }
                  alt={
                    parseInt(index + 1, 10) < 5
                      ? "category" + parseInt(index + 1, 10)
                      : "category" + 4
                  }
                />
                <span
                  onClick={() => filterCategories(category)}
                  className="category"
                >
                  {category}
                </span>
              </span>
            );
          })}
      </div>
      {filteredRestaurants && (
        <h2 style={{ marginBottom: "1em" }}>Restaurants</h2>
      )}
      <div className="allRestaurants">
        {filteredRestaurants &&
          filteredRestaurants.map((restaurant) => {
            return (
              <div
                onClick={() => openRestaurantDetails(restaurant.id)}
                className="restaurantCard"
              >
                <div className="restaurantImage">
                  <img
                    src={restaurant.restaurantImage}
                    alt={restaurant.restaurantName}
                  />
                </div>
                <div className="cardHeader">
                  <h4 style={{ color: "#182135" }} key={restaurant.id}>
                    {restaurant.restaurantName}
                  </h4>
                  {restaurant.isOpen ? (
                    <span className="flag openNow">Open Now</span>
                  ) : (
                    <span className="flag closed">Closed</span>
                  )}
                </div>
                <p className="description">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Curabitur ultricies quis lorem non mollis. Fusce nec est at
                  sem interdum congue. Aliquam venenatis turpis ac ...{" "}
                </p>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Home;
