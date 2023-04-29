import { InputProps } from "../../types";
import style from "./input.module.scss";

export default function Input(props: InputProps) {
  return (
    <input
      className={style.input}
      onChange={props.onChange}
      type={props.type}
      placeholder={props.placeholder}
    />
  );
}
