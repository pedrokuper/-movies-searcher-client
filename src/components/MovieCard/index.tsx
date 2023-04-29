import style from "./movieCard.module.scss";
import { MovieCardProps } from "../../types";

export default function MovieCard(props: MovieCardProps) {
  return (
    <article className={style.container}>
      <div className={style.header}>
        <h4>{props.title}</h4>
        <span>({new Date(props.year).getFullYear().toString()})</span>
      </div>
      <img loading="lazy" src={props.image} alt={props.title} />
    </article>
  );
}
