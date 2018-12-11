import React from "react";

class App extends React.Component {
    state = {
        ciudad: "",
        name: "",
        lat: "",
        lon: "",
        temp: "",
        humidity: "",
        main: "",
        description: "",
        icon: ""
    };

    // Creamos los refs
    ciudadRef = React.createRef();

    // Función setear ciudad al state
    reciclar = () => {
        return this.setState({
            ciudad: this.ciudadRef.current.value
        });
    };

    // Renderizado del componente
    handleFetch = () => {
        const view = this.state.ciudad === "";
        return (
            <div>
                <select
                    ref={this.ciudadRef}
                    onChange={e => this.setState({ciudad: e.target.value})}
                >
                    <option value="" defaultValue>
                        Seleccione Ciudad
                    </option>
                    <option value="Alicante">Alicante</option>
                    <option value="Madrid">Madrid</option>
                    <option value="Barcelona">Barcelona</option>
                    <option value="Zaragoza">Zaragoza</option>
                    <option value="Sevilla">Sevilla</option>
                    <option value="Badajoz">Badajoz</option>
                    <option value="Valencia">Valencia</option>
                </select>

                {view ? null : (
                    <div>
                        <p>Ciudad: {this.state.name}</p>
                        <p>Latitud: {this.state.lat}</p>
                        <p>Longitud: {this.state.lon}</p>
                        <p>Temperatura: {this.state.temp} º</p>
                        <p>Humedad: {this.state.humidity} %</p>
                        <p>Descripción: {this.state.main}</p>
                        <img
                            className="icono"
                            src={`https://openweathermap.org/img/w/${
                                this.state.icon
                            }.png`}
                            alt="icon-weather"
                        />
                    </div>
                )}
            </div>
        );
    };

    // Llamada a la api cuando cambiamos el select
    componentDidUpdate = (prevProps, prevState) => {
        if (prevState.ciudad !== this.state.ciudad) {
            fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${
                    this.state.ciudad
                },es&appid=30b6c232999c31f00f775368a6775138&units=metric`
            )
                .then(response => response.json())
                .then(resp => {
                    console.log(resp);
                    this.setState({
                        name: resp.name,
                        lat: resp.coord.lat,
                        lon: resp.coord.lon,
                        temp: resp.main.temp,
                        humidity: resp.main.humidity,
                        main: resp.weather[0].main,
                        description: resp.weather[0].description,
                        icon: resp.weather[0].icon
                    });
                });
        }
    };
    render() {
        return this.handleFetch();
    }
}

export default App;
