/**
 * Button Props
 */
interface ButtonPropsI {
  title: string; // 标题
  type: "primary" | "default"; // 类型
}

/**
 * Button component
 * @param props 入参
 * @return test
 */
interface Button {
  (props: ButtonPropsI): ReactNode;
}

const Button: Button = (props) => {
  let [count, setCount] = useState(0);

  return <div onClick={setCount((count += 1))}>button {count}</div>;
};
