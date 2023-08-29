export default function SvgIcon({ width, height, viewBox, pathData, ...props }) {
  return (
    <div
    className="Rectangle18"
    style={{
      width: "40px",
      height: "40px",
      background: "white",
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.16)",
      borderRadius: 12,
      display: "flex",
      justifyContent: "center",
      alignItems: "center", 
    }}
  >
    <svg
      width={width}
      height={height}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {pathData.map((path, index) => (
        <path key={index} d={path} />
      ))}
    </svg>
    </div>
  );
}
