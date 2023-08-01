import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { ICardData, ICardProps } from './Card';

const Cards = ({ items, deleteFn }: ICardProps) => {
  const navigate = useNavigate();
  const [isOnHover, setIsOnHover] = useState(false);

  function goToDetail(cardItem: ICardData) {
    navigate(`/anime-list/${cardItem.id}/detail`);
  }

  return (
    <>
      <Grid container spacing={3} sx={{ marginBottom: '20px' }}>
        {items &&
          items.length > 0 &&
          items.map((cardItem: ICardData, i: number) => {
            return (
              <>
                <Grid item xs={12} sm={6} key={i}>
                  <div
                    css={{
                      borderRadius: '5px',
                      backgroundImage: `url(${cardItem.bannerImage})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center center',
                      backgroundSize: 'cover',
                      boxShadow: '0px 0px 10px rgb(0, 0, 0)',
                      cursor: 'pointer',
                      position: 'relative'
                    }}
                    onMouseEnter={() => setIsOnHover(true)}
                    onMouseLeave={() => setIsOnHover(false)}
                  >
                    <div
                      css={{
                        minHeight: '200px',
                        padding: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative'
                      }}
                      onClick={() => goToDetail(cardItem)}
                    >
                      <div css={{ color: 'white' }}>
                        {isOnHover}
                        <h2>{cardItem.title.english || '-'}</h2>
                      </div>
                      <div css={{ marginTop: 'auto' }}>
                        <h5 css={{ fontWeight: 'normal', color: 'white' }}>
                          {cardItem.genres &&
                            cardItem.genres.length > 0 &&
                            cardItem.genres.toString()}
                        </h5>
                      </div>
                    </div>

                    <Box
                      sx={{
                        position: 'absolute',
                        right: '40px',
                        bottom: '20px',
                        color: 'rgb(235, 0, 20)',
                        ':before, :after': {
                          content: '""',
                          height: '50px',
                          width: '50px',
                          position: 'absolute'
                        }
                      }}
                      aria-label="delete"
                      title="Delete"
                    >
                      <Button sx={{ color: 'rgb(235, 0, 20)' }}>
                        <DeleteIcon onClick={() => deleteFn(cardItem)} /> Delete
                      </Button>
                    </Box>

                    <Box
                      sx={{
                        position: 'absolute',
                        right: '20px',
                        bottom: '20px',
                        color: 'rgb(235, 0, 20)',
                        ':before, :after': {
                          content: '""',
                          height: '50px',
                          width: '50px',
                          position: 'absolute'
                        }
                      }}
                      aria-label="delete"
                      title="Delete"
                    >
                      <Button sx={{ color: 'rgb(235, 0, 20)' }}>
                        <DeleteIcon onClick={() => deleteFn(cardItem)} /> Delete
                      </Button>
                    </Box>
                  </div>
                </Grid>
              </>
            );
          })}
      </Grid>
    </>
  );
};

export default Cards;
