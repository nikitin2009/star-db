import React, { Component } from "react";

import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";
import SwapiService from "../../services/swapi-service";

import "./random-planet.css";

class RandomPlanet extends Component {
  static defaultProps = {
    updateInterval: 10000
  };

  swapiService = new SwapiService();

  state = {
    loading: true,
    planet: {},
    error: false
  };

  componentDidMount() {
    const { updateInterval } = this.props;
    this.updatePlanet();
    this.interval = setInterval(this.updatePlanet, updateInterval);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onPlanetLoaded = planet => {
    this.setState({ loading: false, planet });
  };

  onError = err => {
    this.setState({
      loading: false,
      error: true
    });
  };

  updatePlanet = () => {
    const id = Math.floor(Math.random() * 25) + 3;
    this.swapiService
      .getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch(this.onError);
  };

  render() {
    const { loading, planet, error } = this.state;

    return (
      <div className="random-planet jumbotron rounded">
        {loading ? (
          <Spinner />
        ) : error ? (
          <ErrorIndicator />
        ) : (
          <PlanetView planet={planet} />
        )}
      </div>
    );
  }
}

const PlanetView = ({ planet }) => {
  const { id, name, population, rotationPeriod, diameter } = planet;

  return (
    <>
      <img
        alt={name}
        className="planet-image"
        src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
      />
      <div>
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Population</span>
            <span>{population}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Rotation Period</span>
            <span>{rotationPeriod}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Diameter</span>
            <span>{diameter}</span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default RandomPlanet;
