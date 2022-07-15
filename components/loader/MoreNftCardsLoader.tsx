import MoreCardLoader from "./MoreCardLoader";

const MoreNftCardsLoader = ({ count }) => {
  return (
    <div className="nft-items-grid-container">
      {Array(count)
        .fill(null)
        .map((c, idx) => (
          <MoreCardLoader key={idx} />
        ))}
    </div>
  );
};

export default MoreNftCardsLoader;
