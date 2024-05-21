import './style.scss'
type Props = {
  product: Product
}

export const NoBackgroundCard = (props: Props) => {
  const { product } = props;
  return (
    <div className="oneColumnCard">
      <div>
        <img src={product.image} className="imageOneColumnCard"/>
      </div>
      <p className="nameOneColumnCard">{product.name}</p>
      <button className="lightBtn btn oneColumnBtn ">{product.price} ₽</button>
    </div>
  )
}
