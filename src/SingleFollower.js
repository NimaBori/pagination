const SingleFollower = ({ name, gitHubLink, img }) => {
  return (
    <div className="follower">
      <div className="follower__image">
        <img src={img} alt={name} />
      </div>
      <h5 className="follower__name">{name}</h5>
      <div className="follower__link">
        <a target="_blank" rel="noreferrer" href={gitHubLink}>
          view profile
        </a>
      </div>
    </div>
  );
};

export default SingleFollower;
