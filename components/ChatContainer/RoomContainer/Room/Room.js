import React from "react";

export default function Room({
  name,
  createdAt,
  isRoomSelected,
  onSelectRoomHandle,
}) {
  let activeRoomClasses = [
    "btn btn-neutral btn-active btn-lg btn-block rounded-none bg-neutral text-left",
  ];
  if (!isRoomSelected) activeRoomClasses = [""];
  return (
    <div
      className={`btn btn-lg btn-block rounded-none text-left ${activeRoomClasses.join(
        " "
      )}`}
      onClick={() => onSelectRoomHandle(name)}
    >
      <div className="">
        <div className="">
          <h6 className="mb-0">{name}</h6>
          <small className="">{createdAt}</small>
        </div>
      </div>
    </div>
  );
}
