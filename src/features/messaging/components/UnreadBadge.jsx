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
        px-1
        rounded-full
        bg-red-500
        text-white
        text-xs
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