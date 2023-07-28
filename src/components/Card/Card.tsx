import cardCss from './Card.style';

const Card = ({ items }) => {
  return (
    <>
      {items &&
        items.length > 0 &&
        items.map((cardItem) => {
          return (
            <>
              <div css={cardCss.self}>
                <img src={cardItem.bannerImage} />
                <p>{cardItem.title.english}</p>
              </div>
            </>
          );
        })}
    </>
  );
};

export default Card;
