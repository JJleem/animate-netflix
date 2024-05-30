import React, { useState } from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import { IGetmoviesResult, getMovies } from "../Api";
import { makeImagePath } from "../utils";
import { motion, AnimatePresence } from "framer-motion";
import { IMovie } from "../Api";
const rowVariants = {
  hidden: {
    x: window.outerWidth + 10,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 5,
  },
};

const boxVariants = {
  normal: { scale: 1 },
  hover: {
    zIndex: 99,
    scale: 1.3,
    y: -50,
    transition: { delay: 0.3, type: "tween" },
  },
};

const InfoVariants = {
  hover: {
    opacity: 1,
  },
};
const offset = 6;

const Home = () => {
  const [clickedMovie, setClickedMovie] = useState<IMovie | null>(null);
  const [isModal, setIsModal] = useState(false);
  const [index, setIndex] = useState(0);
  // false => leaving 완료
  const [leaving, setLeaving] = useState(false);
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 2;
      const maxIndex = Math.ceil(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const toggleLeaving = () => {
    setLeaving((prev) => !prev);
  };
  const { data, isLoading } = useQuery<IGetmoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );

  const openModal = (e: React.MouseEvent<HTMLInputElement>) => {
    for (let i = 0; i < 20; i++) {
      if (e.currentTarget.innerText === data?.results[i].title || "")
        if (data?.results[i]) {
          setClickedMovie(data?.results[i]);
        }
      setIsModal(true);
    }
  };
  return (
    <Container>
      {isLoading ? (
        <Loader>Loading....</Loader>
      ) : (
        <>
          {isModal && clickedMovie && (
            <Modal movie={clickedMovie}>
              <h1>{clickedMovie.title}</h1>
              <h5>{clickedMovie.overview}</h5>
              <img src={makeImagePath(clickedMovie.backdrop_path)} />
            </Modal>
          )}

          <Banner
            bgphoto={makeImagePath(data?.results[14].backdrop_path || "")}
            onClick={increaseIndex}
          >
            <Title>{data?.results[14].title}</Title>
            <Overview>{data?.results[14].overview}</Overview>
          </Banner>
          <Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                key={index}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{
                  type: "tween",
                  duration: 1,
                }}
              >
                {data?.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <Box
                      key={movie.id}
                      bgphoto={makeImagePath(movie.backdrop_path)}
                      variants={boxVariants}
                      whileHover="hover"
                      initial="normal"
                      transition={{ type: "tween" }}
                      onClick={openModal}
                    >
                      <Info variants={InfoVariants}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
        </>
      )}
    </Container>
  );
};

export default Home;
const Container = styled.div`
  background-color: #000;
  height: 100%;
`;

// https://image.tmdb.org/t/p/original/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg
const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20vh;
`;

const Banner = styled.div<{ bgphoto: string | undefined }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgphoto});
  background-size: cover;
`;
const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;
const Overview = styled.p`
  font-size: 30px;
  width: 50%;
`;

const Slider = styled.div`
  position: relative;
  top: -100px;
`;
const Row = styled(motion.div)`
  position: absolute;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  width: 100%;
  gap: 10px;
`;
const Box = styled(motion.div)<{ bgphoto: string }>`
  position: relative;
  background-color: #fff;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  margin-bottom: 10px;
  color: white;
  font-size: 30px;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  background-color: ${(props) => props.theme.black.lighter};
  padding: 20px;
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 16px;
  }
`;

const Modal = styled.div<{ movie: IMovie }>`
  background: #000;
  width: 80%;
  height: 80%;
  z-index: 9999;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
