import React from "react";
import { Input, Row, Col } from "antd";

const { Search } = Input;

class SearchNotes extends React.Component {
  render() {
    return (
      <>
        <Search
          placeholder="Search My Notes..."
          onSearch={this.props.onSearch}
          onChange={(e) => this.props.setSearchTerm(e.target.value)}
          enterButton
        />
      </>
    );
  }
}

export default SearchNotes;
