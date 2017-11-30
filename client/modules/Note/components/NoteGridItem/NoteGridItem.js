import React from 'react';
import PropTypes from 'prop-types';

import IconButton from 'material-ui/IconButton';
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import Avatar from 'material-ui/Avatar';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import ShareIcon from 'material-ui-icons/Share';
import ThumbUp from 'material-ui-icons/ThumbUp';
import ThumbDown from 'material-ui-icons/ThumbDown';
import red from 'material-ui/colors/red';
import bg from 'material-ui/colors/blueGrey';
import Badge from 'material-ui/Badge';
// Import Style
import styles from './NoteGridItem.css';

function getInitials(string) {
  if (!string ) {
    string = 'Unknown'
  }
  const names = string.split(' ');
  let initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
}

const classestyle = {

};

function NoteGridItem(props) {
  return (
    <div>
      <Card  className={styles.card}>

        <CardHeader onClick={() => { props.requestEditor(true, props.note); }}
          avatar={<Avatar aria-label={props.note.owner} className={styles.avatar}>{getInitials(props.note.owner)}</Avatar>}
          title={props.note.title}
          subheader={`created by ${props.note.owner}`}
          classes={classestyle.header}
        />
        <CardContent>
          <Typography paragraph noWrap>
          {props.note.content}
          </Typography>
        </CardContent>
        <CardActions >
          <Badge className={styles.badge} badgeContent={props.note.upvotes} color="primary">
            <ThumbUp />
          </Badge>
          <IconButton aria-label="Share">
            <Badge className={styles.badge} badgeContent={props.note.downvotes} color="primary">
              <ThumbDown />
            </Badge>
          </IconButton>
          <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton>
          <IconButton aria-label="Edit">
            <ModeEditIcon />
          </IconButton>
        </CardActions>
      </Card>
     { /* <Button fab color="accent" aria-label="edit" className={styles.edit_button}>
        <ModeEditIcon />
  </Button> */ }
    </div>
  );
}

NoteGridItem.propTypes = {
  note: PropTypes.shape({
    owner: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    isPrivate: PropTypes.bool.isRequired,
    cuid: PropTypes.number.isRequired,
    LastModified: PropTypes.number.isRequired,
  }).isRequired,
  requestEditor: PropTypes.func.isRequired,
};

export default NoteGridItem;
