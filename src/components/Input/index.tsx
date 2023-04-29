type InputProps = {
  type: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
};

export default function Input(props: InputProps) {
  return (
    <input
      onChange={props.onChange}
      type={props.type}
      placeholder={props.placeholder}
    />
  );
}
