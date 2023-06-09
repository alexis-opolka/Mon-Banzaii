
export function CreateCompatibleOutputReactNode(content: any) {
  console.log("(Client)[Components | Users:CreateCompatibleOutputReactNode]: LOG -", content);

  return(
  <span> {content?.message} </span>
  );
}
