import { styled } from '@storybook/theming';
import { Container, Heading, Image, Paragraph, Span, SVGIcon, Time } from 'components';
import React from 'react';
import { css } from 'styled-components';
import { string, number } from 'prop-types';
import { Link } from 'react-router-dom';

const StyledProjectItem = styled.li`
  ${({ $width, $margin }) => css`
    display: inline-block;
    width: ${$width};
    height: 100%;
    margin: 16px ${$margin};
    border: 1px solid transparent;
    border-radius: 5px;
    overflow: hidden;
    transition: 0.5s;
    &:hover {
      transform: translate3d(0, -8px, 0);
    }
  `}
`;

const StyledLink = styled(Link)`
  display: block;
  width: 100%;
  height: 100%;
`;

StyledLink.displayName = 'Link';

const ProjectItem = ({
  projectId,
  thumbnail,
  subject,
  planIntention,
  created,
  authorId,
  author,
  authorProfile,
  likeCount,
  viewport,
}) => {
  const { vw } = viewport;

  const createDate = new Date(created);
  const year = createDate.getFullYear();
  const month = createDate.getMonth() + 1;
  const date = createDate.getDate();

  const createdText = `${year}년 ${month}월 ${date}일`;

  const dateTime = createDate.toISOString();

  return (
    <StyledProjectItem
      $width={vw >= 1440 ? '301px' : vw >= 1126 ? '31%' : vw >= 1024 ? '47.5%' : '100%'}
      $margin={vw >= 1440 ? '16px' : vw >= 1024 ? '1.1%' : '0'}
    >
      <Link to={`project/${projectId}`}>
        {/* 스크린 리더의 흐름상 Heading요소 바로 뒤에 있기 때문에 alt속성을 비워줌 */}
        <Image src={thumbnail} alt="" width="100%" cursor="pointer" />
      </Link>
      <Container width="100%" height={167} padding="16px" background="#FFFFFF">
        <Heading as="h3" color="#212121" fontSize={1.6} margin="0 0 10px 0" cursor="pointer">
          <StyledLink to={`project/${projectId}`}>{subject}</StyledLink>
        </Heading>
        <Paragraph color="#495057" fontSize={1.4} height={65} margin="0 0 34px 0" cursor="pointer">
          <StyledLink to={`project/${projectId}`}>{planIntention}</StyledLink>
        </Paragraph>
        <Container color="#868E96">
          <Time dateTime={dateTime} color="#70777d" fontSize={1.2}>
            {createdText}
          </Time>
        </Container>
      </Container>
      <Container
        width="100%"
        height={44}
        padding="10px 16px"
        background="#FFFFFF"
        borderTop="1px solid #E6E6E6"
        display="flex"
        flexFlow="row nowrap"
        justifyContent="space-between"
        alignItems="center"
      >
        <Container margin="0" padding="0 5px 0 0" cursor="pointer">
          <StyledLink to={`portfolio/${authorId}`}>
            <Image
              src={authorProfile}
              alt={`${author}의 프로필 사진`}
              width={24}
              height={24}
              borderRadius="50%"
            />
            <Span margin="0 0 0 8px" color="#70777d" fontSize={1.2} verticalAlign="middle">
              by
            </Span>
            <Span verticalAlign="middle" fontSize={1.2}>
              {' '}
              {author}
            </Span>
          </StyledLink>
        </Container>
        <Container margin="0" display="flex" justifyContent="end" alignItems="center">
          <SVGIcon type="HeartRed" />
          <Span marginLeft={5}>{likeCount}</Span>
        </Container>
      </Container>
    </StyledProjectItem>
  );
};

ProjectItem.propTypes = {
  /** 프로젝트의 썸네일을 url형식으로 입력해줍니다. */
  thumbnail: string,
  /** 프로젝트의 제목을 입력해줍니다. */
  subject: string,
  /** 프로젝트의 기획의도를 입력해줍니다. */
  planIntention: string,
  /** 프로젝트를 애플리케이션에 등록 날짜를 ISOString형식으로 입력해줍니다. */
  created: string,
  /** 프로젝트를 애플리케이션에 등록한 유저의 닉네임을 입력해줍니다. */
  author: string,
  /** 프로젝트를 애플리케이션에 등록한 유저의 프로필 사진을 url형식으로 입력해줍니다. */
  authorProfile: string,
  /** 프로젝트의 좋아요 갯수를 입력해줍니다. */
  likeCount: number,
};

export default ProjectItem;
