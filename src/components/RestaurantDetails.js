import React, { useEffect, useState, useMemo } from "react";
import Menu from "./Menus";
import "./RestaurantDetails.css";
const RestaurantDetails = (props) => {
  const [restaurantDetails, setRestaurantDetails] = useState([]);
  const [menu, setMenu] = useState([]);
  const [items, setItems] = useState([]);

  const computeItems = useMemo(() => {
    const counts = {};
    menu
      .map((menu) => {
        return JSON.parse(menu.itemCategory);
      })
      .flat()
      .forEach((x) => (counts[x] = (counts[x] || 0) + 1));

    return counts;
  }, [menu]);

  useEffect(() => {
    let mounted = true;
    fetch(
      "https://api.sheety.co/bdcbafbc1f4197dda178b9e69f6ccee9/techAlchemyWebTest1/restaurantDetails"
    )
      .then((data) => data.json())
      .then((items) => {
        if (mounted) {
          setRestaurantDetails(
            items.restaurantDetails.filter(
              (restaurant) =>
                restaurant.id === parseInt(props.match.params.id, 10)
            )[0]
          );
        }
      });

    fetch(
      "https://api.sheety.co/bdcbafbc1f4197dda178b9e69f6ccee9/techAlchemyWebTest1/menu"
    )
      .then((data) => data.json())
      .then((items) => {
        if (mounted) {
          const filteredItems = items.menu.filter((m) =>
            JSON.parse(m.restaurantName).includes(
              restaurantDetails.restaurantName
            )
          );

          setMenu(filteredItems);
          setItems(computeItems);
        }
      });
    return () => (mounted = false);
  }, [props.match.params.id, computeItems, restaurantDetails.restaurantName]);

  return (
    <>
      <div style={{ display: "flex" }}>
        <div className="restaurantDetails">
          <h1> {restaurantDetails.restaurantName}</h1>
          <p style={{ lineHeight: "24px", color: "#626264" }}>
            {restaurantDetails.restaurantDescription}
          </p>

          <p>
            <i className="material-icons-outlined">schedule</i>
            {restaurantDetails.openingHours}
          </p>
          <p>
            <i className="material-icons">call</i>
            {restaurantDetails.contactNumber}
          </p>
          <p>
            <i className="material-icons">language</i>
            {restaurantDetails.websiteUrl}
          </p>
        </div>
        <div style={{ minWidth: "55%", textAlign: "center" }}>
          <img
            style={{ maxHeight: "21em", borderRadius: "16px" }}
            src={restaurantDetails.restaurantImage}
            alt={restaurantDetails.restaurantName}
          />
        </div>
      </div>
      <Menu menu={menu} items={items} />
    </>
  );
};

export default RestaurantDetails;
