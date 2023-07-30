import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

const Cards = ({ items, deleteFn }) => {
  const navigate = useNavigate();

  function goToDetail(cardItem: Record<string, any>) {
    navigate(`/anime-list/${cardItem.id}/detail`);
  }

  return (
    <>
      <Grid container spacing={3}>
        {items &&
          items.length > 0 &&
          items.map((cardItem, i: number) => {
            let showMore = true;
            function toggleShowMore() {
              showMore = !showMore;
            }
            return (
              <>
                <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                  <Card sx={{ height: '100%' }} key={i}>
                    <CardHeader
                      action={
                        <>
                          <IconButton aria-label="settings">
                            <Checkbox />
                          </IconButton>

                          <IconButton aria-label="detail">
                            <OpenInNewIcon
                              onClick={() => goToDetail(cardItem)}
                            />
                          </IconButton>

                          {deleteFn && (
                            <IconButton
                              aria-label="delete"
                              title="Delete from collection"
                            >
                              <DeleteIcon onClick={() => deleteFn(cardItem)} />
                            </IconButton>
                          )}
                        </>
                      }
                      subheader={cardItem.startDate}
                    />
                    <CardMedia
                      sx={{ height: 140 }}
                      image={cardItem.bannerImage}
                      title={cardItem.title.english}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {cardItem.title.english}
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="subtitle2"
                        component="div"
                      >
                        {showMore + ''}
                        {showMore
                          ? cardItem.description.substring(0, 250) + '...'
                          : cardItem.description}
                        <Button
                          size="small"
                          variant="text"
                          onClick={toggleShowMore}
                        >
                          {showMore ? 'See more' : 'See less'}
                        </Button>
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </>
            );
          })}
      </Grid>
    </>
  );
};

export default Cards;
