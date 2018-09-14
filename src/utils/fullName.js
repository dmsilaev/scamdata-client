export const fullName = ({first_name, last_name, middle_name}) => {
  const initial = [
    first_name[0].toUpperCase(),
    middle_name[0].toUpperCase(),
    ""
  ].join(".")

  return [last_name, initial].join(" ");
}
