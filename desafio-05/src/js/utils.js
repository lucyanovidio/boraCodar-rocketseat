export function isAnOperator(element) {
  return (
    element === "+" ||
    element === "-" ||
    element === "*" ||
    element === "/" ||
    element === "%"
  );
}