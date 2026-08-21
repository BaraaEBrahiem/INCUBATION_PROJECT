const UnreadBadge = ({
  count = 0,
}) => {

    console.log(
    "BADGE RENDER",
    count,
    typeof count,
  );
  
  if (!count) {
    return null;
  }

  return (
    <span
      className="
        min-w-5
        h-5
        px-2
        rounded-full
        bg-second-color
        text-white
        text-sm
        flex
        items-center
        justify-center
      "
    >
      {count}
    </span>
  );
};

export default UnreadBadge;