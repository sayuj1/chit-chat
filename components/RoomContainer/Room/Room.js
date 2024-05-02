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
    <>
      <div
        className={`btn btn-lg btn-block rounded-none text-left ${activeRoomClasses.join(
          " "
        )}`}
        onClick={() => onSelectRoomHandle(name)}
      >
        <div className="flex w-[100%] justify-between">
          <span className="capitalize">{name}</span>
          <small>
            {new Date(createdAt)
              .toISOString()
              .substring(0, 10)
              .split("-")
              .reverse()
              .join("-")}
          </small>
        </div>
      </div>
      <hr />
    </>
  );
}
