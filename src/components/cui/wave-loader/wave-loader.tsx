import "./styles/style.css";

interface WaveLoaderProps {
    theme?: any;
    style?: any;
}

const WaveLoader:React.FC<WaveLoaderProps> = ({theme, style}) => {
    return (
        <div className="loader" style={{...style}}>
            <div className="wave" style={{background: theme ? theme : ""}}></div>
            <div className="wave" style={{background: theme ? theme : ""}}></div>
            <div className="wave" style={{background: theme ? theme : ""}}></div>
            <div className="wave" style={{background: theme ? theme : ""}}></div>
            <div className="wave" style={{background: theme ? theme : ""}}></div>
        </div>
    )
}

export default WaveLoader;