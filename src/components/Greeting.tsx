
type GreetingProps = {
  name: string;
};

export function Greeting({ name }: GreetingProps) {
  return (
    <h1 className="text-3xl font-bold font-headline">
      Hello, <span className="text-primary">{name}</span>! This is a component using a prop.
    </h1>
  );
}
