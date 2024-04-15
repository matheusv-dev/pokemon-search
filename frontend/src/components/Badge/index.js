export default function Badge({ type }) {
  return (
    <div className={`background-color-${type} p-2 rounded-lg w-fit`}>
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </div>
  )
}