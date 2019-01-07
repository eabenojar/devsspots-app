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
        {
          name: "HTML",
          description:
            "Hypertext Markup Language (HTML) is the standard markup language for creating web pages"
        },
        {
          name: "CSS",
          description:
            "CSS is a language that describes the style of an HTML document"
        },
        {
          name: "JAVASCRIPT",
          description:
            "JavaScript often abbreviated as JS, is a high-level, interpreted programming language"
        },
        {
          name: "REACT",
          description:
            "React is a JavaScript library for building user interfaces"
        },
        {
          name: "ANGULAR",
          description:
            "Angular is a TypeScript-based open-source front-end web application framework"
        },
        {
          name: "VUE",
          description:
            "Vue.js is an open-source JavaScript framework for building user interfaces and single-page applications"
        },
        {
          name: "NODEJS",
          description:
            "Node.js is an open-source, cross-platform JavaScript run-time environment that executes JavaScript code outside of a browser"
        }
      ],
      key: ""
    };
    this.categoryEvents = this.categoryEvents.bind(this);
  }
  componentDidMount() {
    this.props.fetchUser();
    console.log("MOUNT HOME PAGE", this.props);
    if (this.props.location.state !== undefined) {
      console.log("DID IT WORKED");
      this.setState({
        key: this.props.location.state.key
      });
    }
  }
  categoryEvents(item) {
    console.log("TEST", item);
    item = item.name.toLowerCase();
    this.props.history.push({
      pathname: `/event/${item}`,
      state: item
    });
  }
  render() {
    console.log("HOMEPAGE PROPS", this.props, this.state);
    return (
      <div className={styles.main}>
        <div className={styles.titleSection}>
          {/* <div classs={styles.layer}> */}
          <div className={styles.titleSectionLeft}>
            <h1 className={styles.titleLeft}>Find Study Groups</h1>
          </div>
          <div className={styles.titleSectionRight} />
          {/* </div> */}
        </div>
        {/* <div className={styles.categories}> */}
        <Grid className={styles.grid}>
          <Row>
            {this.state.categories.map((item, index) => {
              return (
                <Col xs={12} sm={6} md={4} lg={4} key={index}>
                  <div className={styles.categoryBox}>
                    <div className={styles.categoryBoxTop}>
                      <h1 className={styles.categoryName}>{item.name}</h1>
                      <p className={styles.categoryDesc}>{item.description}</p>
                    </div>
                    <div className={styles.categoryBoxBottom}>
                      <button
                        onClick={() => this.categoryEvents(item)}
                        className={styles.categoryButton}
                      >
                        Explore
                      </button>
                    </div>
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
