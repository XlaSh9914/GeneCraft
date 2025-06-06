import styled from "styled-components";

const Pattern = () => {
  return (
    <StyledWrapper>
      <div className="container" />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  /*
  More comprehensive version at shenanigans.shoghisimon.ca/collection/css-blur-blob-bg/
   */

  .container::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 1;
    backdrop-filter: hue-rotate(90deg);
    mask: linear-gradient(45deg, #0000, #000);
    animation: rotaty 5s linear infinite;
    transform-origin: center;
  }

  .container {
    position: absolute;
    background-image: radial-gradient(
      circle at 50% 50%,
      #0000 0,
      #0000 2px,
      hsl(0 0 4%) 2px
    );
    background-size: 8px 8px;
    width: 100%;
    height: 100%;
  }

  @keyframes thingy {
    0% {
      filter: var(--f) hue-rotate(0deg);
    }
    to {
      filter: var(--f) hue-rotate(1turn);
    }
  }

  .container::before {
    content: "";
    position: absolute;
    inset: -8em;
    z-index: -1;
    --f: blur(7em) brightness(5);
    --c: #09f;
    animation:
      blobs-1e28bd3d 150s linear infinite,
      thingy 5s linear infinite;
    background-color: #000;
    background-image: radial-gradient(
        ellipse 66px 50px at 50% 50%,
        #0f0 0%,
        transparent 100%
      ),
      radial-gradient(
        ellipse 77px 60px at 50% 50%,
        #110d18 0%,
        transparent 100%
      ),
      radial-gradient(
        ellipse 78px 100px at 50% 50%,
        #110d18 0%,
        transparent 100%
      ),
      radial-gradient(
        ellipse 73px 96px at 50% 50%,
        #110d18 0%,
        transparent 100%
      ),
      radial-gradient(
        ellipse 76px 77px at 50% 50%,
        #2c213e 0%,
        transparent 100%
      ),
      radial-gradient(
        ellipse 66px 51px at 50% 50%,
        #110d18 0%,
        transparent 100%
      ),
      radial-gradient(
        ellipse 90px 57px at 50% 50%,
        #2c213e 0%,
        transparent 100%
      ),
      radial-gradient(
        ellipse 89px 93px at 50% 50%,
        #110d18 0%,
        transparent 100%
      );
    background-size:
      726px 576px,
      1242px 454px,
      876px 1160px,
      691px 873px,
      914px 550px,
      1159px 340px,
      1017px 831px,
      313px 977px;
  }

  @keyframes blobs-1e28bd3d {
    0% {
      background-position:
        271px 478px,
        62px 291px,
        67px 861px,
        553px 413px,
        36px 392px,
        1077px 226px,
        400px 799px,
        7px 264px;
    }

    to {
      background-position:
        -14975px -2978px,
        31112px 11187px,
        -20081px 8981px,
        11609px -3952px,
        -12760px 12492px,
        -9354px 2946px,
        9553px 21574px,
        946px 9057px;
    }
  }
`;

export default Pattern;
