function ItemCard({ item }) {
    // console.log(item)
    return (
        <div >
            <h2 className="card__title">{item.name}</h2>
            <img className="card__list" src={item.link} alt={item.name} />
        </div>
    );

}

export default ItemCard;