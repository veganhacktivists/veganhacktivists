const PatreonSupporters: React.FC<{ patrons: string[] }> = ({ patrons }) => {
  if (!patrons) return <></>;

  return (
    <ul className="flex flex-wrap mx-auto md:max-w-5xl justify-center">
      {patrons.map((name, i) => (
        <li className="text-2xl md:mx-12 mb-4 w-60 " key={i}>
          {name}
        </li>
      ))}
    </ul>
  );
};

export default PatreonSupporters;
