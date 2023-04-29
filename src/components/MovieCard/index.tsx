import style from "./movieCard.module.scss";

type MovieCardProps = {
  image: string;
  title: string;
  year: string;
};

export default function MovieCard(props: MovieCardProps) {
  return (
    <article className={style.container}>
      <div className={style.header}>
        <h4>{props.title}</h4>
        <span>({props.year})</span>
      </div>
      <img src={props.image} alt={props.title} />
    </article>
  );
}
