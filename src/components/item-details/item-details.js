import React, { Component } from "react";
import Spinner from "../spinner";
import ErrorButton from "../error-button";

import "./item-details.css";

const Record = ({ item, field, label }) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}:</span>
      <span>{item[field]}</span>
    </li>
  );
};

class ItemDetails extends Component {
  state = {
    loading: false,
    item: null,
    image: null
  };

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.itemId !== this.props.itemId ||
      prevProps.getData !== this.props.getData ||
      prevProps.getImageUrl !== this.props.getImageUrl
    ) {
      this.updateItem();
    }
  }

  updateItem() {
    const { itemId, getData, getImageUrl } = this.props;
    if (!itemId) {
      return;
    }

    this.setState({
      loading: true
    });

    getData(itemId).then(item => {
      this.setState({
        item,
        loading: false,
        image: getImageUrl(itemId)
      });
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="item-details card">
          <Spinner />
        </div>
      );
    }

    const { item, image } = this.state;

    if (!item) {
      return <span>Select an item from the list</span>;
    }

    const { name } = item;

    return (
      <div className="item-details card">
        <img className="item-image" src={image} alt={name} />
        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush mb-3">
            {React.Children.map(this.props.children, child => {
              return React.cloneElement(child, { item });
            })}
          </ul>
          <ErrorButton />
        </div>
      </div>
    );
  }
}

export default ItemDetails;
export { Record };
