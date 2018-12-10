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
            "Hypertext Markup Language (HTML) is the standard markup language for creating web pages"
        },
        {
          name: "JAVASCRIPT",
          description:
            "Hypertext Markup Language (HTML) is the standard markup language for creating web pages"
        },
        {
          name: "REACT",
          description:
            "Hypertext Markup Language (HTML) is the standard markup language for creating web pages"
        },
        {
          name: "ANGULAR",
          description:
            "Hypertext Markup Language (HTML) is the standard markup language for creating web pages"
        },
        {
          name: "VUE",
          description:
            "Hypertext Markup Language (HTML) is the standard markup language for creating web pages"
        },
        {
          name: "NODEJS",
          description:
            "Hypertext Markup Language (HTML) is the standard markup language for creating web pages"
        }
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
      pathname: `/event/${item.name}`,
      state: item
    });
  }
  render() {
    console.log("HOMEPAGE PROPS", this.props);
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
                      <p>{item.description}</p>
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
