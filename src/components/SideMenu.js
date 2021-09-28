import React, { useEffect, useState } from "react";

import MenuItem from "./MenuItem";
/**
 * @author
 * @function SideMenu
 **/

// added more menuItems for testing
export const menuItems = [
  {
    name: "Home",
    exact: true,
    to: "/",
    iconClassName: "home"
  },
  {
    name: "Orders",
    exact: true,
    to: `/orders`,
    iconClassName: "article"
  },
  {
    name: "Notification",
    to: `/notification`,
    iconClassName: "mail"
  },
  {
    name: "Help & Support",
    exact: true,
    to: `/help-&-support`,
    iconClassName: "help_outline"
  },
  {
    name: "Settings",

    to: `/settings`,
    iconClassName: "settings"
  }
];

const SideMenu = (props) => {
  const [inactive, setInactive] = useState(false);

  useEffect(() => {
    if (inactive) {
      removeActiveClassFromSubMenu();
    }

    props.onCollapse(inactive);
  }, [inactive, props]);

  //just an improvment and it is not recorded in video :(
  const removeActiveClassFromSubMenu = () => {
    document.querySelectorAll(".sub-menu").forEach((el) => {
      el.classList.remove("active");
    });
  };

  /*just a little improvement over click function of menuItem
    Now no need to use expand state variable in MenuItem component
  */
  useEffect(() => {
    let menuItems = document.querySelectorAll(".menu-item");
    menuItems.forEach((el) => {
      el.addEventListener("click", (e) => {
        const next = el.nextElementSibling;
        removeActiveClassFromSubMenu();
        menuItems.forEach((el) => el.classList.remove("active"));
        el.classList.toggle("active");

        if (next !== null) {
          next.classList.toggle("active");
        }
      });
    });
  }, []);

  return (
    <div className={`side-menu ${inactive ? "inactive" : ""}`}>
      <div className="top-section">
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="logo">
            <img
              src={"https://bst0h.csb.app/assets/images/logo.svg"}
              alt="logo"
            />
          </div>
          <div className="title">
            <h4>Promo & Co</h4>
          </div>
        </div>
        <div onClick={() => setInactive(!inactive)} className="toggle-menu-btn">
          {inactive ? (
            <span class="small material-icons">chevron_right</span>
          ) : (
            <i className="small material-icons">chevron_left</i>
          )}
        </div>
      </div>

      <div className="main-menu">
        <ul>
          {menuItems.map((menuItem, index) => (
            <MenuItem
              key={index}
              name={menuItem.name}
              exact={menuItem.exact}
              to={menuItem.to}
              subMenus={menuItem.subMenus || []}
              iconClassName={menuItem.iconClassName}
              onClick={(e) => {
                if (inactive) {
                  setInactive(false);
                }
              }}
            />
          ))}
        </ul>
      </div>
      <div className="cart">
        <div className="cart1">
          <div className="cart2"></div>
        </div>
      </div>
      <div className="side-menu-footer">
        <div className="user-info">
          <h5>Rizwan Khan</h5>
          <p>rizwankhan@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
