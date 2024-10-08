import React from "react";
import { ProvinceBtn } from "./index";
import { location } from "../ultils/constant";
const Province = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 py-5 shadow-mdz">
      {location.map((item) => {
        return (
          <ProvinceBtn
            key={item.id}
            image={item.image}
            name={item.name}
            provinceCode={item.provinceCode}
          />
        );
      })}
    </div>
  );
};

export default Province;
