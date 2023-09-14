export default function SvgIcon({ width, height, viewBox, pathData, isDarkMode , ...props }) {
  // This is reusable SVG component 
  return (
    <div
    className={`Rectangle18 bg-bkg ${isDarkMode ? 'dark' : 'light'}`}
    style={{
      width: "40px",
      height: "40px",
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
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
       {Array.isArray(pathData) ? (
        // for svg path that's an array
          pathData.map((path, index) => <path key={index} d={path} />)
        ) : (
          // for svg path that's not an array 
          <path d={pathData} />
        )}
      </svg>
    </div>
  );
}
