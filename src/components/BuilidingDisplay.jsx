function BuilidingDisplay({ building }) {
  const array = Array.from({ length: building.owned }, (v, i) => building.icon);
  return (
    <div className='flex  p-2'>
      {array.map((item) => {
        return <span>{item}</span>;
      })}
    </div>
  );
}

export default BuilidingDisplay;
