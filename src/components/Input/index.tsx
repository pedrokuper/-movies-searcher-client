type InputProps = {
  type: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input(props: InputProps) {
  return <input onChange={props.onChange} type={props.type} />;
}
