import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { getPost, updatePost } from "../../redux/ducks/postReducer";
import Gallery from "../Gallery/Gallery";
import "./EditPost.css";

class EditPost extends Component {
  state = {
    title: this.props.selectedPost ? this.props.selectedPost[0].title : "",
    body: this.props.selectedPost ? this.props.selectedPost[0].body : "",
    imgobj: this.props.selectedPost ? this.props.selectedPost[0].imageobj : {}
  };

  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }

  onSubmitHandler = e => {
    let { title, body, imgobj } = this.state;
    this.props.updatePost(this.props.match.params.id, {
      title,
      body,
      imgobj
    });

    this.props.history.push("/");
  };

  titleChangeHandler = e => {
    this.setState({ title: e.target.value });
  };

  bodyChangeHandler = e => {
    this.setState({ body: e.target.value });
  };

  onSelectHandler = image => {
    let imgobj = {
      imageUrl: "",
      imageUser: "",
      imageAuthorUsername: "",
      imageDownloadUrl: ""
    };

    switch (typeof image) {
      case "string":
        imgobj = { ...imgobj, imageUrl: image };
        break;
      case "object":
        imgobj = {
          ...imgobj,
          imageUrl: image.urls.regular,
          imageUser: image.user.name,
          imageAuthorUsername: image.user.username,
          imageDownloadUrl: image.links.download_location
        };
        break;
      default:
    }
    this.setState({ imgobj });
  };

  render() {
    let { selectedPost, error, loading } = this.props;
    console.log("loading: ", loading);
    console.log("error: ", error);
    console.log("selectedPost: ", selectedPost);
    let comp = null;
    // EDITING POST
    if (loading) {
      comp = <div className="EditPost" />;
    } else if (selectedPost && selectedPost.length > 0 && !error && !loading) {
      let { imageobj } = selectedPost[0];
      console.log("imageobj: ", imageobj);
      comp = (
        <div className="EditPost container">
          <h1 className="EditPost__header">Edit Post</h1>
          <input
            onChange={this.titleChangeHandler}
            className="EditPost__input EditPost__input--title"
            type="text"
            value={this.state.title}
          />
          <textarea
            onChange={this.bodyChangeHandler}
            className="EditPost__input EditPost__input--body"
            type="text"
            value={this.state.body}
          />
          <Gallery editing={imageobj} selected={this.onSelectHandler} />
          <button className="EditPost__submit" onClick={this.onSubmitHandler}>
            Publish Updates
          </button>
        </div>
      );
    } else {
      comp = <p>Loading...</p>;
    }

    return <div>{comp}</div>;
  }
}

export default withRouter(
  connect(state => state.postReducer, { getPost, updatePost })(EditPost)
);