import React from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import { getMovies } from "../Api";

const Home = () => {
  const { data, isLoading } = useQuery(["movies", "nowPlaying"], getMovies);
  console.log(data, isLoading);
  return (
    <Container>{isLoading ? <Loader>Loading....</Loader> : null}</Container>
  );
};

export default Home;
const Container = styled.div`
  background-color: #000;
  height: 200vh;
`;

// https://image.tmdb.org/t/p/original/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg
const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20vh;
`;
