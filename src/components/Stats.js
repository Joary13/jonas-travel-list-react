export default function Stats({ items }) {
  if (!items.length)
    return (
      <p className='stats'>
        <em>Start adding some items to your packing list 🚀</em>
      </p>
    );

  const nbItems = items.length;
  const nbItemsPacked = items.filter((item) => item.packed).length;
  let stat = nbItems > 0 ? Math.round((nbItemsPacked * 100) / nbItems) : 0;
  console.log(stat);
  return (
    <footer className='stats'>
      <em>
        {stat === 100
          ? 'You got everything! Ready to go ✈️!'
          : `You have ${nbItems} items on your list, and you already packed ${nbItemsPacked} (${stat}%)`}
      </em>
    </footer>
  );
}
