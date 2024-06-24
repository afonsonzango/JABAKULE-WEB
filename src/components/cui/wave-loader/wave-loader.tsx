import "./styles/style.css";

interface WaveLoaderProps {
    theme?: any;
}

const WaveLoader:React.FC<WaveLoaderProps> = ({theme}) => {
    return (
        <div className="loader">
            <div className="wave" style={{background: theme ? theme : ""}}></div>
            <div className="wave" style={{background: theme ? theme : ""}}></div>
            <div className="wave" style={{background: theme ? theme : ""}}></div>
            <div className="wave" style={{background: theme ? theme : ""}}></div>
            <div className="wave" style={{background: theme ? theme : ""}}></div>
        </div>
    )
}

export default WaveLoader;