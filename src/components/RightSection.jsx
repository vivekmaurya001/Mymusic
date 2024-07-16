import React from "react";
import Homepage from "./Homepage";
import { Outlet } from "react-router-dom";

const RightSection = () => {
  return (
    <div class="right_content">
      <nav>
        <div class="nxt">
          <div class="lft">
            <button>
              <img height="17px" src="barsvg/lft.svg" alt="photo" />
            </button>
          </div>
          <div class="rgt">
            <button>
              <img height="17px" src="barsvg/rgt.svg" alt="photo" />
            </button>
          </div>
        </div>
        <div class="profile">
          <button>
            <img height="17px" src="barsvg/notification.svg" alt="photo" />
          </button>
          <button>
            <img height="17px" src="barsvg/account.svg" alt="photo" />
          </button>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default RightSection;
