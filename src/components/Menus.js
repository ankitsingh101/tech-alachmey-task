import React, { useEffect, useState, useMemo } from "react";
import "./Menu.css";
const Menu = (props) => {
  const menu = props.menu;
  const items = props.items;

  const [filteredMenu, setFilteredMenu] = useState([]);

  const [selectedItem, setselectedItem] = useState("All");

  const handleSelectedItem = (itemName) => {
    setselectedItem(itemName);
    if (itemName === "All") {
      setFilteredMenu(menu);
    } else {
      setFilteredMenu(
        menu.filter((menu) => {
          return JSON.parse(menu.itemCategory).includes(itemName);
        })
      );
    }
  };

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      setFilteredMenu(menu);
    }

    return () => (mounted = false);
  }, [menu.length]);

  return (
    <>
      <div className="menuItemWrapper">
        <span
          onClick={() => handleSelectedItem("All")}
          className={
            "menuItem" + (selectedItem === "All" ? " active" : " inactive")
          }
        >
          All
        </span>
        {items &&
          Object.keys(items).map((name) => {
            return (
              <span
                onClick={() => handleSelectedItem(name)}
                className={
                  "menuItem" + (selectedItem === name ? " active" : " inactive")
                }
              >
                {name}&nbsp;<span>({items[name]})</span>
              </span>
            );
          })}
      </div>
      <h2 style={{ margin: "0 0 1.2em 0" }}>Menu</h2>
      <div className="menuwrapper">
        {filteredMenu &&
          filteredMenu.map((menu) => (
            <div className="restaurantCard menuCard">
              <div className="restaurantImage">
                <img src={menu.itemPhoto} alt={menu.itemName} />
              </div>
              <div className="cardHeader">
                <h4 style={{ color: "#182135" }} key={menu.id}>
                  {menu.itemName}
                </h4>
                <span style={{ color: "#503E9D" }}>£{menu.itemCost}</span>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Menu;
