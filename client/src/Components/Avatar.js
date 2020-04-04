import React from 'react';
import styled from 'styled-components';
import { Popup } from 'semantic-ui-react';

export default ({
  image,
  userName,
  imgSize = '80px',
  shoudlTransform = true
}) => {
  const AvatarContainer = styled.div`
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    width: min-content;
    & > img {
      border: 2px solid;
      border-radius: 50%;
      clip-path: circle(50%);
      height: ${imgSize};
      transform: ${shoudlTransform ? `translateY(5px)` : `none`};
      transition: ${shoudlTransform ? `transform 0.1s ease-in-out` : `none`};
      ${shoudlTransform &&
        `&:hover {
        transform: translateY(-1px);
      }`}
    }
  `;

  const StyledPopup = styled(Popup)`
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
  `;

  const AvatarImage = styled.img`
    height: 200px;
    border-radius: 3px;
  `;

  const displayImage = avt => <AvatarImage src={avt} alt="avatar" />;

  return (
    <AvatarContainer>
      <StyledPopup trigger={displayImage(image)}>
        <div>{displayImage(image)}</div>
        <h3>UserName: {userName}</h3>
      </StyledPopup>
    </AvatarContainer>
  );
};
