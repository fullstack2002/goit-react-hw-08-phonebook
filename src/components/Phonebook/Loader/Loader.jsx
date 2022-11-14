import { FallingLines } from 'react-loader-spinner';
import { LoaderWrapper } from './Loader.styled';

export const Loader = () => {
  return (
    <LoaderWrapper>
    <FallingLines
      color="#ae62e1"
      width="100"
      visible={true}
      ariaLabel='falling-lines-loading'
    />
  </LoaderWrapper>
  )
};

export const LoaderRoute = () => {
  return (
    <LoaderWrapper>
      <FallingLines
        color="#ae62e1"
        width="100"
        visible={true}
        ariaLabel='falling-lines-loading'
      />
    </LoaderWrapper>
  )
};