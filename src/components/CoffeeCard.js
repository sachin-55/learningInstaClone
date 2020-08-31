import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Button, Avatar, IconButton } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import ShareIcon from '@material-ui/icons/Share';

const useStyles = makeStyles({
  media: {
    height: '150px',
    paddingTop: '56.25%', // 16:9
  },
  card: {
    height: '400px',
    position: 'relative',
  },
  actions: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
    width: '100%',
  },
});

const CoffeeCard = (props) => {
  const classes = useStyles();
  const { avatarUrl, title, subtitle, description, imageUrl } = props;
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={<Avatar src={avatarUrl} />}
        action={
          <IconButton aria-label="settings">
            <ShareIcon />
          </IconButton>
        }
        title={title}
        subheader={subtitle}
      />
      <CardMedia image={imageUrl} className={classes.media} />
      <CardContent>
        <Typography component="p" variant="body2">
          {description}
        </Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button size="small">BUY NOW</Button>
        <Button size="small">OFFER</Button>
      </CardActions>
    </Card>
  );
};

export default CoffeeCard;
