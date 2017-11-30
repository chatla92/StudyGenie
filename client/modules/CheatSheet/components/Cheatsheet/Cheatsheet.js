import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import Typography from 'material-ui/Typography';
import styles from './CheatSheet.css';

const boxTarget = {
	drop(props, monitor, component) {
		const note = monitor.getItem();
    console.log(note)
	},
}

@DropTarget('NOTE', boxTarget, (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver(),
	canDrop: monitor.canDrop(),
  note: monitor.getItem(),
}))
class CheatSheet extends Component {
  render() {
    const { canDrop, isOver, connectDropTarget } = this.props
    const isActive = canDrop && isOver

    let backgroundColor = '#fff'
    if (isActive) {
      backgroundColor = '#fff'
    } else if (canDrop) {
      backgroundColor = '#aaa'
    }

    const content = {
      backgroundColor,
      width: '100%',
      padding: 3,
      height: 'calc(100% - 56px)',
      marginTop: 56,
    }

    return (
      <div style={content}>
      {
        this.props.notes.map(note => (
          <div>
            <strong>note.title</strong>
            <p>note.content</p>
          </div>
        ))
      }
      </div>
    )
  }
}

CheatSheet.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })).isRequired,
}

export default CheatSheet;
