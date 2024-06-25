import Link from "next/link";
import "./styles/style.css";
import React from "react";

interface LoadingFailedProps {
    Icon: React.ComponentType;  
    title: string;
    description?: string;
    redirect?: string;
    redirectTitle?: string;
}

const LoadingFailed: React.FC<LoadingFailedProps> = ({ Icon, title, description, redirect, redirectTitle }) => {
  return (
    <div className="container error-container">
        <div className="center-icon-design">
            <Icon />
        </div>
        <h2 className="mb-2">{title}</h2>
        <p className="mb-2">{description}</p>
        <div className="readirect-button">
            {redirect && redirectTitle && <Link href={redirect}>{redirectTitle}</Link>}
        </div>
    </div>
  );
}

export default LoadingFailed;