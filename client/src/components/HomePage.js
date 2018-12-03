import React, { Component } from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import styles from "../styles/css/HomePage.module.css";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [
        "HTML",
        "CSS",
        "JAVASCRIPT",
        "REACT",
        "ANGULAR",
        "VUE",
        "NODEJS"
      ],
      name: "Tim"
    };
    this.categoryEvents = this.categoryEvents.bind(this);
  }
  categoryEvents(item) {
    console.log("TEST", item);
    item = item.toLowerCase();
    this.props.history.push({
      pathname: `/event/${item}`,
      state: item
    });
  }
  render() {
    console.log("HOMEPAGE PROPS", this.props);
    return (
      <div className={styles.main}>
        <div className={styles.titleSection}>
          <div className={styles.titleSectionLeft}>
            <h1 className={styles.titleLeft}>
              Find Study Groups {this.state.name}
            </h1>
          </div>
          <div className={styles.titleSectionRight}>
            {/* <h1>Home Page Right</h1> */}
          </div>
        </div>
        <div className={styles.categories}>
          {this.state.categories.map((item, index) => {
            return (
              <button
                onClick={() => this.categoryEvents(item)}
                key={index}
                className={styles.category}
              >
                <h1>{item}</h1>
              </button>
            );
          })}
        </div>
      </div>
    );
  }
}

export default HomePage;
