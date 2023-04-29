import { InputProps } from "../../types";

export default function Input(props: InputProps) {
  return (
    <input
      onChange={props.onChange}
      type={props.type}
      placeholder={props.placeholder}
    />
  );
}
