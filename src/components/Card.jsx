
const Card = ({number, isHidden, isMatch, index, showCard}) => {
  return (
    <button onClick={() => showCard(index, number)} className="card">
        {
            !isHidden &&
            <h2>{number}</h2>
        }
    </button>
  )
}

export default Card