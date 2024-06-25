import WaveLoader from "@/components/cui/wave-loader/wave-loader";

const Loading = () => {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "calc(100vh - 108px)" }}>
            <WaveLoader theme={"rgb(var(--dark),.6)"} />
        </div>
    );
}

export default Loading;