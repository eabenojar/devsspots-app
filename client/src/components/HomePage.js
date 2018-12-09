import React, { Component } from "react";
import styles from "../styles/css/HomePage.module.css";
import { connect } from "react-redux";
import { fetchUser } from "../actions/authAction";
import { Row, Grid, Col } from "react-bootstrap";
import { FaHtml5 } from "react-icons/fa";

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
      ]
    };
    this.categoryEvents = this.categoryEvents.bind(this);
  }
  componentDidMount() {
    this.props.fetchUser();
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
            <h1 className={styles.titleLeft}>Find Study Groups</h1>
          </div>
          <div className={styles.titleSectionRight}>
            {/* <h1>Home Page Right</h1> */}
          </div>
        </div>
        {/* <div className={styles.categories}> */}
        <Grid>
          <Row>
            {this.state.categories.map((item, index) => {
              return (
                <Col xs={12} sm={6} md={4} lg={4} key={index}>
                  <div className={styles.categoryBox}>
                    <button
                      onClick={() => this.categoryEvents(item)}
                      className={styles.categoryButton}
                    >
                      <h1>{item}</h1>
                    </button>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Grid>
        {/* </div> */}
      </div>
    );
  }
}

export default connect(
  null,
  { fetchUser }
)(HomePage);
