const LoadingScreen = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignContent: "center",
        alignItems: "center",
      }}>
      <div className='loader'>Loading...</div>
    </div>
  );
};

export default LoadingScreen;
