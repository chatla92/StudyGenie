import React, { PropTypes, Component } from 'react';
import Chips from 'react-chips';

class ChipInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      chips: [],
      suggestions: ['Java', 'JavaScript', 'React', 'NodeJS', 'Express', 'NPM', 'Redux', 'material-ui'],
    };
  }

  onChange = chips => {
    this.setState({
      chips,
    });
  }

  render() {
    const theme = {
      chipsContainer: {
        display: 'flex',
        position: 'relative',
        backgroundColor: '#fff',
        font: '20px',
        minHeight: 24,
        alignItems: 'center',
        flexWrap: 'wrap',
        borderBottom: '1px solid #aaa',
        ':hover': {
          borderBottom: '2px solid #111',
        },
        ':focus': {
          borderBottom: '2px solid #3f51b5',
        },
      },
      container: {
        flex: 1,
      },
      containerOpen: {

      },
      input: {
        border: 'none',
        outline: 'none',
        boxSizing: 'border-box',
        width: '100%',
        fontSize: 16,
        padding: 0,
        minHeight: 24,
        margin: 0,
      },
      suggestionsContainer: {

      },
      suggestionsList: {
        position: 'absolute',
        border: '1px solid #ccc',
        zIndex: 10,
        left: 0,
        top: '100%',
        width: '100%',
        backgroundColor: '#fff',
        listStyle: 'none',
        padding: 0,
        margin: 0,
      },
      suggestion: {
        padding: '5px 15px',
      },
      suggestionHighlighted: {
        background: '#ddd',
      },
      sectionContainer: {

      },
      sectionTitle: {

      },
    };
    return (
      <div style={{ margin: '16px 0px 16px 0px' }}>
        <Chips
          theme={theme}
          value={this.state.chips}
          onChange={this.onChange}
          placeholder={this.props.placeholder}
          suggestions={this.state.suggestions}
        />
      </div>
    );
  }
}

ChipInput.propTypes = {
  placeholder: PropTypes.string,
};

export default ChipInput;
