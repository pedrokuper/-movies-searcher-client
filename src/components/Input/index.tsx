type InputProps = {
  value: string;
  type: string;
};

export function Input(props: InputProps) {
  return <input type={props.type} />;
}
