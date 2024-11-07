const LabelValueComp = ({label, value} ) => {
    return (
      <div className="w-[100%] sm:w-[100%] md:w-[80%] lg:w-[80%] flex flex-col justify-center items-center mt-3 ml-auto mr-auto">
        <p className="font-bold text-2xl text-center">{label}</p>
        {Array.isArray(value) ? (
          <ul className="ml-auto mr-auto">
            {value.map((each) => {
              return <li key={each} className="text-center">{each}</li>;
            })}
          </ul>
        ) : (
          <p className="text-center">{value}</p>
        )}
      </div>
    );
  };

  export default LabelValueComp;