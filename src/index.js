import React from "react";
import ReactDOM from "react-dom";
import App from "../components/App";
import "../css/styles.css";

class Index extends React.Component {
    render() {
        return (
            <div className="App">
                <App />
            </div>
        );
    }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Index />, rootElement);
